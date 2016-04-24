timeTrackerApp.controller('CalendarCtrl', function($scope, $http, TimeTracker, DataHandler, DataLoader) {

    if(!TimeTracker.getLoadedData()){
        DataLoader.loadData();
        
    }

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
        $('#calendar').fullCalendar('refetchEvents');   
        DataHandler.save();      

        return calEvent;
	}

    $scope.changeAutoReport = function(calEvent) {
        $scope.modalEvent = calEvent;
        TimeTracker.changeEventAutoReport(calEvent);
        $('#calendar').fullCalendar('refetchEvents'); 
        DataHandler.save();          
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
            $('#calendar').fullCalendar('refetchEvents');
            DataHandler.save();       
        }
    }

    $scope.deleteEvent = function(calEvent){
        $scope.modalEvent = calEvent;
        TimeTracker.deleteEvent(calEvent);
        $('#calendar').fullCalendar('refetchEvents'); 
        DataHandler.save();         
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
        $('#calendar').fullCalendar('refetchEvents');  
        DataHandler.save();         
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
        $('#calendar').fullCalendar('refetchEvents'); 
        DataHandler.save();          
    }
     
     
     
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
        DataHandler.save();
    };
     
     
     
    //with this you can handle the click on the events
    $scope.eventClick = function(calEvent, jsEvent, view){  //when click on an event
        $scope.modalEvent = calEvent;
        console.log("you have clicked a event")
        console.log(calEvent)
        $('#fullCalModal').modal();                     //starts the modal box

        return false;
    };
     

     
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
        eventDrop: $scope.alertOnResizeAndDrop,
        eventResize: $scope.alertOnResizeAndDrop,


      }    
    };
     
    /* event sources array*/
    $scope.eventSources = [$scope.testData];



});