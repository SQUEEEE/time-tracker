timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker) {

	$scope.categoryArray = TimeTracker.getCategories();		// list of categories
	$scope.calendarArray = TimeTracker.getTestCalendars();	// list of names of the calendars
	$scope.colors = TimeTracker.getAllColors();				// all colors available


	$scope.showAutoreportInfo = false;		// bool to decide if info about autoreport is shown or not
	$scope.showSyncInfo = false;			// bool to decide if info about sync is shown or not

	// creates a new category
	$scope.newCategory = function(name, autoreport){

		for (index in $scope.categoryArray) {
			if ($scope.categoryArray[index].name == name) {
				return;					 // do not create category with same name as another
			}
		}

		$scope.categoryArray.push(TimeTracker.createCategory(name, autoreport));
		console.log($scope.categoryArray)
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

	// change if a category should be autoreported or not
	$scope.changeAutoreport = function(category) {
		TimeTracker.changeAutoreport(category);
	}

});