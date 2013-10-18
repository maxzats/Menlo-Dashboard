package controllers;

import models.MZError;
import models.User;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.Logger;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import views.html.home;

import java.util.List;

public class Application extends Controller {

    private final static Form<User> LOGIN_FORM = Form.form(User.class);

    public static Result index()
    {
        User currentUser = Application.getUser();

        return ok(home.render(currentUser));
    }

    public static Result login()
    {
        // Get the submitted form
        Form<User> submittedForm = LOGIN_FORM.bindFromRequest();

        if(submittedForm.hasErrors())
        {
            return ok(new MZError("Please enter a non-empty email and password.").sendError());
        }

        String submittedEmail = submittedForm.get().getEmail();
        String submittedPassword = submittedForm.get().getEncryptedPassword();

        Logger.debug(submittedEmail+" attempt with password: "+submittedPassword);

        if(submittedEmail.isEmpty() || submittedPassword.isEmpty())
        {
            return ok(new MZError("Please enter a username or password.").sendError());
        }
        // Find all the users that match
        List<User> foundUsers = User.find.where().eq("email", submittedEmail).eq("password", submittedPassword).findList();

        // If no users found, show an error through JSON
        if(foundUsers.size() == 0)
        {
            Logger.debug(submittedEmail+" was denied. No users matched.");

            return ok(new MZError("Incorrect username or password.").sendError());
        }

        Logger.debug(submittedEmail+" logged in successfully.");

        // Otherwise, found a user...
        session("loggedin", "true");
        session("email", submittedEmail);
        session("password", submittedPassword);

        // Send a URL to redirect
        ObjectNode response = Json.newObject();
        response.put("url", routes.Application.index().toString());

        return ok(response);

    }

    public static User getUser()
    {
        if(session("loggedin") != null && session("loggedin").equals("true"))
        {
            // Get the information from the session
            String email = session("email");
            String password = session("password");

            // Find the user
            List<User> foundUsers = User.find.where().eq("email", email).eq("password", password).findList();
            if(foundUsers.size() == 1)
            {
                return foundUsers.get(0);
            }
            else
                return null;
        }
        else
            return null;

    }

    public static Result logout()
    {
        session().clear();

        return redirect(routes.Application.index());
    }
}
