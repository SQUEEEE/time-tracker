timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker) {

	$scope.testCategories = TimeTracker.getTestCategories();

	$scope.totalSum = TimeTracker.calcTimeAllCategories();


});