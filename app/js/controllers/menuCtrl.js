timeTrackerApp.controller('MenuCtrl', function($scope, $location, TimeTracker) {

	//$scope.auth = Auth;

    $scope.isActive = function (viewLocation) { 
        if (viewLocation === $location.path()) {
        	return "active";
        }
        else {
        	return "";
        }
    };
});