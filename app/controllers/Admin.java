package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import models.*;
import play.Logger;
import play.libs.Json;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.text.json.JsonContext;
import play.data.Form;
import play.mvc.BodyParser;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.admin__managebuckets;
import views.html.admin__managecategories;
import views.html.admin__managecourses;

import java.util.ArrayList;
import java.util.List;

/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 3:02 AM
 * Description:
 */

public class Admin extends Controller
{
    private static final Form<Course> COURSE_FORM = Form.form(Course.class);
    private static final Form<Category> CATEGORY_FORM = Form.form(Category.class);
    private static final Form<Bucket> BUCKET_FORM = Form.form(Bucket.class);

    public static Result manageCategories()
    {
        User currentUser = Application.getUser();
        List<Category> categories = Category.find.all();
        return ok(admin__managecategories.render(categories, currentUser));

    }

    public static Result deleteCategory()
    {
        Form<Category> submittedForm = CATEGORY_FORM.bindFromRequest();

        if(submittedForm.hasErrors())
        {
            flash("error", "An error occurred while deleting the category.");
            return redirect(routes.Admin.manageCategories());
        }

        Long categoryId = submittedForm.get().getId();
        List<Course> coursesToBeDeleted = Course.find.where().eq("category_id", categoryId).findList();
        Ebean.delete(coursesToBeDeleted);

        Category categoryToBeDeleted = Category.find.byId(categoryId);

        if(categoryToBeDeleted != null)
        {
            Ebean.delete(categoryToBeDeleted);
            flash("success", "The category and the courses in it have successfully been deleted.");
        }
        else
        {
            flash("error", "An unknown error occurred and the category was not deleted.");
        }

        return redirect(routes.Admin.manageCategories());
    }

    public static Result editCategory()
    {
        Form<Category> submittedForm = CATEGORY_FORM.bindFromRequest();

        if(submittedForm.hasErrors())
        {
            flash("error", "An error occurred while editing the category.");
            return redirect(routes.Admin.manageCategories());
        }

        Long categoryId = submittedForm.get().getId();
        String categoryName = submittedForm.get().getName();

        // Is this name taken?
        List<Category> categoriesWithName = Category.find.where().eq("name", categoryName).ne("id", categoryId).findList();

        if(categoriesWithName.size() > 0)
        {
            return ok(new MZError("That category name is already taken. Please choose another one.").sendError());
        }

        List<Category> categories = Category.find.where().eq("id", categoryId).findList();

        if(categories == null || categories.size() > 1 || categories.size() == 0)
        {
            return ok(new MZError("An unknown error occurred and the category was not updated.").sendError());
        }

        Category categoryToBeRenamed = categories.get(0);

        categoryToBeRenamed.setName(categoryName);

        Ebean.update(categoryToBeRenamed);

        // Send a URL to redirect
        ObjectNode response = Json.newObject();
        response.put("url", routes.Admin.manageCategories().toString());

        flash("success", "Successfully updated the category.");
        return ok(response);
    }

    public static Result newCategory()
    {
        Form<Category> submittedForm = CATEGORY_FORM.bindFromRequest();

        if(submittedForm.hasErrors())
        {
            flash("error", "An error occurred while creating the category.");
            return redirect(routes.Admin.manageCategories());
        }

        String categoryName = submittedForm.get().getName();

        // Is this name taken?
        List<Category> categoriesWithName = Category.find.where().eq("name", categoryName).findList();

        if(categoriesWithName.size() > 0)
        {
            return ok(new MZError("That category name is already taken. Please choose another one.").sendError());
        }

        Category newCategory = new Category();
        newCategory.setName(categoryName);

        Ebean.save(newCategory);

        // Send a URL to redirect
        ObjectNode response = Json.newObject();
        response.put("url", routes.Admin.manageCategories().toString());

        flash("success", "Successfully created a new category.");

        return ok(response);
    }

    public static Result manageCourses()
    {
        User currentUser = Application.getUser();

        List<Course> courses = Course.find.order().asc("category").findList();
        List<Category> categories = Category.find.all();

        return ok(admin__managecourses.render(courses, categories, currentUser));

    }

    public static Result deleteCourse()
    {
        Form<Course> submittedForm = COURSE_FORM.bindFromRequest();

        if(submittedForm.hasErrors())
        {
            flash("error", "An error occurred while deleting the category.");
            return redirect(routes.Admin.manageCourses());
        }

        Long courseId = submittedForm.get().getId();

        Course courseToBeDeleted = Ebean.find(Course.class).where().eq("id", courseId).findUnique();

        if(courseToBeDeleted == null)
        {
            flash("error", "An error occurred while deleting the category.");
            return redirect(routes.Admin.manageCourses());
        }

        Ebean.delete(courseToBeDeleted);

        flash("success", "Successfully deleted the course.");

        return redirect(routes.Admin.manageCourses());

    }

    public static Result newCourse()
    {
        Form<Course> submittedForm = COURSE_FORM.bindFromRequest();

        if(submittedForm.hasErrors())
        {
            return ok(new MZError("Please fill out all of the required fields.").sendError());
        }

        /**
         * VALIDATION
         * Step 1: Check for the essentials
         */
        String courseName = submittedForm.get().getName();
        String courseDescription = submittedForm.get().getDescription();
        String availability = submittedForm.get().getAvailability();
        String creditType = submittedForm.get().getCreditType();
        String otherRequirements = submittedForm.get().getOtherRequirements();
        String categoryId = submittedForm.get().getCourseCategoryIdTransientString();
        String duration = submittedForm.get().getDuration();
        Category category = Category.find.where().eq("id", categoryId).findUnique();
        String courseVisibilityTransientString = submittedForm.get().getCourseVisibilityTransientString();


        if(courseName.isEmpty())
        {
            return ok(new MZError("Please enter a course name.").sendError());
        }
        if(category == null)
        {
            return ok(new MZError("Please choose a course category.").sendError());
        }
        if(availability.isEmpty())
        {
            return ok(new MZError("Please select for whom this course is suggested for.").sendError());
        }
        if(courseDescription.isEmpty())
        {
            return ok(new MZError("Please enter a course description.").sendError());
        }

        /**
         * VALIDATION
         * Step 2: Check if course name already in use?
         */

        List<Course> coursesWithName = Course.find.where().eq("name", courseName).findList();
        if (coursesWithName.size() != 0)
        {
            return ok(new MZError("That course name is already in use. Please choose another one.").sendError());
        }

        // ! Passed Validation !
        Course newCourse = new Course();


        // Get all the other properties
        newCourse.setName(courseName);
        newCourse.setDescription(courseDescription);
        newCourse.setAvailability(availability);
        newCourse.setCategory(category);
        newCourse.setOtherRequirements(otherRequirements);
        newCourse.setDuration(duration);
        newCourse.setCreditType(creditType);
        if(courseVisibilityTransientString != null && courseVisibilityTransientString.equals("true"))
        {
            newCourse.setVisible(true);
        }
        else
        {
            newCourse.setVisible(false);
        }

        // Save the course!
        Ebean.save(newCourse);

        // Send a URL to redirect
        ObjectNode response = Json.newObject();
        response.put("url", routes.Admin.manageCourses().toString());

        flash("success", "Successfully created a new course.");
        return ok(response).as("text/json");

    }

    public static Result editCourse() {

        Form<Course> submittedForm = COURSE_FORM.bindFromRequest();

        if(submittedForm.hasErrors())
        {
            return ok(new MZError("Please fill out all of the required fields.").sendError());
        }

        /**
         * VALIDATION
         * Step 1: Check for the essentials
         */
        String courseName = submittedForm.get().getName();
        String courseDescription = submittedForm.get().getDescription();
        String availability = submittedForm.get().getAvailability();
        String creditType = submittedForm.get().getCreditType();
        String otherRequirements = submittedForm.get().getOtherRequirements();
        String categoryId = submittedForm.get().getCourseCategoryIdTransientString();
        String courseVisibilityTransientString = submittedForm.get().getCourseVisibilityTransientString();

        String duration = submittedForm.get().getDuration();
        Category category = Category.find.where().eq("id", categoryId).findUnique();

        if(courseName.isEmpty())
        {
            return ok(new MZError("Please enter a course name.").sendError());
        }
        if(category == null)
        {
            return ok(new MZError("Please choose a course category.").sendError());
        }
        if(availability.isEmpty())
        {
            return ok(new MZError("Please select for whom this course is suggested for.").sendError());
        }
        if(courseDescription.isEmpty())
        {
            return ok(new MZError("Please enter a course description.").sendError());
        }

        /**
         * VALIDATION
         * Step 2: Check if course name already in use?
         */

        List<Course> coursesWithName = Course.find.where().eq("name", courseName).ne("id", submittedForm.get().getId()).findList();
        if (coursesWithName.size() > 0)
        {
            return ok(new MZError("A course with that name already exists.").sendError());
        }

        /**
         * VALIDATION
         * Step 3: Get the course by ID
         */

        Course courseToBeEdited = Course.find.where().eq("id", submittedForm.get().getId()).findUnique();

        if(courseToBeEdited == null)
        {
            return ok(new MZError("An error occurred while saving the course.").sendError());
        }

        // ! Passed Validation !


        // Get all the other properties
        courseToBeEdited.setName(courseName);
        courseToBeEdited.setDescription(courseDescription);
        courseToBeEdited.setAvailability(availability);
        courseToBeEdited.setCategory(category);
        courseToBeEdited.setDuration(duration);
        courseToBeEdited.setOtherRequirements(otherRequirements);
        courseToBeEdited.setCreditType(creditType);

        if(courseVisibilityTransientString != null && courseVisibilityTransientString.equals("true"))
        {
            Logger.debug("Setting visible to true");
            courseToBeEdited.setVisible(true);
        }
        else
        {
            Logger.debug("Setting visible to false");
            courseToBeEdited.setVisible(false);
        }

        // Save the course!
        Ebean.save(courseToBeEdited);

        // Send a URL to redirect
        ObjectNode response = Json.newObject();
        response.put("url", routes.Admin.manageCourses().toString());

        flash("success", "Successfully updated the course.");
        return ok(response).as("text/json");
    }

    public static Result manageRequiredCourses()
    {
        User currentUser = Application.getUser();

        List<Bucket> buckets = Bucket.find.fetch("courseList").findList();

        return ok(admin__managebuckets.render(buckets, currentUser));

    }

    public static Result newBucket()
    {
        JsonNode json = request().body().asJson();
        String bucketName = json.path("name").textValue();
        String requiredFor = json.path("requiredFor").textValue();
        String courseList = json.path("courseList").textValue();

        if(bucketName.isEmpty() || courseList.isEmpty())
        {
            return ok(new MZError("Please enter all required fields.").sendError());
        }

        List<Bucket> bucketsWithName = Bucket.find.where().eq("name", bucketName).findList();

        if(bucketsWithName.size() > 0)
        {
            return ok(new MZError("That bucket name has already been taken. Please choose another one.").sendError());
        }

        Bucket newBucket = new Bucket();
        newBucket.setName(bucketName);
        newBucket.setRequiredFor(requiredFor);

        String[] courseIDs = courseList.split(",");

        List<Course> generatedCourses = new ArrayList<Course>();

        for(int i=0; i<courseIDs.length; i++)
        {
            Course generatedCourse = Course.find.where().eq("id", courseIDs[i]).findUnique();

            if (generatedCourse != null)
                generatedCourses.add(generatedCourse);
        }

        newBucket.setCourseList(generatedCourses);

        Ebean.save(newBucket);

        ObjectNode response = Json.newObject();
        response.put("ok", "ok");

        flash("success", "Successfully created the course requirement.");
        return ok(response);
    }

    public static Result deleteBucket()
    {
        Form<Bucket> submittedForm = BUCKET_FORM.bindFromRequest();
        if(submittedForm.hasErrors())
        {
            flash("error", "An error occurred while deleting the course requirement.");
            Logger.debug("FAILURE: Bucket could not be deleted. The submitted form had errors.");
            return redirect(routes.Admin.manageCategories());
        }

        Long id = submittedForm.get().getId();

        if(id == -1)
        {
            flash("error", "An error occurred while trying to delete that course requirement.");
            Logger.debug("FAILURE: Bucket could not be deleted. The submitted id was -1.");
            return redirect(routes.Admin.manageRequiredCourses());
        }

        Bucket bucketToBeDeleted = Bucket.find.where().eq("id", id).findUnique();

        if(bucketToBeDeleted == null)
        {
            flash("error", "An error occurred while trying to delete that course requirement.");
            Logger.debug("FAILURE: Bucket could not be deleted. The bean was null?");
            return redirect(routes.Admin.manageRequiredCourses());
        }

        Ebean.deleteManyToManyAssociations(bucketToBeDeleted, "courseList");

        Ebean.delete(bucketToBeDeleted);

        flash("success", "Successfully deleted that course requirement.");
        return redirect(routes.Admin.manageRequiredCourses());
    }

    public static Result getCourse(int id) {

        Course courseObj = Ebean.find(Course.class).select("id, name, visible, category, description, duration, availability, otherRequirements, creditType")
                           .where().eq("id", id).findUnique();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseObj, true);

        return ok(s);
    }

    public static Result getBucket(int id) {

        Bucket bucketObj = Ebean.find(Bucket.class).fetch("courseList").where().eq("id", id).findUnique();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(bucketObj, true);

        return ok(s);
    }

    public static Result editBucket()
    {
        JsonNode json = request().body().asJson();
        String bucketId = json.path("id").textValue();
        String bucketName = json.path("name").textValue();
        String requiredFor = json.path("requiredFor").textValue();
        String courseList = json.path("courseList").textValue();

        if(bucketId.equals("-1"))
        {
            Logger.debug("FAILURE: Bucket could not be edited. The submitted id was -1.");
            return ok(new MZError("An unknown error occurred.").sendError());
        }

        if(bucketName.isEmpty() || courseList.isEmpty())
        {
            return ok(new MZError("Please enter all required fields.").sendError());
        }

        List<Bucket> bucketsWithName = Bucket.find.where().eq("name", bucketName).ne("id", bucketId).findList();

        if(bucketsWithName.size() > 0)
        {
            return ok(new MZError("That bucket name has already been taken. Please choose another one.").sendError());
        }

        Bucket bucketToBeEdited = Bucket.find.where().eq("id", bucketId).findUnique();

        if(bucketToBeEdited == null)
        {
            Logger.debug("FAILURE: Bucket could not be edited. The bean was null?");
            return ok(new MZError("An unknown error occurred.").sendError());
        }

        String[] courseIDs = courseList.split(",");

        List<Course> generatedCourses = new ArrayList<Course>();

        for(int i=0; i<courseIDs.length; i++)
        {
            Course generatedCourse = Course.find.where().eq("id", courseIDs[i]).findUnique();

            if (generatedCourse != null)
                generatedCourses.add(generatedCourse);
        }

        bucketToBeEdited.setCourseList(generatedCourses);
        bucketToBeEdited.setName(bucketName);
        bucketToBeEdited.setRequiredFor(requiredFor);
        Ebean.update(bucketToBeEdited);

        ObjectNode response = Json.newObject();
        response.put("ok", "ok");

        flash("success", "Successfully edited the course requirement.");
        return ok(response);
    }


}