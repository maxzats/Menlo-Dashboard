package controllers;

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
        List<Course> courses = Course.find.where().eq("visible", true).findList();
        List<Category> categories = Category.find.all();
        User currentUser = Application.getUser();


        return ok(catalog.render(courses, categories, currentUser));

    }
}
