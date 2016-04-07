timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker) {

	$scope.categoryArray = TimeTracker.getTestCategories();
	$scope.colorArray = TimeTracker.getTestColors();

	$scope.categories = function(){
		var returnValue = '<ul class="list-group">';
		for (index in $scope.categoryArray){
 			returnValue = returnValue + "<li class='list-group-item'>" +
 			 $scope.categoryArray[index] + " " + $scope.colorArray[index] + "</li>";
		}
		returnValue = returnValue + '</ul>'; 
		//return $sce.trustAsHtml(returnValue)
	}

});