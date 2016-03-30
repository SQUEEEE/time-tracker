timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker) {

	$scope.testCategories = TimeTracker.getTestCategories();

	$scope.totalSum = TimeTracker.calcTimeAllCategories();

	$(document).ready(function() {
		$('#statTotal').highcharts({
	        chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Total amount of logged hours per categories'
	        },
	        xAxis: {
	            categories: $scope.testCategories
	        },
	        yAxis: {
	            title: {
	                text: 'Hours'
	            }
	        },
	        series: [{
	        	name: 'Time',
	            data: [$scope.totalSum, 2, 4]
	        }]
	    });
	});

});