timeTrackerApp.controller('CalendarCtrl', function($scope, TimeTracker) {

	$scope.testData = TimeTracker.getTestData();


// initializes the calendar
	$(document).ready(function() {
    //page is now ready
    	$('#calendar').fullCalendar({
    		header: {
                center: 'title',
                left: '',
                right: ''
            },          
            defaultView: 'agendaWeek',          
            firstDay: 1,

            dayClick: function(){ 			//pop up at a click, maybe we can use?
        		alert('a day has been clicked!');
    		},
            events: $scope.testData  		//the events in the calendar
            ,
    	});
	});
});