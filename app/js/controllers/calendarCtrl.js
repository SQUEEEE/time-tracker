timeTrackerApp.controller('CalendarCtrl', function($scope, $http, TimeTracker) {

	$scope.testData = TimeTracker.getTestData();		//a list of data

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

        return calEvent;
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

    $scope.deleteEvent = function(calEvent){
        $scope.modalEvent = calEvent;
        TimeTracker.deleteEvent(calEvent);
        $('#calendar').fullCalendar('refetchEvents');           // still some jQuery here!
    }

    $scope.hideEvent = function(calEvent){
        calEvent.logged = false;
        calEvent.autoReport = false;
        calEvent.color = "white";
        calEvent.borderColor = "white";
        calEvent.textColor = "#E3DADC";
        calEvent.hidden = true;
        $scope.modalEvent = calEvent;
        TimeTracker.hideEvent(calEvent);
        $('#calendar').fullCalendar('refetchEvents');           // still some jQuery here!
    }

    $scope.unHideEvent = function(calEvent){
        currentTime = Date.now();
        eventEndTime = Date.parse(calEvent.end);
            
        if (currentTime > eventEndTime) {
                calEvent.logged = true;
        }
        else {
            calEvent.logged = false;
        }

        for (i in $scope.categoryArray) {
            if ($scope.categoryArray[i].name == calEvent.category) {
                calEvent.color = $scope.categoryArray[i].color;
                calEvent.autoReport = $scope.categoryArray[i].autoReport;
            }
        }
      
        calEvent.textColor = "black";
        calEvent.hidden = false;

        calEvent = $scope.logOrNotLog(calEvent);
        $scope.modalEvent = calEvent;
        TimeTracker.hideEvent(calEvent);
        $('#calendar').fullCalendar('refetchEvents');           // still some jQuery here!
    }
     
     
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

        dateS = new Date(event.start);
        startZone = dateS.getTimezoneOffset();

        dateE = new Date(event.end);
        endZone = dateE.getTimezoneOffset();
            
        startDate = new Date(event.start);
        startDate.setTime(startDate.getTime() + startZone*60*1000);

        endDate = new Date(event.end);
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
        console.log("you have clicked a event")
        console.log(calEvent)
        $('#fullCalModal').modal();                     //starts the modal box

        return false;
    };
     

     
    //with this you can handle the events that generated by each page render process
    $scope.renderView = function(view){    
        date = new Date(view.calendar.getDate());
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
        allDaySlot: false,                  //no all day events    
            defaultView: 'agendaWeek',      //a week with squares for the time slots
            nowIndicator: true,             // shows current time  
            firstDay: 1,                    //starts on monday
            scrollTime: '07:30:00',         //the time which shows up at the top
            height: 650,                    //a constant height for scrolltime to work
            handleWindowResize: true,       //for resizing
            axisFormat: 'HH(:mm)',
            timeFormat: 'HH:mm',
            columnFormat: 'ddd D/M',
            titleFormat: 'D MMMM, YYYY',

        eventClick: $scope.eventClick,
        //dayClick: $scope.dayClick,
        eventDrop: $scope.alertOnResizeAndDrop,
        eventResize: $scope.alertOnResizeAndDrop,
        //viewRender: $scope.renderView

      }    
    };
     
    /* event sources array*/
    $scope.eventSources = [$scope.testData];



});