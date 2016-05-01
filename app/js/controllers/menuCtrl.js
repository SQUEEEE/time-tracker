timeTrackerApp.controller('MenuCtrl', function($scope, $location, TimeTracker, Auth) {
	
	$scope.auth = Auth;

    // to know which tab is active
    $scope.isActive = function (viewLocation) { 
        if (viewLocation === $location.path()) {
        	return "active";
        }
        else {
        	return "";
        }
    };
});