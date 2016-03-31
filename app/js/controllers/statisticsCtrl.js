timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker) {

	$scope.testCategories = TimeTracker.getTestCategories();

	$scope.totalSum = TimeTracker.calcTimeAllCategories();


   /* $scope.testingTime = function () {

        console.log(TimeTracker.isEarlier());


    }*/

    $scope.statChoices = ["Total", "Category"]

    $scope.selectStat = function(selected) {
        for (index in $scope.statChoices) {
            if (selected == "Total") {      // $scope.statChoices[index]
                $scope.showTotal();
            }
            else if (selected == "Category") {
                $scope.showCategories();
            }
        }
    };
        


    $scope.showTotal = function() {
        $('#stat').highcharts({
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
    }

	
    $scope.showCategories = function() {
        $('#stat').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Percentage per category'
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
    }


});