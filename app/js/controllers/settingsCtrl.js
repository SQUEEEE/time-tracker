timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker, DataLoader) {

	$scope.categoryArray = TimeTracker.getCategories();		// list of categories
	$scope.calendarArray = TimeTracker.getTestCalendars();	// list of names of the calendars
	$scope.colors = TimeTracker.getAllColors();				// all colors available


	$scope.showAutoreportInfo = false;		// bool to decide if info about autoreport is shown or not
	$scope.showSyncInfo = false;			// bool to decide if info about sync is shown or not

	// creates a new category
	$scope.newCategory = function(name, autoreport){
		if (name != null && name != "") {
			for (index in $scope.categoryArray) {
				if ($scope.categoryArray[index].name == name) {
					return;					 // do not create category with same name as another
				}
			}

			$scope.categoryArray.push(TimeTracker.createCategory(name, autoreport));
			console.log($scope.categoryArray)
		}
	}

	// changes the color of a category
	$scope.changeColor = function(category){
			newColor = TimeTracker.colorsWithoutDublett(category);
			category.color = newColor;
			TimeTracker.changeColor(category);
			
		
	}

	// removes a category
	$scope.removeCategory = function(category) {
		TimeTracker.removeCategory(category);
	}

	// change if a category should be autoreported or not
	$scope.changeAutoreport = function(category) {
		TimeTracker.changeAutoreport(category);
	}

	// change if a category should be autoreported or not
	$scope.changeSync = function(calendar) {
		TimeTracker.changeSync(calendar);
	}

	$scope.autoreportNow = function() {
		TimeTracker.autoreportAll();
	}

	$scope.updateCalendars = function() {

		DataLoader.checkAuth();
		DataLoader.handleAuthClick();
	}


});