timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker) {

    // names of all the categories
    $scope.categoryNames = TimeTracker.getCategoryNames();

    // total logged time
	$scope.totalSum = TimeTracker.calcTimeAllCategories();

    // info for week Statistics
    $scope.weekData = TimeTracker.statWeekSeries();

    $scope.monthData = TimeTracker.statMonthSeries();

    // initial value for statistics page
    $scope.startValue = function() {
        $scope.showTotal();
        return "Total time";
    };

    // The different statistics choices
    $scope.statChoices = ["Total time", "Category percentage", "Weekly status", "Monthly status"]

    // showing the right statistics depending on users choice
    $scope.selectStat = function(selected) {
        for (index in $scope.statChoices) {
            if (selected == "Total time") { 
                $scope.showTotal();
            }
            else if (selected == "Category percentage") {
                $scope.showCategories();
            }
            else if (selected == "Weekly status") {
                $scope.showWeek();
            }
            else if (selected == "Monthly status") {
                $scope.showMonth();
            }
        }
        return selected;
    };
      
    // stats for total logged time  
    $scope.showTotal = function() {
        return Highcharts.chart('stat', {
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
            categories: $scope.categoryNames
        },
        yAxis: {
            title: {
                text: 'Time in hours'
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
            data: TimeTracker.statBarList()
        }]
        });
    };


	// stats for categories percentage 
    $scope.showCategories = function() {
        return Highcharts.chart('stat', {
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
                data: TimeTracker.statPieObjects()
            }]
        });
    }

    // stats for current week
    $scope.showWeek = function() {

        Highcharts.setOptions({
        global: {
            useUTC: false
        }
        });
        return Highcharts.chart('stat', {
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
                    overflow: 'justify',
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
            series: $scope.weekData
        });
    };

    // stats for current week
    $scope.showMonth = function() {

        Highcharts.setOptions({
        global: {
            useUTC: false
        }
        });
        return Highcharts.chart('stat', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Time spent during this month'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    overflow: 'justify',
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
            series: $scope.monthData
        });
    };




});