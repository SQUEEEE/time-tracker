timeTrackerApp.controller('AddCtrl', function($scope, TimeTracker, currentAuth) {

	$scope.timerRunning = false;
	$scope.timeStarted = false;

	console.log(currentAuth);

	$scope.user = currentAuth.google.displayName;

	$scope.durationSet = false;
	$scope.duration = 0;

	$scope.setDuration = function() {

		$scope.durationSet = true;
		console.log($scope.hours);
		console.log($scope.min);
		console.log($scope.sec);
		console.log($scope.millis);

		time = new Date(2016,1,1, $scope.hours, $scope.min, $scope.sec, 0);
		console.log(time);
		console.log(time.toLocaleTimeString());

		$scope.duration = time.toLocaleTimeString();

	}

	$scope.$on('timer-stopped', function (event, data){
		$scope.hours = data.hours;
		$scope.min = data.minutes;
		$scope.sec = data.seconds;
		$scope.millis = data.millis;
        console.log('Timer Stopped - data = ', data);
    });


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

	$scope.pauseTimer = function() {
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;	
	}

	$scope.resetTimer = function() {
		$scope.$broadcast('timer-reset');
		$scope.timerRunning = false;
		$scope.timeStarted = false;	
	}

	$scope.testCategories = TimeTracker.getTestCategories();

	$scope.selectCat = function(selected) {
        for (index in $scope.testCategories) {
            if (selected == $scope.testCategories[index]) { 
                console.log("val: ", selected);
            }
        }
    };


});