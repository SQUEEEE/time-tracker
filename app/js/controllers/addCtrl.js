timeTrackerApp.controller('AddCtrl', function($scope, TimeTracker, currentAuth) {

	$scope.timerRunning = false;	// bool if timer is running
	$scope.timeStarted = false;		// bool if timer has ever been started/only paused not cleared

	console.log(currentAuth);

	$scope.user = currentAuth.google.displayName;

	$scope.durationSet = false;		// bool if duration is taken from timer
	$scope.duration = 0;			// value of duration

	// sets the duration in form with timer
	$scope.setDuration = function() {

		$scope.durationSet = true;
		//console.log($scope.hours);
		//console.log($scope.min);
		//console.log($scope.sec);
		//console.log($scope.millis);

		time = new Date(2016,1,1, $scope.hours, $scope.min, $scope.sec, 0);
		//console.log(time);
		//console.log(time.toLocaleTimeString());

		$scope.duration = time.toLocaleTimeString();
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