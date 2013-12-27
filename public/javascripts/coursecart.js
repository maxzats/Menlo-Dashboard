/**
 * Course Cart (Angular)
 *
 **/

var Scheduler = {

    __getCourses: function() {
            return $.ajax({
                type: "GET",
                url: Routes.getCoursesRoute
            });
    },
    __getCourseCart: function() {
        return $.ajax({
            type: "GET",
            url: Routes.getCoursesCartRoute
        });
    }

};

function CourseCartCtrl($scope, $filter)
{
    var promise = Scheduler.__getCourses();

    $scope.classes = new Array();
    $scope.courseCartArray = new Array();

    promise.success(function(data){
        var parsedData = JSON.parse(data);

        $scope.$apply(function(){
            $scope.classes = parsedData;
        });

        var savedCourseCartPromise = Scheduler.__getCourseCart();

        savedCourseCartPromise.success(function(data){
            data = JSON.parse(data);
            var selections = data.selections.split(',');

            for(var i=0; i<selections.length; i++)
            {
                $scope.safeApply(function(){
                    $scope.addCourseToCart(selections[i], false);
                });
            }
        });

    });

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };


    $scope.addCourseToCart = function(courseId, save) {
        for(var i=0; i<$scope.classes.length; i++)
        {
            if($scope.classes[i].id == courseId)
            {
                if($.inArray($scope.classes[i], $scope.courseCartArray) == -1)
                {
                    popCart(false);
                    $scope.courseCartArray.push($scope.classes[i]);
                    if(save)
                        $scope.saveCourseCart();
                }
            }
        }
    };

    // This is a filter, so returning "false" means it's added, and to not show the button
    // Returning "true" means it's not already added, and to show the button
    $scope.notAlreadyAdded = function(courseId) {
        for(var i=0; i<$scope.courseCartArray.length; i++)
        {
            if($scope.courseCartArray[i].id == courseId)
            {
                return false;
            }
        }

        return true;
    };

    $scope.removeCourseFromCart = function(courseId) {
        for(var i=0; i<$scope.courseCartArray.length; i++)
        {
            if($scope.courseCartArray[i].id == courseId)
            {
                $scope.courseCartArray.splice(i, 1);
                popCart(false);
                $scope.saveCourseCart();
            }
        }
    };

    $scope.saveCourseCart = function() {
        var courseIDArray = new Array();

        for(var i=0; i<$scope.courseCartArray.length; i++)
        {
            courseIDArray.push($scope.courseCartArray[i].id);
        }

        var data = '{' +
            '"selections": "'+courseIDArray.toString()+'"'+
            '}';

        $.ajax({
            type: "POST",
            url: Routes.saveCourseCartRoute,
            dataType: 'json',
            contentType : 'application/json; charset=utf-8',
            data: data
        });
    };

    $scope.isCourseCartEmpty = function() {
        return $scope.courseCartArray.length == 0;
    }
}

$(document).ready(function(){

    $("#slideOutBtn").mouseover(function(){
        $("#slideOutBtn").addClass("slideoutHover");
        $("#slideOutBtn").removeClass("slideout");
        $("#slideOutContent").addClass("slideout_innerHover");
        $("#slideOutContent").removeClass("slideout_inner");
    });

    $("#slideOutBtn").mouseout(function(){
        $("#slideOutBtn").removeClass("slideoutHover");
        $("#slideOutBtn").addClass("slideout");
        $("#slideOutContent").removeClass("slideout_innerHover");
        $("#slideOutContent").addClass("slideout_inner");
    });

});

/**
 * "Pops" the CourseCart to notify the user that a course has been added
 */
function popCart(close) {

    $("#slideOutBtn").addClass("slideoutHover");
    $("#slideOutBtn").removeClass("slideout");
    $("#slideOutContent").addClass("slideout_innerHover");
    $("#slideOutContent").removeClass("slideout_inner");

    if(close)
    {
        setTimeout(function(){
            $("#slideOutBtn").removeClass("slideoutHover");
            $("#slideOutBtn").addClass("slideout");
            $("#slideOutContent").removeClass("slideout_innerHover");
            $("#slideOutContent").addClass("slideout_inner");
        }, 2500);
    }
}


