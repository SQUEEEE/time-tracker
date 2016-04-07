timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker) {

	$scope.categoryArray = TimeTracker.getCategories();
	$scope.colorArray = TimeTracker.getTestColors();
	$scope.calendarArray = TimeTracker.getTestCalendars();
	$scope.colors = TimeTracker.getAllColors();

	$scope.newCategory = function(){
		var name = document.getElementById("nameCategoryInput").value;
		$scope.categoryArray.push(TimeTracker.createCategory(name));
		console.log($scope.categoryArray)
	}

});