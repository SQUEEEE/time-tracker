timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker) {

	$scope.categoryArray = TimeTracker.getTestCategories();
	$scope.colorArray = TimeTracker.getTestColors();
	$scope.calendarArray = TimeTracker.getTestCalendars();
	$scope.colors = TimeTracker.getAllColors();

	$scope.newCategory = function(){
		
		var name = document.getElementById("nameCategoryInput").value;
		console.log(name);
		$scope.categoryArray.push(name);
		$scope.colorArray.push($scope.colors[Math.floor(Math.random() * $scope.colors.length)]);
		console.log($scope.colorArray);

	}

});