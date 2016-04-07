timeTrackerApp.controller('SettingsCtrl', function($scope, TimeTracker) {

	$scope.categoryArray = TimeTracker.getTestCategories();
	$scope.colorArray = TimeTracker.getTestColors();
	$scope.calendarArray = TimeTracker.getTestCalendars();

});