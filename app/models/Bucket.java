package models;

import play.db.ebean.Model;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

/**
 * Author: maxzats
 * Date: 10/7/13
 * Time: 7:40 PM
 * Description:
 */
@Entity
public class Bucket {

    public static Model.Finder<Long,Bucket> find = new Model.Finder<Long,Bucket>(Long.class, Bucket.class);

    @Id
    private Long id;

    @ManyToMany
    private List<Course> courseList;

    private String name;

    private String requiredFor;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Course> getCourseList() {
        return courseList;
    }

    public void setCourseList(List<Course> courseList) {
        this.courseList = courseList;
    }

    public String getRequiredFor() {

        // Capitalize first letter
        return (requiredFor.substring(0, 1).toUpperCase())+requiredFor.substring(1);
    }

    public void setRequiredFor(String requiredFor) {
        this.requiredFor = requiredFor;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFormattedCourseList() {
        String formattedList = "";

        for (int i=0; i<this.courseList.size(); i++)
        {
            if (i == this.courseList.size()-1)
                formattedList += this.courseList.get(i).getName();
            else
                formattedList += this.courseList.get(i).getName()+", ";

        }
        return formattedList;
    }
}
