/**
 * MZError - to be used in conjunction with MZAjaxForm on the client side.
 * This packages and formats form errors into the proper JSON structure for
 * easy sending back to the client.
 */
package models;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;


public class MZError {
    private String globalError;

    public MZError(String globalError) {
        this.globalError = globalError;
    }

    public JsonNode sendError() {
        ObjectNode errors = Json.newObject();
        errors.put("errors", true);
        errors.put("errorMessage", this.globalError);
        return errors;
    }
}
