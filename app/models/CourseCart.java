package models;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Author: maxzats
 * Date: 12/9/13
 * Time: 8:29 AM
 * Description:
 **/

@Entity
public class CourseCart {

    @Id
    private Long id;

    private long userId;

    private String selections;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getSelections() {
        return selections;
    }

    public void setSelections(String selections) {
        this.selections = selections;
    }
}
