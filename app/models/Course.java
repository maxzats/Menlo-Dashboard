package models;

import play.db.ebean.Model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 3:25 PM
 * Description:
 */
@Entity
public class Course {

    public static Model.Finder<Long,Course> find = new Model.Finder<Long,Course>(Long.class, Course.class);

    @Id
    private Long id;

    private String name;

    private String availability;

    private String creditType; // class, art, or PE

    private boolean visible;

    @Transient
    private static transient String courseVisibilityTransientString;

    @ManyToOne
    private Category category;

    private String duration;

    @Transient
    private static transient String courseCategoryIdTransientString;

    @Lob
    private String description;

    @Lob
    private String otherRequirements;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvailability() {
        return availability;
    }
    public String getFormattedAvailability() {
        String availability[] = this.availability.split("\\^");
        String formattedAvailability = "";

        if(availability.length == 1)
        {
            return availability[0];
        }
        if(availability.length == 2)
        {
            return availability[0]+" and "+availability[1];
        }
        for(int i=0; i<availability.length; i++)
        {
            if(i == availability.length-1)
                formattedAvailability += "and "+availability[i];
            else
                formattedAvailability += availability[i]+", ";

        }

        return formattedAvailability;
    }
    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDescription() {
        String formattedDescription = description;
        formattedDescription.replace("\n", "<br />").replace("\r", "<br />");
        return formattedDescription;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOtherRequirements() {

        String requirements = otherRequirements;
        requirements.replace("\n", "<br />").replace("\r", "<br />").replace("cr\\\\lf", "<br />");
        return requirements;
    }

    public void setOtherRequirements(String otherRequirements) {
        this.otherRequirements = otherRequirements;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public static String getCourseCategoryIdTransientString() {
        return courseCategoryIdTransientString;
    }

    public static void setCourseCategoryIdTransientString(String courseCategoryIdTransientString) {
        Course.courseCategoryIdTransientString = courseCategoryIdTransientString;
    }

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public static String getCourseVisibilityTransientString() {
        return courseVisibilityTransientString;
    }

    public static void setCourseVisibilityTransientString(String courseVisibilityTransientString) {
        Course.courseVisibilityTransientString = courseVisibilityTransientString;
    }

    public String getCreditType() {
        return creditType;
    }

    public void setCreditType(String creditType) {
        this.creditType = creditType;
    }
}
