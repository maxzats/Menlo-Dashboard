package models;

import com.avaje.ebean.Ebean;
import play.db.ebean.Model;
import javax.persistence.Entity;
import javax.persistence.Id;

import static play.mvc.Controller.request;

/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 11:40 AM
 * Description:
 */

@Entity
public class User {

    public static Model.Finder<Long,User> find = new Model.Finder<Long,User>(Long.class, User.class);

    @Id
    private Long id;
    private String email;

    private String password;
    private String firstName;
    private String lastName;
    private String role;    // Student or Admin

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSecretScheduleLink() {
        Schedule schedule = Ebean.find(Schedule.class).where().eq("user", this.id).findUnique();

        if (schedule == null || schedule.getSecretKey() == null )
        {
            return "Error: Couldn't generate your secrete schedule link.";
        }

        String link = controllers.routes.SchedulePlanner.viewSecretSchedule(schedule.getSecretKey()).absoluteURL(request());
        return link;
    }
    public String getEncryptedPassword() {
        String salt = "f98a!!#5988A_CMS_11_58AUG_play21";
        String saltedPassword = this.password+salt;

        return new sun.misc.BASE64Encoder().encode(saltedPassword.getBytes());
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
