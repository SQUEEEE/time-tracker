timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker) {

	$scope.testCategories = TimeTracker.getTestCategories();

	$scope.totalSum = TimeTracker.calcTimeAllCategories();


   /* $scope.testingTime = function () {

        console.log(TimeTracker.isEarlier());
    }*/

    $scope.statChoices = ["Total", "Category", "Week"]

    $scope.selectStat = function(selected) {
        for (index in $scope.statChoices) {
            if (selected == "Total") {      // $scope.statChoices[index]
                $scope.showTotal();
            }
            else if (selected == "Category") {
                $scope.showCategories();
            }
            else if (selected == "Week") {
                $scope.showWeek();
            }
        }
    };
        


    $scope.showTotal = function() {
        $('#stat').highcharts({
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
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
        legend: {
            enabled: false
        },
        tooltip: {
            valueSuffix: ' hours',
            pointFormat: '<b>{point.y}</b><br/>'
        },
        series: [{
            colorByPoint: true,
            data: TimeTracker.statBarList()
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
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
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
                colorByPoint: true,
                data: TimeTracker.statPieObjects()
            }]
        });
    }


    $scope.showWeek = function() {
        $('#stat').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Time spent during one week'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    formatter: function () {
                        return Highcharts.dateFormat('%a %e %b', this.value);
                    },
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Hours'
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true,
                valueSuffix: ' hours',
                xDateFormat: '%A %e %b',
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: TimeTracker.statWeekSeries()
        });
    };

});