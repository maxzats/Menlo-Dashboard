package controllers;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.text.json.JsonContext;
import controllers.com.mogo.shared.Cornelius;
import models.*;
import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import play.cache.Cached;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.scheduleplanner;
import java.util.List;


/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 8:12 PM
 * Description: Main controller file for the Scheduler Planner backend
 */

public class SchedulePlanner extends Controller {

    public static Result view()
    {

        User currentUser = Application.getUser();
        if(currentUser == null)
        {
            return redirect(routes.Application.logout());
        }

        return ok(scheduleplanner.render(currentUser, true));
    }

    public static Result courseObjects()
    {
        List<Course> courseObjects = Cornelius.getAllVisibleCourses();


        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseObjects);

        return ok(s);

    }

    public static Result save()
    {
        JsonNode json = request().body().asJson();
        String freshmanClasses = json.path("freshmanClasses").textValue();
        String sophomoreClasses = json.path("sophomoreClasses").textValue();
        String juniorClasses = json.path("juniorClasses").textValue();
        String seniorClasses = json.path("seniorClasses").textValue();
        String freshmanTopCourse = json.path("freshmanTopCourse").textValue();
        String sophomoreTopCourse = json.path("sophomoreTopCourse").textValue();
        String juniorTopCourse = json.path("juniorTopCourse").textValue();
        String seniorTopCourse = json.path("seniorTopCourse").textValue();
        String freshmanNotes = json.path("freshmanNotes").textValue();
        String sophomoreNotes = json.path("sophomoreNotes").textValue();
        String juniorNotes = json.path("juniorNotes").textValue();
        String seniorNotes = json.path("seniorNotes").textValue();

        User currentUser = Application.getUser();

        Schedule schedule = Schedule.find.where().eq("user", currentUser.getId()).findUnique();

        if (schedule == null)
        {
            schedule = new Schedule();
        }
        schedule.generateMD5();
        schedule.setUser(currentUser.getId());
        schedule.setFreshmanClasses(freshmanClasses);
        schedule.setSophomoreClasses(sophomoreClasses);
        schedule.setJuniorClasses(juniorClasses);
        schedule.setSeniorClasses(seniorClasses);
        schedule.setFreshmanTopCourse(freshmanTopCourse);
        schedule.setSophomoreTopCourse(sophomoreTopCourse);
        schedule.setJuniorTopCourse(juniorTopCourse);
        schedule.setSeniorTopCourse(seniorTopCourse);
        schedule.setFreshmanNotes(freshmanNotes);
        schedule.setSophomoreNotes(sophomoreNotes);
        schedule.setJuniorNotes(juniorNotes);
        schedule.setSeniorNotes(seniorNotes);

        Logger.debug("Saving schedule!");
        Ebean.save(schedule);

        return ok();

    }

    public static Result saveServiceHours()
    {
        JsonNode json = request().body().asJson();
        String serviceHours = json.path("serviceHours").textValue();

        User currentUser = Application.getUser();

        Schedule schedule = Schedule.find.where().eq("user", currentUser.getId()).findUnique();

        if (schedule == null)
        {
            schedule = new Schedule();
        }

        schedule.setServiceHours(Integer.parseInt(serviceHours));
        schedule.generateMD5();

        Ebean.save(schedule);

        return ok();
    }

    public static Result savePECredits()
    {
        JsonNode json = request().body().asJson();
        String PECredits = json.path("PECredits").textValue();

        User currentUser = Application.getUser();

        Schedule schedule = Schedule.find.where().eq("user", currentUser.getId()).findUnique();

        if (schedule == null)
        {
            schedule = new Schedule();
        }

        schedule.setPECredits(Integer.parseInt(PECredits));
        schedule.generateMD5();
        Ebean.save(schedule);

        return ok();
    }

    @Cached(key = "courseTypeahead")
    public static Result courseTypeahead()
    {
        List<Course> courseObjects = Ebean.find(Course.class).select("id, name, partOfSchedule, description, creditType, duration, otherRequirements").where().eq("visible", true).ne("creditType", "PE").findList();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseObjects, true);

        return ok(s);
    }

    @Cached(key = "peTypeahead")
    public static Result PETypeahead()
    {
        List<Course> courseObjects = Ebean.find(Course.class).select("id, name, partOfSchedule, description, creditType, duration, otherRequirements").where().eq("visible", true).eq("creditType", "PE").findList();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseObjects, true);

        return ok(s);
    }

    public static Result loadSchedule()
    {
        String s = "";
        Schedule schedule = Schedule.find.where().eq("user", Application.getUser().getId()).findUnique();

        if(schedule == null)
        {
            schedule = new Schedule();
        }
        schedule.generateMD5();
        Ebean.save(schedule);
        s += "{" +
                "\"freshmanClasses\": \""+schedule.getFreshmanClasses()+"\","+
                "\"sophomoreClasses\": \""+schedule.getSophomoreClasses()+"\","+
                "\"juniorClasses\": \""+schedule.getJuniorClasses()+"\","+
                "\"seniorClasses\": \""+schedule.getSeniorClasses()+"\","+
                "\"freshmanTopCourse\": \""+schedule.getFreshmanTopCourse()+"\","+
                "\"sophomoreTopCourse\": \""+schedule.getSophomoreTopCourse()+"\","+
                "\"juniorTopCourse\": \""+schedule.getJuniorTopCourse()+"\","+
                "\"seniorTopCourse\": \""+schedule.getSeniorTopCourse()+"\","+
                "\"freshmanNotes\": \""+schedule.getFreshmanNotes()+"\","+
                "\"sophomoreNotes\": \""+schedule.getSophomoreNotes()+"\","+
                "\"juniorNotes\": \""+schedule.getJuniorNotes()+"\","+
                "\"seniorNotes\": \""+schedule.getSeniorNotes()+"\","+
                "\"serviceHours\": \""+schedule.getServiceHours()+"\","+
                "\"PECredits\": \""+schedule.getPECredits()+"\""+
             "}";
        return ok(s);
    }

    public static Result getRequiredCourses()
    {
        List<Bucket> courseBuckets = Cornelius.getAllBuckets();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseBuckets, true);

        return ok(s);
    }

    public static Result viewSecretSchedule(String secretKey)
    {
        Schedule schedule = Schedule.find.where().eq("secretKey", secretKey).findUnique();

        if(schedule == null)
            return redirect(routes.Application.index());

        User user = User.find.where().eq("id", schedule.getUser()).findUnique();

        if(user == null)
            return redirect(routes.Application.index());

        return ok(scheduleplanner.render(user, false));
    }

    public static Result saveCourseCart()
    {
        JsonNode json = request().body().asJson();
        String selections = json.path("selections").textValue();

        User currentUser = Application.getUser();
        if (currentUser == null)
            return badRequest("User object could not be found!");

        CourseCart currentCart = Ebean.find(CourseCart.class).where().eq("userId", currentUser.getId()).findUnique();

        if(currentCart == null)
        {
            currentCart = new CourseCart();
            currentCart.setUserId(currentUser.getId());
        }

        currentCart.setSelections(selections);
        Ebean.save(currentCart);

        return ok();
    }

    public static Result getCourseCart()
    {
        User currentUser = Application.getUser();
        if(currentUser == null)
            return badRequest("User object could not be found!");

        CourseCart currentCart = Ebean.find(CourseCart.class).where().eq("userId", currentUser.getId()).findUnique();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(currentCart, true);

        return ok(s);

    }

}
