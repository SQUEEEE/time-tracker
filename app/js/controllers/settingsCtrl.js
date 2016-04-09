timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker) {

	$scope.categoryArray = TimeTracker.getCategories();		// list of categories
	$scope.calendarArray = TimeTracker.getTestCalendars();	// list of names of the categories
	$scope.colors = TimeTracker.getAllColors();				// all colors available


	$scope.showAutoreportInfo = true;

	// creates a new category
	$scope.newCategory = function(){
		var name = document.getElementById("nameCategoryInput").value;
		$scope.categoryArray.push(TimeTracker.createCategory(name));
		//console.log($scope.categoryArray)
	}

	// changes the color of a category
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

	// removes a category
	$scope.removeCategory = function(category) {
		TimeTracker.removeCategory(category);
	}


	$scope.changeAutoreport = function(category) {
		console.log(category.autoreport);
		TimeTracker.changeAutoreport(category);
		
	}

});