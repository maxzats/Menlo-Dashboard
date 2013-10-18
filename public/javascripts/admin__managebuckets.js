$(document).ready(function(){

    $('.bucket-action').tooltip();

    $('.delete-bucket').click(function(){
        $('#bucketId').val($(this).data('bucket-id'));
    });

    $('#newBucketCourseListAdd').typeahead({
        valueKey: 'name',
        prefetch: {
            url: Routes.courseTypeAhead,
            ttl: 0
        },
        template: [
            '<p>{{name}}</p>'
        ].join(''),
        engine: Hogan
    });

    $('#editBucketCourseListAdd').typeahead({
        valueKey: 'name',
        prefetch: {
            url: Routes.courseTypeAhead,
            ttl: 0
        },
        template: [
            '<p>{{name}}</p>'
        ].join(''),
        engine: Hogan
    });

    $("#newBucketCourseListAdd, #editBucketCourseListAdd").bind('blur', function(){
        $(this).val('');
    });



});
function BucketCtrl($scope, $filter) {

    $scope.selectedCourses = new Array();
    $scope.editBucketCourses = new Array();

    $scope.getCourseById = function (id) {
        var array = $scope.selectedCourses;
        for(var i=0; i<array.length; i++)
        {
            if(array[i].id == id)
            {
                return array[i];
            }
        }

        return -1;
    };

    $scope.getEditCourseById = function (id) {
        var array = $scope.editBucketCourses;
        for(var i=0; i<array.length; i++)
        {
            if(array[i].id == id)
            {
                return array[i];
            }
        }

        return -1;
    };

    $('#newBucketCourseListAdd').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

//        if ($scope.selectedCourses.length > 3)
//        {
//            $("#newBucketTooMany").fadeIn();
//            return false;
//        }

        $("#newBucketTooMany").fadeOut();

        if ($scope.getCourseById(datum.id) === -1)
        {
            $scope.$apply(function(){

                $scope.selectedCourses.push(datum);
            });
        }
    });

    $('#editBucketCourseListAdd').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

//        if ($scope.editBucketCourses.length > 3)
//        {
//            $("#editBucketTooMany").fadeIn();
//            return false;
//        }

        $("#editBucketTooMany").fadeOut();

        if ($scope.getEditCourseById(datum.id) === -1)
        {
            $scope.$apply(function(){

                $scope.editBucketCourses.push(datum);
            });
        }
    });

    $scope.removeCourse = function(id) {

        var index = 0;
        $("#newBucketTooMany").fadeOut();

        while ($scope.selectedCourses[index].id !== id)
        {
            index++;
        }
        $scope.selectedCourses.splice(index, 1);
    }

    $scope.removeEditCourse = function(id) {

        var index = 0;
        $("#editBucketTooMany").fadeOut();

        while ($scope.editBucketCourses[index].id !== id)
        {
            index++;
        }
        $scope.editBucketCourses.splice(index, 1);
    }

    $scope.createCourseList = function() {
        var courseList = new Array();

        for ( var i=0; i<$scope.selectedCourses.length; i++)
        {
            courseList.push($scope.selectedCourses[i].id);
        }
        return courseList;
    }

    $scope.createEditCourseList = function() {
        var courseList = new Array();

        for ( var i=0; i<$scope.editBucketCourses.length; i++)
        {
            courseList.push($scope.editBucketCourses[i].id);
        }
        return courseList;
    }

    $scope.update = function()
    {
        var data = '{' +
            '"id": "'+$("#editBucketId").val()+'",' +
            '"name": "'+$("#editBucketName").val()+'",' +
            '"requiredFor": "'+$("#editBucketRequiredFor").val()+'",' +
            '"courseList": "'+$scope.createEditCourseList().toString()+'"' +
            '}';

        $.ajax({
            type: "POST",
            url: Routes.editBucket,
            dataType: 'json',
            contentType : 'application/json; charset=utf-8',
            data: data,
            success: function(data){
                if(data.ok == "ok")
                    window.location = window.location;
                else
                {
                    if(data.errors)
                    {
                        $("#editBucketError").html(data.errorMessage).fadeIn();
                    }
                }
            }
        });
    }
    $scope.save = function()
    {

        var data = '{' +
            '"name": "'+$("#newBucketName").val()+'",' +
            '"requiredFor": "'+$("#newBucketRequiredFor").val()+'",' +
            '"courseList": "'+$scope.createCourseList().toString()+'"' +
            '}';

        $.ajax({
            type: "POST",
            url: Routes.saveBucket,
            dataType: 'json',
            contentType : 'application/json; charset=utf-8',
            data: data,
            success: function(data){
                if(data.ok == "ok")
                    window.location = window.location;
                else
                {
                    if(data.error)
                    {
                        $("#newBucketError").html(data.error);
                        $("#newBucketError").fadeIn();
                    }
                }
            }
        });
    }

    $('.edit-bucket').click(function(){
        var bucketId = $(this).data('bucket-id');
        $("#editBucketId").val(bucketId);
        var routeObj = Routes.getBucket;
        var route = routeObj.slice(0, routeObj.length-1)+bucketId;

        $.ajax({
            type: "GET",
            url: route,
            success: function(data){
                data = JSON.parse(data);
                $("#editBucketName").val(data.name);
                $("#editBucketRequiredFor").val(data.requiredFor);
                $scope.$apply(function(){
                    $scope.editBucketCourses = new Array();
                    $scope.editBucketCourses = data.courseList;
                });
            }
        });

    });
}