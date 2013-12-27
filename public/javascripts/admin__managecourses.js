$(document).ready(function(){
    $('.course-action').tooltip();

    $('.delete-course').click(function(){
        $('#courseId').val($(this).data('course-id'));
    });

    $('.edit-course').click(function(){
        $("#editCategoryId").val($(this).data('category-id'));
    });


    $('.availability').change(function(){

        var availabilityString = "";

        $('.availability').each(function(){
            if($(this).is(":checked") && $(this).val() !== undefined)
            {
                availabilityString += $(this).val()+"^";
            }
        });

        // Get rid of trailing carat (^)
        var finalAvailabilityString = availabilityString.slice(0, availabilityString.length-1);
        $("#availability").val(finalAvailabilityString);
        $("#editCourseAvailability").val(finalAvailabilityString);
    });

    $("#newCourseCreditType").change(function(){
        if($("#newCourseCreditType").val() == "PE")
        {
            $('#newCourseDuration')
                .find('option')
                .remove()
                .end()
                .append('<option value="3">Fall</option>')
                .append('<option value="4">Winter</option>')
                .append('<option value="5">Spring</option>')
                .val('3');

            $("#newCoursePartOfScheduleContainer").show();
            $("#durationText").html("Time of Year");
        }
        else
        {
            $('#newCourseDuration')
                .find('option')
                .remove()
                .end()
                .append('<option value="12">Yearlong</option>')
                .append('<option value="1">First Semester</option>')
                .append('<option value="2">Second Semester</option>')
                .val('12');

            $("#newCoursePartOfScheduleContainer").hide();
            $("#durationText").html("Duration");
        }
    });

    $("#editCourseCreditType").change(function(){
        if($("#editCourseCreditType").val() == "PE")
        {
            $('#editCourseDuration')
                .find('option')
                .remove()
                .end()
                .append('<option value="3">Fall</option>')
                .append('<option value="4">Winter</option>')
                .append('<option value="5">Spring</option>')
                .val('3');

            $("#editCoursePartOfScheduleContainer").show();
            $("#editDurationText").html("Time of Year");
        }
        else
        {
            $('#editCourseDuration')
                .find('option')
                .remove()
                .end()
                .append('<option value="12">Yearlong</option>')
                .append('<option value="1">First Semester</option>')
                .append('<option value="2">Second Semester</option>')
                .val('12');

            $("#editCoursePartOfScheduleContainer").hide();

            if ( $("#editCoursePartOfSchedule").checked )
                $("#editCoursePartOfSchedule").check();

            $("#editDurationText").html("Duration");
        }
    });

    $('.edit-course').click(function(){
        var courseId = $(this).data('course-id');
        var routeObj = Routes.getCourse;
        var route = routeObj.slice(0, routeObj.length-1)+courseId;

        $.ajax({
            type: "GET",
            url: route,
            success: function(data){
                data = JSON.parse(data);

                if(data.name !== "" && data.name !== undefined)
                {
                    $("#editCourseId").val(data.id);

                    // Course Name
                    $("#editCourseName").val(data.name);

                    //Visible
                    if(data.visible)
                    {
                        if(!$("#editCourseVisibleBox").is(":checked"))
                            $("#editCourseVisibleBox").click();
                    }
                    else
                    {
                        if($("#editCourseVisibleBox").is(":checked"))
                            $("#editCourseVisibleBox").click();
                    }
                    // Category
                    if(data.category !== null)
                        $("#editCourseCategory").val(data.category.id);

                    // Credit Type
                    if(data.creditType !== null)
                        $("#editCourseCreditType").val(data.creditType);

                    // Duration
                    if(data.duration !== null)
                    {
                        $("#editCourseDuration").val(data.duration);
                    }


                    // Do the PE stuff
                    if(data.creditType == "PE" )
                    {
                        $("#editCourseCreditType").val("PE");
                        $('#editCourseDuration')
                            .find('option')
                            .remove()
                            .end()
                            .append('<option value="3">Fall</option>')
                            .append('<option value="4">Winter</option>')
                            .append('<option value="5">Spring</option>')
                            .val('3');

                        $("#editCoursePartOfScheduleContainer").show();

                        if(data.partOfSchedule == "1") {
                            alert("It's part of schedule");
                            $("#editCoursePartOfSchedule").click();
                        }
                        $("#editDurationText").html("Time of Year");
                    }

                    // Suggested for
                    var availability = data.availability.split("^");

                    for (var i=0; i<availability.length; i++)
                    {
                        $("#editCourse"+availability[i]).click();
                    }

                    // Description
                    $("#editCourseDescription").val(data.description);


                    // Other Requirements
                    $("#editCourseOtherRequirements").val(data.otherRequirements);

                    setTimeout(function() {
                        $("#loading").fadeOut();
                    }, 1200);
                    setTimeout(function(){
                        $("#editCourseContent").fadeIn();
                    }, 1600)
                }
                else
                {
                    alert("Something went wrong while loading the course. Please try again later.");
                }
            }
        });


    });

    $("#editCourseVisibleBox").click(function(){
        if($(this).is(":checked") == true)
        {
            $("#editCourseVisible").val('true');
        }
        else
        {
            $("#editCourseVisible").val('false');
        }
    });

    $("#newCourseVisibleBox").click(function(){
        if($(this).is(":checked") == true)
        {
            $("#newCourseVisible").val('true');
        }
        else
        {
            $("#newCourseVisible").val('false');
        }
    });

    $('#editCourseModal').on('hide.bs.modal', function () {
        $("#loading").fadeIn();
        $("#editCourseContent").fadeOut();
        $("#editCourseForm")[0].reset();
    });

});
