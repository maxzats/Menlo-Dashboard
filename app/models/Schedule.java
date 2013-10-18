package models;

import play.db.ebean.Model;
import sun.misc.BASE64Encoder;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 11:40 AM
 * Description:
 */

@Entity
public class Schedule {

    public static Model.Finder<Long,Schedule> find = new Model.Finder<Long,Schedule>(Long.class, Schedule.class);

    @Id
    private Long id;

    private Long user;

    private String freshmanClasses;
    private String freshmanTopCourse;

    @Lob
    private String freshmanNotes;

    private String sophomoreClasses;
    private String sophomoreTopCourse;

    @Lob
    private String sophomoreNotes;

    private String juniorClasses;
    private String juniorTopCourse;

    @Lob
    private String juniorNotes;


    private String seniorClasses;
    private String seniorTopCourse;

    @Lob
    private String seniorNotes;

    private int serviceHours;
    private int PECredits;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public String getFreshmanClasses() {
        return freshmanClasses;
    }

    public void setFreshmanClasses(String freshmanClasses) {
        this.freshmanClasses = freshmanClasses;
    }

    public String getSophomoreClasses() {
        return sophomoreClasses;
    }

    public void setSophomoreClasses(String sophomoreClasses) {
        this.sophomoreClasses = sophomoreClasses;
    }

    public String getJuniorClasses() {
        return juniorClasses;
    }

    public void setJuniorClasses(String juniorClasses) {
        this.juniorClasses = juniorClasses;
    }

    public String getSeniorClasses() {
        return seniorClasses;
    }

    public void setSeniorClasses(String seniorClasses) {
        this.seniorClasses = seniorClasses;
    }

    public String getFreshmanTopCourse() {
        return freshmanTopCourse;
    }

    public void setFreshmanTopCourse(String freshmanTopCourse) {
        this.freshmanTopCourse = freshmanTopCourse;
    }

    public String getFreshmanNotes() {
        return freshmanNotes;
    }

    public void setFreshmanNotes(String freshmanNotes) {
        this.freshmanNotes = freshmanNotes;
    }

    public String getSophomoreTopCourse() {
        return sophomoreTopCourse;
    }

    public void setSophomoreTopCourse(String sophomoreTopCourse) {
        this.sophomoreTopCourse = sophomoreTopCourse;
    }

    public String getSophomoreNotes() {
        return sophomoreNotes;
    }

    public void setSophomoreNotes(String sophomoreNotes) {
        this.sophomoreNotes = sophomoreNotes;
    }

    public String getJuniorTopCourse() {
        return juniorTopCourse;
    }

    public void setJuniorTopCourse(String juniorTopCourse) {
        this.juniorTopCourse = juniorTopCourse;
    }

    public String getJuniorNotes() {
        return juniorNotes;
    }

    public void setJuniorNotes(String juniorNotes) {
        this.juniorNotes = juniorNotes;
    }

    public String getSeniorTopCourse() {
        return seniorTopCourse;
    }

    public void setSeniorTopCourse(String seniorTopCourse) {
        this.seniorTopCourse = seniorTopCourse;
    }

    public String getSeniorNotes() {
        return seniorNotes;
    }

    public void setSeniorNotes(String seniorNotes) {
        this.seniorNotes = seniorNotes;
    }

    public int getServiceHours() {
        return serviceHours;
    }

    public void setServiceHours(int serviceHours) {
        this.serviceHours = serviceHours;
    }

    public int getPECredits() {
        return PECredits;
    }

    public void setPECredits(int PECredits) {
        this.PECredits = PECredits;
    }
}
