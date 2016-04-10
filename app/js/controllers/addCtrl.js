timeTrackerApp.controller('AddCtrl', function($scope, TimeTracker, currentAuth) {

	$scope.timerRunning = false;	// bool if timer is running
	$scope.timeStarted = false;		// bool if timer has ever been started/only paused not cleared
	$scope.hour = 0;
	$scope.minute = 0;
	$scope.second = 0;
	lastInput = [0,0,0];
	console.log(currentAuth);

	$scope.user = currentAuth.google.displayName;

	$scope.durationSet = false;		// bool if duration is taken from timer
	$scope.duration = 0;	
	// value of duration
	$scope.setTimer = function(_hour,_minute,_second){
		console.log($scope.hours);
		console.log($scope.min);
		console.log($scope.sec);
		
		$scope.hour = $scope.hours;
		$scope.minute = $scope.min;
		$scope.second = $scope.sec;
		
		
		lastInput = [$scope.hours,$scope.min,$scope.sec];
	}
	
	// sets the duration in form with timer
	$scope.setDuration = function() {
		
		$scope.durationSet = true;
		//console.log($scope.hours);
		//console.log($scope.min);
		//console.log($scope.sec);
		//console.log($scope.millis);

		time = new Date(2016,1,1, $scope.hour, $scope.minute, $scope.second, 0);
		//console.log(time);
		//console.log(time.toLocaleTimeString());

		$scope.duration = time.toLocaleTimeString();
	}
	
	$scope.hourChange = function(hour){
		
		
		if(hour.match(/^[0-9]+$/) != null)
		{
			lastInput[0] = hour;
		}
		else {
			$scope.hour = lastInput[0];
		}
		$scope.setDuration();
	}
	$scope.minuteChange = function(minute){
	
			
		if(minute.match(/^[0-9]+$/) != null)
		{
			lastInput[1] = minute;
		}	
		else {	
			$scope.minute = lastInput[1];
		}
		$scope.setDuration();
	}
	$scope.secondChange = function(second){
	
		if(second.match(/^[0-9]+$/) != null)
		{
			lastInput[2] = second;
		}
		else {
			$scope.second = lastInput[2];
		}
		$scope.setDuration();
		
		
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

	$scope.categories = TimeTracker.getCategories();

	// selecting category in list
	$scope.selectCategory = function(selected) {
        for (index in $scope.categories) {
            if (selected == $scope.categories[index].name) { 
                console.log("val: ", selected);
            }
        }
    };


});