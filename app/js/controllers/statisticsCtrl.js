timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker) {

    // names of all the categories
    $scope.categoryNames = TimeTracker.getCategoryNames();

    // total logged time
	$scope.totalSum = TimeTracker.calcTimeAllCategories();

    $scope.month = 0;

    $scope.week = 0;

    // info for week Statistics
    $scope.weekData = TimeTracker.statWeekSeries($scope.week);

    $scope.monthData = TimeTracker.statMonthSeries($scope.month);

    $scope.active = "Total";


    $scope.isActive = function(type) {
        if (type == $scope.active) {
            return "active";
        }
        return "";
    }
    $scope.setActive = function(selected) {
        $scope.active = selected;
    }
 

    // initial value for statistics page
    $scope.startValue = function() {
        $scope.showTotal();
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
            text: 'Total amount of logged hours'
        },
        xAxis: {
            categories: $scope.categoryNames,
            title: {
                text: 'Categories'
            }
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
            pointFormat: '<b>{point.y:.1f}</b><br/>'
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

    // stats for categories percentage 
    $scope.showWeekPercentage = function(whichWeek) {

        if (whichWeek == 0) {
            $scope.week = 0;
        }
        else {
            $scope.week += whichWeek;
           // console.log("scope.week", $scope.week);
        }


        return Highcharts.chart('stat', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Weekly percentage'
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
                data: TimeTracker.statPieWeek($scope.week)
            }]
        });
    }

    // stats for total logged time  
    $scope.showWeekTotal = function(whichWeek) {
        if (whichWeek == 0) {
            $scope.week = 0;
        }
        else {
            $scope.week += whichWeek;
        }

        return Highcharts.chart('stat', {
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Total amount of logged hours'
        },
        xAxis: {
            categories: $scope.categoryNames,
            title: {
                text: 'Categories'
            }
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
            pointFormat: '<b>{point.y:.1f}</b><br/>'
        },
        series: [{
            data: TimeTracker.statWeekTotalList($scope.week)
        }]
        });
    };

    // stats for current week
    $scope.showWeek = function(whichWeek) {

        if (whichWeek == 0) {
            $scope.week = 0;
        }
        else {
            $scope.week += whichWeek;
            //console.log("scope.week", $scope.week);
        }


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
                text: 'Time logged during this week'
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
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}</b> ({point.percentage:.0f}%)<br/>',
                shared: true,
                valueSuffix: ' hours',
                xDateFormat: '%A %e %b',
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: TimeTracker.statWeekSeries($scope.week) // $scope.weekData
        });
    };

    // stats for current week
    $scope.showMonth = function(whichMonth) {

        if (whichMonth == 0) {
            $scope.month = 0;
        }
        else {
            $scope.month += whichMonth;
            //console.log("scope.month", $scope.month);
        }
        

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
                text: 'Time logged during this month'
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
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.1f}</b> ({point.percentage:.0f}%)<br/>',
                shared: true,
                valueSuffix: ' hours',
                xDateFormat: '%A %e %b',
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: TimeTracker.statMonthSeries($scope.month) // $scope.monthData
        });
    };

    // stats for categories percentage 
    $scope.showMonthPercentage = function(whichMonth) {

        if (whichMonth == 0) {
            $scope.month = 0;
        }
        else {
            $scope.month += whichMonth;
            //console.log("scope.month", $scope.month);
        }

        return Highcharts.chart('stat', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Monthly percentage'
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
                data: TimeTracker.statPieMonth($scope.month)
            }]
        });
    }




});