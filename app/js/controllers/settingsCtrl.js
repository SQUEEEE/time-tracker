timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker) {

	$scope.categoryArray = TimeTracker.getTestCategories();
	$scope.colorArray = TimeTracker.getTestColors();

	$scope.categories = function(){
		var returnValue = "";
		for (index in $scope.categoryArray){
 			returnValue = returnValue + $scope.categoryArray[index] + " " + $scope.colorArray[index] + " ";
		}
		return returnValue; 
	}

});