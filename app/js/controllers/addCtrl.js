timeTrackerApp.controller('AddCtrl', function($scope, TimeTracker, currentAuth) {

	$scope.timerRunning = false;
	var timeStarted = false;

	console.log(currentAuth);

	$scope.user = currentAuth.google.displayName;


	$scope.startTimer = function() {
		if (!($scope.timerRunning) && !timeStarted) {
			$scope.$broadcast('timer-start');
			$scope.timerRunning = true;
			timeStarted = true;
		}
		else if (!($scope.timerRunning) && timeStarted) {
			$scope.$broadcast('timer-resume');
			$scope.timerRunning = true;
			timeStarted = true;
		}
	}

	$scope.pauseTimer = function() {
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;	
	}

	$scope.resetTimer = function() {
		$scope.$broadcast('timer-reset');
		$scope.timerRunning = false;
		timeStarted = false;	
	}
});