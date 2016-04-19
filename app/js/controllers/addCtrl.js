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


	$scope.getNumberOfDays = function(){	//returns number of days in the month we are right now
		var month = $scope.month;		//to make it easier to refer to 
		if(month==2){
			if($scope.year%4==0){
				return 29;
			}
			else{
				return 28;
			}
		}
		else if(month%2==1){
			return 31;
		}
		else{
			return 30;
		}
	}

	$scope.setTimer = function(_hour,_minute,_second){
		$scope.hour = $scope.hours;
		$scope.minute = $scope.min;
		$scope.second = $scope.sec;
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

	//adds a new event by calling addnewevent in the model with the times from the form
	$scope.addNewEvent = function() {
		var start = new Date($scope.year, $scope.month-1, $scope.day, $scope.startHour, $scope.startMinute);

        var startZone = start.getTimezoneOffset();
		var beginning = new Date(1970, 0, 1, $scope.hour, $scope.minute, $scope.second);	//creates a date with milliseconds as the duration
		var startMilli = start.getTime();
		var bMilli = beginning.getTime();
		var milliTotal = startMilli + bMilli + startZone*60*1000;	//WHY IS IT NOT THE CORRECT HOUR?

		var end = new Date(milliTotal);
		console.log(end)
		TimeTracker.addNewEvent($scope.name, start, end, $scope.category);	
	}



});