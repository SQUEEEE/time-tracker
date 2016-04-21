timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker, DataLoader, DataHandler) {

	//$scope.categoryArray = TimeTracker.getCategories();		// list of categories
	$scope.categoryArray = DataHandler.categories; //use the categories from the firebase! :D
	//$scope.calendarArray = TimeTracker.getTestCalendars();	// list of names of the calendars

	$scope.calendarArray = DataHandler.calendarList;
	$scope.colors = TimeTracker.getAllColors();				// all colors available


	$scope.showAutoReportInfo = false;		// bool to decide if info about auto report is shown or not
	$scope.showSyncInfo = false;			// bool to decide if info about sync is shown or not

	// creates a new category
	$scope.newCategory = function(name, autoReport){
		if (name != null && name != "") {
			for (index in $scope.categoryArray) {
				if ($scope.categoryArray[index].name == name) {
					return;					 // do not create category with same name as another
				}
			}

			$scope.categoryArray.push(TimeTracker.createCategory(name, autoReport));
			//console.log($scope.categoryArray)
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

	// change if a category should be auto reported or not
	$scope.changeAutoreport = function(category) {
		TimeTracker.changeAutoReport(category);
	}

	// change if a category should be auto reported or not
	$scope.changeSync = function(calendar) {
		TimeTracker.changeSync(calendar);
	}

	$scope.autoReportNow = function() {
		TimeTracker.autoReportAll();
	}



	$scope.saveCalendarChanges = function(calendar, selected) {
		if (selected != null && selected != "") {
			TimeTracker.changeCalendarCategory(calendar, selected);
		}
	}

	$scope.saveCategoryName = function(category, newName) {
		console.log(category, newName);
		if (newName != null && newName != "") {
			TimeTracker.changeCategoryName(category, newName);
		}
	}

	$scope.updateCalendars = function() {

		DataLoader.checkAuth();
		DataLoader.handleAuthClick();

		console.log("test", TimeTracker.getTestData());
	}

});