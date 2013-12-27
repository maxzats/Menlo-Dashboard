// Define the tour!
var tour = {
    id: "schedule-tour",
    steps: [
        {
            title: "Different Column for Every Year",
            content: "This page provides an overview for all four years of your high school schedule. Click on any course to quickly view its description.",
            target: "freshmanColumn",
            placement: "right",
            xOffset: -50,
            yOffset: 50
        },
        {
            title: "Click the Pencil Icon",
            content: "Click the pencil icon to edit your schedule for the selected year. You'll be taken to a different view that will allow you to add and remove courses, check requirements, and more.",
            target: "hopscotchPencil",
            placement: "left",
            yOffset: -23,
            xOffset: 30

        },
        {
            title: "Keep track of Graduation Requirements!",
            content: "The courses you add are assigned different credit types: PE credits, Art credits, or regular class credits. To fulfill your graduation requirements, check for your progress on the various graduation requirements.",
            target: "graduationRequirements",
            placement: "top"
        },
        {
            title: "Community Service",
            content: "Community service hours must be set manually. Whenever you receive credit for community service, update the number of hours here.",
            target: "hoursHopscotch",
            placement: "top"
        },
        {
            title: "Arts Requirement",
            content: "Your arts credits will be automatically updated as you add arts courses to your schedule.",
            target: "hopscotchArts",
            yOffset: -15,
            placement: "top"
        },
        {
            title: "PE Requirement",
            content: "This will automatically update as you add P.E credit courses to your schedule. However, if you receive P.E credits from an outside of school activity, you may manually set how many credits you receive here.",
            target: "PEHopscotch",
            yOffset: -20,
            placement: "top"
        },
        {
            title: "That's it!",
            content: "If you would like to revisit the tour at any time, press this button again. Have fun!",
            target: "startTour",
            yOffset: -20,
            placement: "left"
        }

    ]
};

$(document).ready(function(){
    $("#startTour").click(function(){
        hopscotch.endTour(true);
        hopscotch.startTour(tour, 0);
    });
});