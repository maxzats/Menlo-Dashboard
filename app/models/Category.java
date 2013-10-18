package models;

import play.data.validation.Constraints;
import play.db.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
/**
 * Author: maxzats
 * Date: 9/17/13
 * Time: 3:50 PM
 * Description:
 */
@Entity
public class Category {

    public static Model.Finder<Long,Category> find = new Model.Finder<Long,Category>(Long.class, Category.class);

    @Id
    @Constraints.Required
    private Long id;

    private String name;

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
}
