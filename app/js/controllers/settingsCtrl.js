timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker, DataLoader, DataHandler) {
	/*
		TO ADD:
			something that gets information about a category

		TO CHANGE:
			make everything firebase-adjusted

	*/

	if(!TimeTracker.getLoadedData()){
		DataHandler.loadData();
		TimeTracker.changeLoadedData();
	}

	$scope.categoryArray = TimeTracker.getCategories();		// list of categories
	//$scope.categoryArray = DataHandler.categories; //use the categories from the firebase! :D
	$scope.calendarArray = TimeTracker.getTestCalendars();	// list of names of the calendars

	//$scope.calendarArray = DataHandler.calendarList;
	$scope.colors = TimeTracker.getAllColors();				// all colors available


	$scope.showAutoReportInfo = false;		// bool to decide if info about auto report is shown or not
	$scope.showSyncInfo = false;			// bool to decide if info about sync is shown or not

	$scope.save = function(){
		DataHandler.save();
	}
	// creates a new category
	$scope.newCategory = function(name, autoReport){
		if (name != null && name != "") {
			for (index in $scope.categoryArray) {
				if ($scope.categoryArray[index].name == name) {
					return;					 // do not create category with same name as another
				}
			}

			$scope.categoryArray.push(TimeTracker.createCategory(name, autoReport));

			$scope.save();
		}
	}

	// changes the color of a category
	$scope.changeColor = function(category){
		newColor = TimeTracker.colorsWithoutDublett(category);
		category.color = newColor;
		TimeTracker.changeColor(category);
		$scope.save();
	}

	// removes a category
	$scope.removeCategory = function(category) {
		TimeTracker.removeCategory(category);
		$scope.save();
	}

	// change if a category should be auto reported or not
	$scope.changeAutoreport = function(category) {
		TimeTracker.changeAutoReport(category);
		$scope.save();
	}

	// change if a category should be auto reported or not
	$scope.changeSync = function(calendar) {
		TimeTracker.changeSync(calendar);
		$scope.save();
	}

	$scope.autoReportNow = function() {
		TimeTracker.autoReportAll();
		$scope.save();
	}



	$scope.saveCalendarChanges = function(calendar, selected) {
		if (selected != null && selected != "") {
			TimeTracker.changeCalendarCategory(calendar, selected);
			$scope.save();
		}
	}

	$scope.saveCategoryName = function(category, newName) {
		if (newName != null && newName != "") {
			TimeTracker.changeCategoryName(category, newName);
			$scope.save();
		}
	}

	$scope.updateCalendars = function() {

		DataLoader.checkAuth();
		DataLoader.handleAuthClick();

		console.log("test", TimeTracker.getTestData());
	}


});