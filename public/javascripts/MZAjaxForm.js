/**
 * MZ Ajax Form
 * @author Max Zats
 * @param config {
 *          formId: ID of the form
 *          action: URL to post to
 *          errorId: Div ID to show when request fails
 *          errorMessage: Message to put in error div
 *          successId: Div ID to show when request is successful
 *          successMessage: Message to put in the success div
 *          clearFieldsOnError: (true/false) Reset the form if errors were returned from server
 *        }
 * @constructor
 */
$.fn.MZAjaxForm = function (config) {

    var settings = $.extend({
        logging: false
    }, config);

    // jQuery objects are denoted with a dollar sign.
    var $form = $('#' + settings.formId);
    var $success = $("#" + settings.successId);
    var $error = $("#" + settings.errorId);

    // On Submit
    $form.submit(function () {

        log('info', "About to POST form to " + settings.action + " with data " + $form.serialize());

        $.ajax({
            type: "POST",
            url: settings.action,
            data: $form.serialize(),
            dataType: "json",
            success: function (data) {
                onSuccess(data);
            },
            error: function (data) {
                onError(data);
            }
        });

        return false;
    });

    var onSuccess = function (data) {

        log('info', 'Ajax Request Succeeded. Received Response:');
        logObject(data);
        if (data.errors) {
            log('info', "Received validation errors from server.");
            $('.modal').animate({
                scrollTop: 0
            }, 200);

            if ($error.css('display') == 'block') {
                $error.fadeOut();

                $error.html(data.errorMessage);

                setTimeout(function () {
                    $error.fadeIn();
                }, 400);
            }
            else {
                $error.html(data.errorMessage).fadeIn();
            }

            if(settings.clearFieldsOnError)
            {
                $form[0].reset();
                $('#'+settings.formId+':first *:input[type!=hidden]:first').focus();

            }
        }
        else {
            $success.html(settings.successMessage);

            if (!data.url) {
                if ($error.css('display') == 'block') {
                    $error.fadeOut();
                    setTimeout(function () {
                        $success.fadeIn();
                    }, 400);
                }
                else {
                    $success.fadeIn();
                }
            }
            else {
                log('info', 'Received URL to redirect...now redirecting');
                window.location = data.url;
            }
        }
    }

    var onError = function (serverError) {

        log('critical', "Ajax Request Failed. Received Response: ");
        logObject(serverError);

        if ($error.css('display') == 'block') {
            $error.fadeOut();
            $error.html(settings.serverError);

            setTimeout(function () {
                $error.fadeIn();
            }, 400);
        }
        else {
            $error.html(settings.errorMessage);
            $error.fadeIn();
        }
    }

    var log = function (level, message) {
        if (settings.logging)
            console.log("[MZAjaxForm] [" + level.toUpperCase() + "] " + message);
    }

    var logObject = function (object) {
        if (settings.logging)
            console.log(object);
    }
}