timeTrackerApp.controller('CalendarCtrl', function($scope, $http, TimeTracker) {

	//$scope.testData = TimeTracker.getTestData();		//a list of data

    $scope.categoryNames = TimeTracker.getCategoryNames(); // names of the categories

    $scope.categoryArray = TimeTracker.getCategories();     //list of categories

    $scope.currentCat = null;

    $scope.showModal = false;


	$scope.logOrNotLog = function(calEvent) {		//changes the status of logged or not logged

        if (calEvent.logged == true) {
            calEvent.borderColor = calEvent.color;
        }
        else {
            calEvent.borderColor = 'black';
        }

        $scope.modalEvent = calEvent;
        TimeTracker.changeLoggedStatus(calEvent);
        $('#calendar').fullCalendar('refetchEvents');           // still some jQuery here!
	}

    $scope.changeAutoReport = function(calEvent) {
        $scope.modalEvent = calEvent;
        TimeTracker.changeEventAutoReport(calEvent);
        $('#calendar').fullCalendar('refetchEvents');           // still some jQuery here!
    }


    // currently chosen category in list
    $scope.currentSelCat = function(selected) {
        $scope.currentCat = selected;
    };

    $scope.changeCategory = function(calEvent) {       //changes the category
        if ($scope.currentCat != null){
            calEvent.category = $scope.currentCat;
            calEvent.color = TimeTracker.getColorByCategory(calEvent.category);
            if (calEvent.logged == true) {
                calEvent.borderColor = TimeTracker.getColorByCategory(calEvent.category);
            }
            $scope.modalEvent = calEvent;

            TimeTracker.changeCategory(calEvent);
            $('#calendar').fullCalendar('refetchEvents');           // still some jQuery here!
        }
    }

    //$scope.hideEvent = function(calEvent){
      //  calEvent.logged = false;
       // calEvent.color = "white";
        //calEvent.borderColor = "white";
        //calEvent.textColor = "#E3DADC";
        //$scope.modalEvent = calEvent;

        //$('#calendar').fullCalendar('refetchEvents');           // still some jQuery here!
    //}


    //from calendar angular walk through
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
     
     
    /*event source that pulls from google.com
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };*/
     
     
    //This will call onLoad and you can assign the values the way you want to the calendar
    //here DataRetriever.jsp will give me array of JSON data generated from the database data
    /*$http.get('DataRetriever.jsp').success(function(data) {
        for(var i = 0; i < data.length; i++)
        {
            $scope.events[i] = {id:data[i].id, title: data[i].task,start: new Date(data[i].start), end: new Date(data[i].end),allDay: false};
        }
    }); */
     
    /*
    //to explicitly add events to the calendar
    //you can add the events in following ways
    $scope.events = [
      {title: 'All Day Event',start: new Date('Thu Oct 17 2013 09:00:00 GMT+0530 (IST)')},
      {title: 'Long Event',start: new Date('Thu Oct 17 2013 10:00:00 GMT+0530 (IST)'),end: new Date('Thu Oct 17 2013 17:00:00 GMT+0530 (IST)')},
      {id: 999,title: 'Repeating Event',start: new Date('Thu Oct 17 2013 09:00:00 GMT+0530 (IST)'),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    //we don't need it right now*/
     
     
    //with this you can handle the events that generated by clicking the day(empty spot) in the calendar
    $scope.dayClick = function( date, allDay, jsEvent, view ){
        $scope.$apply(function(){
          $scope.alertMessage = ('Day Clicked ' + date);
        });
    };
     
    
     
     
    //by resizing any event or drag and drop to different position in the calendar
    //updates time in the module for that event
    $scope.alertOnResizeAndDrop = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){

        var dateS = new Date(event.start);
        var startZone = dateS.getTimezoneOffset();

        var dateE = new Date(event.end);
        var endZone = dateE.getTimezoneOffset();
            
        var startDate = new Date(event.start);
        startDate.setTime(startDate.getTime() + startZone*60*1000);

        var endDate = new Date(event.end);
        endDate.setTime(endDate.getTime() + endZone*60*1000);
            
        TimeTracker.updateTime(event, startDate, endDate);
    };
     
    /*
    //this code will add new event and remove the event present on index
    //you can call it explicitly in any method
      $scope.events.push({
        title: 'New Task',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        className: ['newtask']
      });
     
    $scope.events.splice(index,1);*/
     
     
    //with this you can handle the click on the events
    $scope.eventClick = function(calEvent, jsEvent, view){  //when click on an event
        //$(this).css('background-color', 'grey');  // change the border color if we want
        $scope.modalEvent = calEvent;

        $('#fullCalModal').modal();                     //starts the modal box

        return false;
    };
     

     
    //with this you can handle the events that generated by each page render process
    $scope.renderView = function(view){    
        var date = new Date(view.calendar.getDate());
        $scope.currentDate = date.toDateString();
        $scope.$apply(function(){
          $scope.alertMessage = ('Page render with date '+ $scope.currentDate);
        });
    };
     
 
    //with this you can handle the events that generated when we change the view i.e. Month, Week and Day
    /*$scope.changeView = function(view,calendar) {
        currentView = view;
        calendar.fullCalendar('changeView',view);
        $scope.$apply(function(){
          $scope.alertMessage = ('You are looking at '+ currentView);
        });
    }; */
    
     
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: '',
          center: 'title',
          right: 'today prev,next',
          prev: 'left-single-arrow',
          next: 'right-single-arrow'
        },
        allDaySlot: false,              //no all day events    
            defaultView: 'agendaWeek',      //a week with squares for the time slots
            nowIndicator: true,             // shows current time  
            firstDay: 1,                    //starts on monday
            scrollTime: '07:30:00',         //the time which shows up at the top
            height: 650,                    //a constant height for scrolltime to work
            handleWindowResize: true,       //for resizing
            axisFormat: 'HH(:mm)',
            timeFormat: 'HH:mm',
            columnFormat: 'ddd D/M',

        eventClick: $scope.eventClick,
        //dayClick: $scope.dayClick,
        eventDrop: $scope.alertOnResizeAndDrop,
        eventResize: $scope.alertOnResizeAndDrop,
        //viewRender: $scope.renderView

      }    
    };
     
    /* event sources array*/
    $scope.eventSources = [TimeTracker.getTestData()];



/*
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
            nowIndicator: true,             // shows current time  
            firstDay: 1,					//starts on monday
            scrollTime: '07:30:00',			//the time which shows up at the top
            height: 650,					//a constant height for scrolltime to work
            handleWindowResize: true, 		//for resizing
            selectable:true,				//its possible to select/highlight several time slots
            axisFormat: 'HH(:mm)',
            timeFormat: 'HH:mm',
            columnFormat: 'ddd D/M',

            eventClick: function(calEvent, jsEvent, view){ 	//when click on an event
        		
        		//$(this).css('background-color', 'grey');	// change the border color if we want
        		$('#modalTitle').html(calEvent.title);
                $('#category').html("Category: " + calEvent.category);
               	$('#logged').html('Logged: ' + calEvent.logged);
               	//$('#eventUrl').attr('href', calEvent.url);		//links to the url if you press button
                $('#fullCalModal').modal();						//starts the modal box

               	$("#loggedButton").unbind().click(function(){		//when click on the change if logged button
               		$scope.logOrNotLog(calEvent);			       //changes logged status    
                    $("#logged").html('Logged: ' + calEvent.logged);       
                    $('#calendar').fullCalendar('updateEvent', calEvent); // update the event
               	});

                $("#categoryButton").unbind().click(function(){
                    $scope.changeCategory(calEvent);
                    $('#category').html("Category: " + calEvent.category);
                    $('#calendar').fullCalendar('updateEvent', calEvent);   // update the event
                    //$('#calendar').fullCalendar('refetchEvents');
                    //console.log(calEvent);
                    //console.log($scope.testData);

                });
                //console.log(calEvent);
                //console.log($scope.testData);


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


    */



});