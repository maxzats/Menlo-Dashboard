package controllers.com.mogo.shared.security;

import controllers.Application;
import models.User;
import play.mvc.*;
import play.mvc.Http.*;
import views.html.unauthorized;

public class Hagrid extends Security.Authenticator {

    @Override
    public String getUsername(Context ctx) {

        User currentUser = Application.getUser();

        if(currentUser == null)
        {
            return null; // will invoke onUnauthorized
        }

        if("admin".equals(currentUser.getRole()))
        {
            return "OK"; // will prevent onUnauthorized from being invoked
        }
        else
        {
            return null;
        }
    }

    @Override
    public Result onUnauthorized(Context ctx) {

        return badRequest(unauthorized.render(Application.getUser()));
    }
}