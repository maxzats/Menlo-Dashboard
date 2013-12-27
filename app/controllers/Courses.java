package controllers;

import controllers.com.mogo.shared.Cornelius;
import models.Category;
import models.Course;
import models.User;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.catalog;

import java.util.List;

/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 3:36 PM
 * Description:
 */
public class Courses extends Controller {

    public static Result view()
    {
        List<Course> courses = Cornelius.getAllVisibleCourses();
        List<Category> categories = Cornelius.getAllCategories();
        User currentUser = Application.getUser();


        return ok(catalog.render(courses, categories, currentUser));

    }
}
