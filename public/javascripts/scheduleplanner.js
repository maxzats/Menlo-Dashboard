/***************************************
 * (C) 2013 - Mogo Corporation
 * Author: Max Zats
 * Date: 9/24/2013
 *
 * Schedule Planner Engine
 * V1.1-Angular
 *
 ***************************************/

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

    $('a').click(function(evt){
        if($(this).href == "#")
            evt.preventDefault();
    });

    $('#requiredCoursesTab').click();

    $("#freshmanCourseSelect, #freshmanTopCourseSelect, #sophomoreCourseSelect, #sophomoreTopCourseSelect, " +
        "#juniorCourseSelect, #juniorTopCourseSelect, #seniorTopCourseSelect, #seniorCourseSelect").typeahead({
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

    $("#freshmanPESelect, #sophomorePESelect, #juniorPESelect, #seniorPESelect").typeahead({
        valueKey: 'name',
        prefetch: {
            url: Routes.PETypeAhead,
            ttl: 0
        },
        template: [
            '<p>{{name}}</p>'
        ].join(''),
        engine: Hogan
    });

    $(".typeahead").bind('blur', function(){
        $(this).val('');
    });

    $("#slideOutBtn").hide();

    // ANIMATIONS
    $("#freshmanExpand").click(function(){
        $("#main-container").fadeOut();
        $("#scheduleHeader").fadeOut();
        $("#freshmanColumn").fadeOut();
        $("#sophomoreColumn").fadeOut();
        $("#juniorColumn").fadeOut();
        $("#seniorColumn").fadeOut();
        $("#graduationRequirements").fadeOut();


        setTimeout(function(){
            $("#main-container").fadeIn();
            $("#freshmanExpanded").fadeIn('slow');
            $("#slideOutBtn").fadeIn();

        }, 500);
    });

    $("#sophomoreExpand").click(function(){
        $("#main-container").fadeOut();
        $("#scheduleHeader").fadeOut();
        $("#freshmanColumn").fadeOut();
        $("#sophomoreColumn").fadeOut();
        $("#juniorColumn").fadeOut();
        $("#seniorColumn").fadeOut();
        $("#graduationRequirements").fadeOut();


        setTimeout(function(){
            $("#main-container").fadeIn();
            $("#sophomoreExpanded").fadeIn('slow');
            $("#slideOutBtn").fadeIn();

        }, 500);
    });

    $("#juniorExpand").click(function(){
        $("#main-container").fadeOut();
        $("#scheduleHeader").fadeOut();
        $("#freshmanColumn").fadeOut();
        $("#sophomoreColumn").fadeOut();
        $("#juniorColumn").fadeOut();
        $("#seniorColumn").fadeOut();
        $("#graduationRequirements").fadeOut();


        setTimeout(function(){
            $("#main-container").fadeIn();
            $("#juniorExpanded").fadeIn('slow');
            $("#slideOutBtn").fadeIn();

        }, 500);
    });

    $("#seniorExpand").click(function(){
        $("#main-container").fadeOut();
        $("#scheduleHeader").fadeOut();
        $("#freshmanColumn").fadeOut();
        $("#sophomoreColumn").fadeOut();
        $("#juniorColumn").fadeOut();
        $("#seniorColumn").fadeOut();
        $("#graduationRequirements").fadeOut();


        setTimeout(function(){
            $("#main-container").fadeIn();
            $("#seniorExpanded").fadeIn('slow');
            $("#slideOutBtn").fadeIn();

        }, 500);
    });

    $("#freshmanContract").click(function(){
        $("#freshmanExpanded").fadeOut('slow');
        $("#main-container").fadeOut();
        $("#slideOutBtn").fadeOut();


        setTimeout(function(){
            $("#graduationRequirements").fadeIn();
            $("#main-container").fadeIn();
            $("#scheduleHeader").fadeIn();
            $("#freshmanColumn").fadeIn();
            $("#sophomoreColumn").fadeIn();
            $("#juniorColumn").fadeIn();
            $("#seniorColumn").fadeIn();
        }, 500);
    });

    $("#sophomoreContract").click(function(){
        $("#sophomoreExpanded").fadeOut('slow');
        $("#main-container").fadeOut();
        $("#slideOutBtn").fadeOut();

        setTimeout(function(){
            $("#graduationRequirements").fadeIn();
            $("#main-container").fadeIn();
            $("#scheduleHeader").fadeIn();
            $("#freshmanColumn").fadeIn();
            $("#sophomoreColumn").fadeIn();
            $("#juniorColumn").fadeIn();
            $("#seniorColumn").fadeIn();
        }, 500);
    });

    $("#juniorContract").click(function(){
        $("#juniorExpanded").fadeOut('slow');
        $("#main-container").fadeOut();
        $("#slideOutBtn").fadeOut();

        setTimeout(function(){
            $("#graduationRequirements").fadeIn();
            $("#main-container").fadeIn();
            $("#scheduleHeader").fadeIn();
            $("#freshmanColumn").fadeIn();
            $("#sophomoreColumn").fadeIn();
            $("#juniorColumn").fadeIn();
            $("#seniorColumn").fadeIn();
        }, 500);
    });

    $("#seniorContract").click(function(){
        $("#seniorExpanded").fadeOut('slow');
        $("#main-container").fadeOut();
        $("#slideOutBtn").fadeOut();

        setTimeout(function(){
            $("#graduationRequirements").fadeIn();
            $("#main-container").fadeIn();
            $("#scheduleHeader").fadeIn();
            $("#freshmanColumn").fadeIn();
            $("#sophomoreColumn").fadeIn();
            $("#juniorColumn").fadeIn();
            $("#seniorColumn").fadeIn();
        }, 500);
    });

});



var Scheduler = {

    courseArray: new Array(),

    __getCourses: function() {
        if(this.courseArray.length == 0)
        {
            return $.ajax({
                type: "GET",
                url: Routes.getCoursesRoute
            });
        }

    },


    __getCourseCart: function() {
        return $.ajax({
            type: "GET",
            url: Routes.getCoursesCartRoute
        });
    },

    __getCurrentSchedule: function() {
        return $.ajax({
            type: "GET",
            url: Routes.getSchedule
        });

    },

    _getRequiredCourses: function() {
        return $.ajax({
            type: "GET",
            url: Routes.getRequiredCourses
        });

    },

    __getCourseById: function(id) {

        for(var i=0; i<this.courseArray.length; i++)
        {
            if(this.courseArray[i].id == id)
            {
                return this.courseArray[i];
            }
        }
        return null;
    },

    _getBucketById: function(bucketId, bucketList)
    {
        for(var i=0; i<bucketList.length; i++)
        {
            if(bucketList[i].id == bucketId)
            {
                return bucketList[i];
            }
        }
        return -1;
    },

    __getSelectedCourseById: function(list, id) {

        for(var i=0; i<list.length; i++)
        {
            if(list[i].id == id)
            {
                return list[i];
            }
        }
        return null;
    },

    save: function(freshmanSchedule, freshmanTopCourse, sophomoreTopCourse,
                   juniorTopCourse, seniorTopCourse, sophomoreSchedule, juniorSchedule, seniorSchedule) {
        if(freshmanTopCourse[0] == undefined || freshmanTopCourse.length == 0)
        {
            freshmanTopCourse = new Array();
            freshmanTopCourse.push({id: -1});
        }

        if(sophomoreTopCourse[0] == undefined || sophomoreTopCourse.length == 0)
        {
            sophomoreTopCourse = new Array();
            sophomoreTopCourse.push({id: -1});
        }

        if(juniorTopCourse[0] == undefined || juniorTopCourse.length == 0)
        {
            juniorTopCourse = new Array();
            juniorTopCourse.push({id: -1});
        }

        if(seniorTopCourse[0] == undefined || seniorTopCourse.length == 0)
        {
            seniorTopCourse = new Array();
            seniorTopCourse.push({id: -1});
        }

        var freshmanIDList = this.generateList(freshmanSchedule),
            sophomoreIDList = this.generateList(sophomoreSchedule),
            juniorIDList = this.generateList(juniorSchedule),
            seniorIDList = this.generateList(seniorSchedule),
            freshmanTopCourse = freshmanTopCourse[0].id,
            sophomoreTopCourse = sophomoreTopCourse[0].id,
            juniorTopCourse = juniorTopCourse[0].id,
            seniorTopCourse = seniorTopCourse[0].id,
            freshmanNotes = ( $("#freshmanNotes").val() == "null") ? "" : $("#freshmanNotes").val(),
            sophomoreNotes = ( $("#sophomoreNotes").val() == "null") ? "" : $("#sophomoreNotes").val(),
            juniorNotes = ( $("#juniorNotes").val() == "null") ? "" : $("#juniorNotes").val(),
            seniorNotes = ( $("#seniorNotes").val() == "null") ? "" : $("#seniorNotes").val();


        var data = '{' +
            '"freshmanClasses": "'+freshmanIDList+'",' +
            '"sophomoreClasses": "'+sophomoreIDList+'",' +
            '"juniorClasses": "'+juniorIDList+'",' +
            '"seniorClasses": "'+seniorIDList+'",' +
            '"freshmanTopCourse": "'+freshmanTopCourse+'",' +
            '"sophomoreTopCourse": "'+sophomoreTopCourse+'",' +
            '"juniorTopCourse": "'+juniorTopCourse+'",' +
            '"seniorTopCourse": "'+seniorTopCourse+'",' +
            '"freshmanNotes": "'+freshmanNotes+'",' +
            '"sophomoreNotes": "'+sophomoreNotes+'",' +
            '"juniorNotes": "'+juniorNotes+'",' +
            '"seniorNotes": "'+seniorNotes+'"' +
            '}';


        $.ajax({
            type: "POST",
            url: Routes.saveSchedule,
            dataType: 'json',
            contentType : 'application/json; charset=utf-8',
            data: data
        });
    },

    generateList: function(arr)
    {
        var returnArr = new Array();
        for(var i=0; i<arr.length; i++)
        {
            returnArr.push(arr[i].id);
        }

        return returnArr.toString();
    },

    getNumberFirstSemesterCourses: function(arr)
    {
        var count = 0;
        for(var i=0; i<arr.length; i++)
        {
            if( arr[i].duration != "2" && arr[i].partOfSchedule )
            {
                count++;
            }
        }

        return count;
    },


    getNumberSecondSemesterCourses: function(arr)
    {
        var count = 0;
        for(var i=0; i<arr.length; i++)
        {
            if( arr[i].duration != "1"  && arr[i].partOfSchedule)
            {
                count++;
            }
        }
        return count;
    },

    setCourseArray: function(arr)
    {
        this.courseArray = arr;
    },

    saveServiceHours: function(serviceHours)
    {

        var data = '{' +
            '"serviceHours": "'+serviceHours+'"' +
            '}';

        $.ajax({
            type: "POST",
            url: Routes.saveServiceHours,
            dataType: 'json',
            contentType : 'application/json; charset=utf-8',
            data: data
        });
    },

    savePECredits: function(PECredits)
    {
        var data = '{' +
            '"PECredits": "'+PECredits+'"' +
            '}';

        $.ajax({
            type: "POST",
            url: Routes.savePECredits,
            dataType: 'json',
            contentType : 'application/json; charset=utf-8',
            data: data
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

    $scope.addCourseToCart = function(courseId, save) {
        for(var i=0; i<$scope.classes.length; i++)
        {
            if($scope.classes[i].id == courseId)
            {
                if($.inArray($scope.classes[i], $scope.courseCartArray) == -1)
                {
                    popCart(true);
                    $scope.courseCartArray.push($scope.classes[i]);
                    if(save)
                        $scope.saveCourseCart();
                }
            }
        }
    };
}

function SchedulerCtrl($scope, $filter) {
    var promise = Scheduler.__getCourses();
    var requiredCoursePromise = Scheduler._getRequiredCourses();

    $scope.freshmanBucketCount = 0;
    $scope.sophomoreBucketCount = 0;
    $scope.juniorBucketCount = 0;
    $scope.seniorBucketCount = 0;

    $scope.classes = new Array();

    // Top courses are now a single object.
    $scope.freshmanTopCourse = {};
    $scope.sophomoreTopCourse = {};
    $scope.juniorTopCourse = {};
    $scope.seniorTopCourse = {};

    $scope.freshmanClasses = new Array();
    $scope.sophomoreClasses = new Array();
    $scope.juniorClasses = new Array();
    $scope.seniorClasses = new Array();
    $scope.courseRequirements = new Array();

    $scope.schedule = {
        serviceHours: "0",
        requiredHours: "40",
        artsCredits: "0",
        PECredits: "0",
        savedPECredits: "0",
        requiredArtsCredits: "15",
        requiredPECredits: "15"
    };

    $scope.getTopCourse = function(list) {

        var returnedArray = new Array();

        if(list == "freshmen")
        {
            var topCourseList = $scope.freshmanTopCourse;
        }

        if(list == "sophomores")
        {
            var topCourseList = $scope.sophomoreTopCourse;
        }

        if(list == "juniors")
        {
            var topCourseList = $scope.juniorTopCourse;
        }

        if(list == "seniors")
        {
            var topCourseList = $scope.seniorTopCourse;
        }

        if(topCourseList !== -1)
        {
            returnedArray.push(Scheduler.__getCourseById(topCourseList));
            return returnedArray;
        }
        else
        {
            return new Array();
        }

    };



    $scope.calculateProgressColor = function () {
        var percentComplete = ($scope.schedule.serviceHours/$scope.schedule.requiredHours)*100;

        $("#community-service").removeClass("progress-bar-danger");
        $("#community-service").removeClass("progress-bar-warning");
        $("#community-service").removeClass("progress-bar-success");

        // If it's 25% or below, make it red
        if(percentComplete <= 25)
        {
            $("#community-service").addClass("progress-bar-danger");
        }

        // If it's more than 25% but less than 100%, make it yellow
        if(percentComplete > 25 && percentComplete < 100)
        {
            $("#community-service").addClass("progress-bar-warning");
        }

        // If done with community service, make it green
        if(percentComplete >= 100)
        {
            $("#community-service").addClass("progress-bar-success");
        }
    };

    $scope.calculateArtsProgressColor = function () {
        var percentComplete = ($scope.schedule.artsCredits/$scope.schedule.requiredArtsCredits)*100;

        $("#arts").removeClass("progress-bar-danger");
        $("#arts").removeClass("progress-bar-warning");
        $("#arts").removeClass("progress-bar-success");

        // If it's 35% or below, make it red
        if(percentComplete < 35)
        {
            $("#arts").addClass("progress-bar-danger");
        }

        // If it's more than 35% but less than 100%, make it yellow
        if(percentComplete > 35 && percentComplete < 100)
        {
            $("#arts").addClass("progress-bar-warning");
        }

        // If done with community service, make it green
        if(percentComplete >= 100)
        {
            $("#arts").addClass("progress-bar-success");

        }
    };

    $scope.calculatePEProgressColor = function () {
        var percentComplete = ($scope.schedule.PECredits/$scope.schedule.requiredPECredits)*100;

        $("#pe").removeClass("progress-bar-danger");
        $("#pe").removeClass("progress-bar-warning");
        $("#pe").removeClass("progress-bar-success");

        // If it's 35% or below, make it red
        if(percentComplete < 35)
        {
            $("#pe").addClass("progress-bar-danger");
        }

        // If it's more than 35% but less than 100%, make it yellow
        if(percentComplete > 35 && percentComplete < 100)
        {
            $("#pe").addClass("progress-bar-warning");
        }

        // If done with community service, make it green
        if(percentComplete >= 100)
        {
            $("#pe").addClass("progress-bar-success");

        }
    };

    // Required Courses Promise
    requiredCoursePromise.success(function(data){
        var parsedData = JSON.parse(data);

        for(var i=0; i<parsedData.length; i++)
        {
            // In bucket context
            $scope.courseRequirements.push(parsedData[i]);
        }

        for(var i=0; i<$scope.courseRequirements.length; i++)
        {
            for(var x=0; x<$scope.courseRequirements[i].courseList.length; x++)
            {
                var requiredFor = $scope.courseRequirements[i].courseList[x].requiredFor;

                if(requiredFor == "freshmen")
                    $scope.freshmanBucketCount++;

                if(requiredFor == "sophomores")
                    $scope.sophomoreBucketCount++;

                if(requiredFor == "juniors")
                    $scope.juniorBucketCount++;

                if(requiredFor == "seniors")
                    $scope.seniorBucketCount++;

            }
        }

    });

    $scope.addRequiredCourse = function(bucketId, courseId) {

        var bucketObj = Scheduler._getBucketById(bucketId, $scope.courseRequirements);
        var requiredFor = bucketObj.requiredFor,
            courseList;

        if(requiredFor === "freshmen")
        {
            courseList = $scope.freshmanClasses;
        }

        if(requiredFor === "sophomores")
            courseList = $scope.sophomoreClasses;

        if(requiredFor === "juniors")
            courseList = $scope.juniorClasses;

        if(requiredFor === "seniors")
            courseList = $scope.seniorClasses;

        $scope.addCourse(Scheduler.__getCourseById(courseId), requiredFor);
    };

    $scope.freshmanBuckets = function(item)
    {
        if (!item)
            return false;

        if (item.requiredFor == "freshmen")
        {
            return true;
        }

        return false;

    };

    $scope.sophomoreBuckets = function(item)
    {
        if (!item)
            return false;

        if (item.requiredFor == "sophomores")
        {
            return true;
        }

        return false;

    };

    $scope.juniorBuckets = function(item)
    {
        if (!item)
            return false;

        if (item.requiredFor == "juniors")
        {
            return true;
        }

        return false;

    };

    $scope.seniorBuckets = function(item)
    {
        if (!item)
            return false;

        if (item.requiredFor == "seniors")
        {
            return true;
        }

        return false;

    };


    // Returning false will prevent it from showing, so we return false when it IS empty
    $scope.requirementsNotEmpty = function(requirementsText) {

        if( ( (requirementsText.toLowerCase()).indexOf("none") != -1 && requirementsText.length < 7 ) || requirementsText.length == 0 )
        {
            return false;
        }

        return true;
    };

    promise.success(function(data){
        var parsedData = JSON.parse(data);


        $scope.$apply(function(){
            $scope.classes = parsedData;
        });

        Scheduler.setCourseArray(parsedData);

        var currentSchedule = Scheduler.__getCurrentSchedule();

        currentSchedule.success(function(data){
            $scope.$apply(function(){
                data = JSON.parse(data);
                $scope.schedule.serviceHours = data.serviceHours;
                $scope.schedule.savedPECredits = data.PECredits;

                $scope.calculateProgressColor();

                // Freshman Class
                var freshmanClassArray = data.freshmanClasses.split(',');
                for(var i=0; i<freshmanClassArray.length; i++)
                {
                    if(freshmanClassArray[i] !== "" && freshmanClassArray[i] != "null")
                    {
                        var courseObject = Scheduler.__getCourseById(freshmanClassArray[i]);
                        $scope.addCourse(courseObject, "freshmen");
                    }

                }

                // Freshman Notes
                (data.freshmanNotes == "null" || data.freshmanNotes == null) ? '' : $("#freshmanNotes").val(data.freshmanNotes);

                // Freshman Top Course
                if(data.freshmanTopCourse !== "null" && data.freshmanTopCourse != "undefined")
                {
                    $scope.freshmanTopCourse = [];
                    var topCourse = Scheduler.__getSelectedCourseById($scope.classes, data.freshmanTopCourse);
                    if(topCourse !== null)
                        $scope.freshmanTopCourse.push(topCourse);

                }

                // Sophomore Class
                var sophomoreClassArray = data.sophomoreClasses.split(',');
                for(var i=0; i<sophomoreClassArray.length; i++)
                {
                    if(sophomoreClassArray[i] !== "" && sophomoreClassArray[i] != "null")
                    {
                        var courseObject = Scheduler.__getCourseById(sophomoreClassArray[i]);
                        $scope.addCourse(courseObject, "sophomores");
                    }

                }

                // Sophomore Notes
                (data.sophomoreNotes == "null" || data.sophomoreNotes == null) ? '' : $("#sophomoreNotes").val(data.sophomoreNotes);

                // Sophomore Top Course
                if(data.sophomoreTopCourse !== "null" && data.sophomoreTopCourse != "undefined")
                {
                    $scope.sophomoreTopCourse = [];
                    var topCourse = Scheduler.__getSelectedCourseById($scope.classes, data.sophomoreTopCourse);
                    if(topCourse !== null)
                        $scope.sophomoreTopCourse.push(topCourse);

                }


                // Junior Class
                var juniorClassArray = data.juniorClasses.split(',');
                for(var i=0; i<juniorClassArray.length; i++)
                {
                    if(juniorClassArray[i] !== "" && juniorClassArray[i] != "null")
                    {
                        var courseObject = Scheduler.__getCourseById(juniorClassArray[i]);
                        $scope.addCourse(courseObject, "juniors");
                    }

                }

                // Junior Notes
                (data.juniorNotes == "null" || data.juniorNotes == null) ? '' : $("#juniorNotes").val(data.juniorNotes);

                // Junior Top Course
                if(data.juniorTopCourse !== "null" && data.juniorTopCourse != "undefined")
                {
                    $scope.juniorTopCourse = [];
                    var topCourse = Scheduler.__getSelectedCourseById($scope.classes, data.juniorTopCourse);
                    if(topCourse !== null)
                        $scope.juniorTopCourse.push(topCourse);

                }


                // Senior Class
                var seniorClassArray = data.seniorClasses.split(',');
                for(var i=0; i<seniorClassArray.length; i++)
                {
                    if(seniorClassArray[i] !== "" && seniorClassArray[i] != "null")
                    {
                        var courseObject = Scheduler.__getCourseById(seniorClassArray[i]);
                        $scope.addCourse(courseObject, "seniors");
                    }

                }

                // Senior Notes
                (data.seniorNotes == "null" || data.seniorNotes == null) ? '' : $("#seniorNotes").val(data.seniorNotes);

                // Senior Top Course
                if(data.seniorTopCourse !== "null" && data.seniorTopCourse != "undefined")
                {
                    $scope.seniorTopCourse = [];
                    var topCourse = Scheduler.__getSelectedCourseById($scope.classes, data.seniorTopCourse);
                    if(topCourse !== null)
                        $scope.seniorTopCourse.push(topCourse);

                }


                $scope.getArtsCredits();
            });
            $("#scheduleLoading").fadeOut();
            $("#main-container").fadeOut();

            setTimeout(function(){ $("#main-container").fadeIn(); $("#theSchedule").fadeIn(); }, 400);
        });
    });



    $scope.addCourse = function(datum, list)
    {
        if(list == "freshmen")
        {
            var topCourseList = $scope.freshmanTopCourse,
                courseList = $scope.freshmanClasses;
        }

        if(list == "sophomores")
        {
            var topCourseList = $scope.sophomoreTopCourse,
                courseList = $scope.sophomoreClasses;
        }

        if(list == "juniors")
        {
            var topCourseList = $scope.juniorTopCourse,
                courseList = $scope.juniorClasses;
        }

        if(list == "seniors")
        {
            var topCourseList = $scope.seniorTopCourse,
                courseList = $scope.seniorClasses;
        }

        if (Scheduler.__getSelectedCourseById(courseList, datum.id) === null) {

            if(Scheduler.getNumberFirstSemesterCourses(courseList) == 7)
            {
                if( (datum.duration == "1" || datum.duration == "12" ) && datum.creditType != "PE")
                {
                    $("#tooManyCoursesDialog").modal();
                    return false;
                }
            }

            if(Scheduler.getNumberSecondSemesterCourses(courseList) == 7)
            {
                if( (datum.duration == "2" || datum.duration == "12" ) && datum.creditType != "PE")
                {
                    $("#tooManyCoursesDialog").modal();
                    return false;
                }
            }

            if(topCourseList !== -1 && datum.id == topCourseList)
            {
                datum.flagged = true;
            }

            $scope.safeApply(function(){
                courseList.push(datum);
            });

            // Check if it satisfies any buckets.
            for(var i=0; i<$scope.courseRequirements.length; i++)
            {
                for(var x=0; x<$scope.courseRequirements[i].courseList.length; x++)
                {
                    if($scope.courseRequirements[i].courseList[x].id == datum.id)
                    {
                        $scope.courseRequirements[i].satisfied = true;
                    }
                }
            }
        }
    };

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

    $('#freshmanCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "freshmen");
    });

    $('#freshmanPESelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "freshmen");

    });

    $('#sophomorePESelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "sophomores");

    });

    $('#juniorPESelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "juniors");

    });

    $('#seniorPESelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "seniors");

    });

    $('#freshmanTopCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');
        $scope.$apply(function(){
            $scope.freshmanTopCourse = [];
            $scope.freshmanTopCourse.push(Scheduler.__getCourseById(datum.id));
        })
    });

    $('#sophomoreCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "sophomores");
    });

    $('#sophomoreTopCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');
        $scope.$apply(function(){
            $scope.sophomoreTopCourse = [];
            $scope.sophomoreTopCourse.push(Scheduler.__getCourseById(datum.id));
        })
    });

    $('#juniorTopCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');
        $scope.$apply(function(){
            $scope.juniorTopCourse = [];
            $scope.juniorTopCourse.push(Scheduler.__getCourseById(datum.id));
        })
    });

    $('#seniorTopCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');
        $scope.$apply(function(){
            $scope.seniorTopCourse = [];
            $scope.seniorTopCourse.push(Scheduler.__getCourseById(datum.id));
        })
    });

    $('#juniorCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "juniors");
    });

    $('#seniorCourseSelect').bind('typeahead:selected', function(obj, datum) {
        $(this).val('');

        $scope.addCourse(datum, "seniors");
    });

    $scope.removeCourse = function(id, list) {
        var courseList, topCourse;
        if(list === "freshman")
        {
            courseList = $scope.freshmanClasses;
            topCourse = $scope.freshmanTopCourse;
        }

        if(list === "sophomore")
        {
            courseList = $scope.sophomoreClasses;
            topCourse = $scope.sophomoreTopCourse;
        }

        if(list === "junior")
        {
            courseList = $scope.juniorClasses;
            topCourse = $scope.juniorTopCourse;
        }

        if(list === "senior")
        {
            courseList = $scope.seniorClasses;
            topCourse = $scope.seniorTopCourse;
        }

        $('.typeahead').val('');

        var index = 0;
        while (courseList[index].id !== id)
        {
            index++;
        }
        if(topCourse != undefined && topCourse[0] != undefined && topCourse[0].length !== 0 && topCourse[0].id == id)
        {
            $scope.freshmanTopCourse = [];
        }
        courseList.splice(index, 1);

    };

    $scope.checkRequirements = function(bucketId, requiredFor)
    {

        var bucketObj = Scheduler._getBucketById(bucketId, $scope.courseRequirements);

        for(var i=0; i<bucketObj.courseList.length; i++)
        {
            var list;

            if(requiredFor == "freshmen")
                list = $scope.freshmanClasses;

            if(requiredFor == "sophomores")
                list = $scope.sophomoreClasses;

            if(requiredFor == "juniors")
                list = $scope.juniorClasses;

            if(requiredFor == "seniors")
                list = $scope.seniorClasses;

            if(Scheduler.__getSelectedCourseById(list, bucketObj.courseList[i].id) == null)
            {
                bucketObj.satisfied = false;
            }
            else
            {
                bucketObj.satisfied = true;
                return true;
            }
        }

        return bucketObj.satisfied;

    };

    $scope.showCourseDetails = function(courseId) {
        var courseObject = Scheduler.__getCourseById(courseId);

        $("#courseDetailsName").html(courseObject.name);
        $("#courseDetailsDescription").html(courseObject.description);

        $("#courseDetails").modal();

    };

    $scope.clearTopCourse = function(list) {
        var courseList;
        if(list === "freshman")
            $scope.freshmanTopCourse = [];

        if(list === "sophomore")
            $scope.sophomoreTopCourse = [];

        if(list === "junior")
            $scope.juniorTopCourse = [];

        if(list === "senior")
            $scope.seniorTopCourse = [];

        courseList = [];
    }

    $scope.firstSemester = function(item) {
        if (!item || !item.partOfSchedule)
            return false;

        if( item.duration != "2" && item.partOfSchedule)
        {
            return true;
        }
    };

    $scope.secondSemester = function(item) {
        if (!item || !item.partOfSchedule)
            return false;
        if( item.duration != "1" && item.partOfSchedule)
        {
            return true;
        }
    };

    $scope.PECredit = function(item)
    {
        if(!item)
            return false;

        if(item !== null && item.creditType == "PE" && !item.partOfSchedule)
            return true;
    }

    $scope.save = function(showSaved) {
        Scheduler.save($scope.freshmanClasses, $scope.freshmanTopCourse, $scope.sophomoreTopCourse, $scope.juniorTopCourse, $scope.seniorTopCourse, $scope.sophomoreClasses, $scope.juniorClasses, $scope.seniorClasses);

        if(showSaved)
        {
            $(".savedText").fadeIn();
            setTimeout(function(){ $(".savedText").fadeOut(); }, 3000);
        }
    };

    $scope.editServiceHours = function () {
        $("#serviceHoursSelect").val($scope.schedule.serviceHours);
        $("#serviceHoursModal").modal();
    };

    $scope.editPECredits = function () {
        $("#PECreditsSelect").val($scope.schedule.savedPECredits);
        $("#PECreditsModal").modal();
    };

    $scope.updatePECredits = function () {
        Scheduler.savePECredits($("#PECreditsSelect").val());
        $scope.schedule.savedPECredits = $("#PECreditsSelect").val();
        $scope.calculatePEProgressColor();

    }

    $scope.updateServiceHours = function () {
        Scheduler.saveServiceHours($("#serviceHoursSelect").val());
        $scope.schedule.serviceHours = $("#serviceHoursSelect").val();
        $scope.calculateProgressColor();

    };

    $scope.getArtsCredits = function () {
        var count = 0;

        for(var i=0; i<$scope.freshmanClasses.length; i++)
        {
            if($scope.freshmanClasses[i].creditType == "art")
            {
                if($scope.freshmanClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        for(var i=0; i<$scope.sophomoreClasses.length; i++)
        {
            if($scope.sophomoreClasses[i].creditType == "art")
            {
                if($scope.sophomoreClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        for(var i=0; i<$scope.juniorClasses.length; i++)
        {
            if($scope.juniorClasses[i].creditType == "art")
            {
                if($scope.juniorClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        for(var i=0; i<$scope.seniorClasses.length; i++)
        {
            if($scope.seniorClasses[i].creditType == "art")
            {

                if($scope.seniorClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        $scope.schedule.artsCredits = count;
        $scope.calculateArtsProgressColor();

        return count;

    };

    $scope.getPECredits = function () {
        var count = 0;

        for(var i=0; i<$scope.freshmanClasses.length; i++)
        {
            if($scope.freshmanClasses[i].creditType == "PE")
            {
                if($scope.freshmanClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        for(var i=0; i<$scope.sophomoreClasses.length; i++)
        {
            if($scope.sophomoreClasses[i].creditType == "PE")
            {
                if($scope.sophomoreClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        for(var i=0; i<$scope.juniorClasses.length; i++)
        {
            if($scope.juniorClasses[i].creditType == "PE")
            {
                if($scope.juniorClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        for(var i=0; i<$scope.seniorClasses.length; i++)
        {
            if($scope.seniorClasses[i].creditType == "PE")
            {

                if($scope.seniorClasses[i].duration == "12")
                {
                    count += 10;
                }
                else
                {
                    count += 5;
                }
            }
        }

        $scope.schedule.PECredits = count+parseInt($scope.schedule.savedPECredits);
        $scope.calculatePEProgressColor();

        return $scope.schedule.PECredits;

    }
};

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
