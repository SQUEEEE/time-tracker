timeTrackerApp.controller('AddCtrl', function($scope, TimeTracker, currentAuth) {
	
	$scope.categories = TimeTracker.getCategories();

	$scope.timerRunning = false;	// bool if timer is running
	$scope.timeStarted = false;		// bool if timer has ever been started/only paused not cleared
	$scope.hour = 0;
	$scope.minute = 0;
	$scope.second = 0;
	//lastInput = [0,0,0];
	console.log(currentAuth);

	//create variables for today
	var today = new Date();	
	$scope.day = today.getDate();
	$scope.month = today.getMonth()+1; //January is 0!
	$scope.year = today.getFullYear();
	$scope.startHour = today.getHours();
	$scope.startMinute = today.getMinutes();

	$scope.user = currentAuth.google.displayName;
	$scope.category = $scope.categories[0];
	$scope.name = "Insert name here";
	// value of duration

	
	$scope.setTimer = function(_hour,_minute,_second){
		$scope.hour = $scope.hours;
		$scope.minute = $scope.min;
		$scope.second = $scope.sec;
	}
	
	$scope.nameChange = function(name){
		$scope.name = name;
	}
	$scope.hourChange = function(hour){
		$scope.hour = hour;
	}
	$scope.minuteChange = function(minute){
		$scope.minute = minute;
	}
	$scope.secondChange = function(second){
		$scope.second = second;
	}
	$scope.yearChange = function(year){
		$scope.year = year;
	}
	$scope.monthChange = function(month){
		$scope.month = month;
	}
	$scope.dayChange = function(day){
		$scope.day = day;
	}
	$scope.startHourChange = function(startHour){
		$scope.startHour = startHour;
	}
	$scope.startMinuteChange = function(startMinute){
		$scope.startMinute = startMinute;
	}
		// selecting category in list
	$scope.selectCategory = function(selected) {
        for (index in $scope.categories) {
            if (selected == $scope.categories[index].name) { 
                $scope.category = selected;
            }
        }
    }

	// saves the timers time when it stops
	$scope.$on('timer-stopped', function (event, data){
		$scope.hours = data.hours;
		$scope.min = data.minutes;
		$scope.sec = data.seconds;
		$scope.millis = data.millis;
        console.log('Timer Stopped - data = ', data);
    });

	// starts the timer
	$scope.startTimer = function() {
		if (!($scope.timerRunning) && !$scope.timeStarted) {
			$scope.$broadcast('timer-start');
			$scope.timerRunning = true;
			$scope.timeStarted = true;
		}
		else if (!($scope.timerRunning) && $scope.timeStarted) {
			$scope.$broadcast('timer-resume');
			$scope.timerRunning = true;
			$scope.timeStarted = true;
		}
	}

	// pausing the timer
	$scope.pauseTimer = function() {
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;	
	}

	// resets the timer
	$scope.resetTimer = function() {
		$scope.$broadcast('timer-reset');
		$scope.timerRunning = false;
		$scope.timeStarted = false;	
	}


	$scope.addNewEvent = function() {
		start = new Date($scope.year, $scope.month, $scope.day, $scope.startHour, $scope.startMinute);
		endHour = 20;
		endMinute = 0;
		end = new Date($scope.year, $scope.month, $scope.day, endHour, endMinute);
		TimeTracker.addNewEvent($scope.name, start, end, $scope.category);
		//need to update the calendar!!
	}



});