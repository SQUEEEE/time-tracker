timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker) {

	$scope.testCategories = TimeTracker.getTestCategories();

	$scope.totalSum = TimeTracker.calcTimeAllCategories();

	//$(document).ready(function() {
		$('#bar').highcharts({
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
	                text: 'Time'
	            }
	        },
	        tooltip: {
            	valueSuffix: ' hours'
        	},
	        series: [{
	        	name: " ",
	            data: [$scope.totalSum, 2, 4]
	        }]
	    });
	//});


    $('#categoriesTotal').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Percentage per categories'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Categories',
            colorByPoint: true,
            data: TimeTracker.statPieObjects()
        }]
    });

    /*

	series: [{
            name: 'Categories',
            colorByPoint: true,
            data: [{name:'KTH', y:2},{name:'Jobb', y:3}, {name:'Jobb', y:3}]
        }]
    {
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }
    */


});