package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

/**
 * Author: maxzats
 * Date: 11/13/13
 * Time: 9:14 AM
 * Description:
 */
@Entity
public class Settings {

    @Id
    private int id;

    private String appName;

    @Lob
    private String freshmanMessage;

    @Lob
    private String sophomoreMessage;

    @Lob
    private String juniorMessage;

    @Lob
    private String seniorMessage;

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getFreshmanMessage() {
        return freshmanMessage;
    }

    public void setFreshmanMessage(String freshmanMessage) {
        this.freshmanMessage = freshmanMessage;
    }

    public String getSophomoreMessage() {
        return sophomoreMessage;
    }

    public void setSophomoreMessage(String sophomoreMessage) {
        this.sophomoreMessage = sophomoreMessage;
    }

    public String getJuniorMessage() {
        return juniorMessage;
    }

    public void setJuniorMessage(String juniorMessage) {
        this.juniorMessage = juniorMessage;
    }

    public String getSeniorMessage() {
        return seniorMessage;
    }

    public void setSeniorMessage(String seniorMessage) {
        this.seniorMessage = seniorMessage;
    }
}
