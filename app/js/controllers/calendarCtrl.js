timeTrackerApp.controller('CalendarCtrl', function($scope, TimeTracker) {

	$scope.testData = TimeTracker.getTestData();		//a list of data

	$scope.logOrNotLog = function(calEvent) {		//changes the status of logged or not logged
		if (calEvent.logged == false){
			calEvent.logged = true;
		}
		else
			calEvent.logged = false;
		console.log(calEvent.logged);
	}

// initializes the calendar
	$(document).ready(function() {
    //page is now ready
    
    	$('#calendar').fullCalendar(
    	{
    		header: {
                center: 'title',					//whats in the center of the header
                left:'',
                right:  'today prev,next',			//whats on the right of the header
                prev: 'left-single-arrow',
   				next: 'right-single-arrow'
            },
            allDaySlot: false,    			//no all day events    
            defaultView: 'agendaWeek',      //a week with squares for the time slots    
            firstDay: 1,					//starts on monday
            scrollTime: '07:30:00',			//the time which shows up at the top
            height: 650,					//a constant height for scrolltime to work
            handleWindowResize: true, 		//for resizing
            selectable:true,				//its possible to select/highlight several time slots

            eventClick: function(calEvent, jsEvent, view){ 	//when click on an event
        		
        		//$(this).css('background-color', 'grey');	// change the border color if we want

        		$('#modalTitle').html(calEvent.title);
                $('#category').html("Category: " + calEvent.category);
               	$('#logged').html('Logged: ' + calEvent.logged);
               	$('#eventUrl').attr('href', calEvent.url);		//links to the url if you press button
                $('#fullCalModal').modal();						//starts the modal box

               	$("#loggedButton").click(function(){		//when click on the change if logged button
               		$scope.logOrNotLog(calEvent);			//changes logged status
               		calEvent.color="black";
               		$('#calendar').fullCalendar('refetchEvents');		//updates all the events
               		//eventClickFunction(calEvent, jsEvent, view);
               	});

                return false;
    		},

    		select: function(start, end, jsEvent, view, [ resource ]){	//should be activated when several slots are selected??
    			alert(start.format() + " " + end.format())
    		}, 

    		//eventMouseover: function(event, jsEvent, view) { 			//for hovering over events! Its kinda disturbing since it happens all the time..
    		//	alert('you hoved over ' + event.title)
    			//},

    		//eventMouseOut: function(event, jsEvent, view){
    			//remove alert?
    			//},

            eventSources: [{
            	events: $scope.testData,  		//the events in the calendar
            	}]
    	});
	});
});