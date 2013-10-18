package controllers;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.text.json.JsonContext;
import models.Bucket;
import models.Course;
import models.Schedule;
import models.User;
import com.fasterxml.jackson.databind.JsonNode;

import play.libs.Json;
import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.scheduleplanner;

import java.util.List;


/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 8:12 PM
 * Description:
 */

public class SchedulePlanner extends Controller {
    private final static Form<Schedule> SCHEDULE_FORM = Form.form(Schedule.class);

    public static Result view() {

        User currentUser = Application.getUser();
        if(currentUser == null)
        {
            return redirect(routes.Application.logout());
        }

        return ok(scheduleplanner.render(currentUser));
    }

    public static Result courseObjects() {

//        List<Course> courses = Ebean.find(Course.class).findList();
//
//        String s = "{ \"classes\": [";
//        int num = 0;
//        int coursesNum = courses.size();
//
//        for(Course course : courses)
//        {
//            s += "{" +
//                    "\"id\": "+course.getId()+", "+
//                    "\"duration\": \""+course.getDuration()+"\", "+
//                    "\"otherRequirements\": \""+course.getOtherRequirements()+"\", "+
//                    "\"name\": \""+course.getName()+"\"";
//
//            if(num == coursesNum-1)
//                s += "}";
//            else
//                s += "}, ";
//
//            num++;
//        }
//        s += "]}";
//        return ok(s).as("json");
        List<Course> courseObjects = Ebean.find(Course.class).select("id, name, duration, creditType, description, otherRequirements").findList();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseObjects, true);

        return ok(s);

    }

    public static Result save() {
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

        Ebean.save(schedule);

        return ok();

    }

    public static Result saveServiceHours() {
        JsonNode json = request().body().asJson();
        String serviceHours = json.path("serviceHours").textValue();

        User currentUser = Application.getUser();

        Schedule schedule = Schedule.find.where().eq("user", currentUser.getId()).findUnique();

        if (schedule == null)
        {
            schedule = new Schedule();
        }

        schedule.setServiceHours(Integer.parseInt(serviceHours));

        Ebean.save(schedule);

        return ok();
    }

    public static Result savePECredits() {
        JsonNode json = request().body().asJson();
        String PECredits = json.path("PECredits").textValue();

        User currentUser = Application.getUser();

        Schedule schedule = Schedule.find.where().eq("user", currentUser.getId()).findUnique();

        if (schedule == null)
        {
            schedule = new Schedule();
        }

        schedule.setPECredits(Integer.parseInt(PECredits));

        Ebean.save(schedule);

        return ok();
    }

    public static Result courseTypeahead() {

//        List<Course> courses = Ebean.find(Course.class).findList();
//
//        List<String> results = new ArrayList<String>();
//
//        for(Course course : courses)
//        {
//            results.add("{ \"name\": \""+course.getName()+"\", \"otherRequirements\": \""+course.getOtherRequirements()+"\", \"duration\": \""+course.getDuration()+"\", \"id\":"+course.getId()+" }");
//        }

        List<Course> courseObjects = Ebean.find(Course.class).select("id, name, description, creditType, duration, otherRequirements").where().eq("visible", true).findList();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseObjects, true);

        return ok(s);
    }

    public static Result loadSchedule() {
        String s = "";
        Schedule schedule = Schedule.find.where().eq("user", Application.getUser().getId()).findUnique();

        if(schedule == null)
        {
            schedule = new Schedule();
        }
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

    public static Result getRequiredCourses() {
        List<Bucket> courseBuckets = Ebean.find(Bucket.class).fetch("courseList").findList();

        JsonContext json = Ebean.createJsonContext();
        String s = json.toJsonString(courseBuckets, true);

        return ok(s);
    }



}
