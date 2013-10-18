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
                    console.log(data);
                    if(data.creditType !== null)
                        $("#editCourseCreditType").val(data.creditType);

                    // Duration
                    if(data.duration !== null)
                    {
                        $("#editCourseDuration").val(data.duration);
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
