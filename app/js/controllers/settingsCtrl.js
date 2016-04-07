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

	$scope.changeColor = function(category){
		while (true){
			color = category.color;
			newColor = $scope.colors[Math.floor(Math.random() * $scope.colors.length)]
			if (color != newColor){
				category.color = newColor;
				return
			}
		}
		
	}

});