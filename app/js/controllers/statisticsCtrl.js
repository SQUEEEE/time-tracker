timeTrackerApp.controller('StatisticsCtrl', function($scope, TimeTracker, DataLoader) {

    if(TimeTracker.getLoadedData() == false){
        DataLoader.loadData();
    }
    // names of all the categories
    $scope.categoryNames = TimeTracker.getCategoryNames();

    // total logged time
	$scope.totalSum = TimeTracker.calcTimeAllCategories();

    $scope.month = 0;
    $scope.week = 0;
    $scope.year = 0;

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


	// stats for all categories total percentage 
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

    // stats for one weeks categories percentage 
    $scope.showWeekPercentage = function(whichWeek) {

        if (whichWeek == 0) {
            $scope.week = 0;
        }
        else {
            $scope.week += whichWeek;
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
            text: 'Logged hours during one week'
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
        }

        start, end = $scope.titleDates($scope.week);


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
                text: start + ' - ' + end
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
                },
                crosshair: true
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

    $scope.titleMonth = function() {
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        now = new Date;
        thisMonth = now.getMonth();
        titleMonth = thisMonth + $scope.month;

        if (titleMonth < 0) {
            titleMonth = 12+titleMonth;
        }

        return months[titleMonth%12];
    }

    $scope.titleDates = function(whichWeek) {
    
        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();
        day = now.getDate();
        weekday = now.getDay();

        if (weekday == 0) { // since sunday returns 0 from getDay()
            weekday = 7;
        }
        
        startDate = new Date (year, month, day-weekday+1+(7*whichWeek), 0, 0, 0, 0);
        startMs = startDate.getTime();

        ms = 6 * 86400000;
        endDate = new Date(startMs + ms);

        start = startDate.toDateString();
        end = endDate.toDateString();

        return start, end;
    }


    // stats for current week
    $scope.showMonth = function(whichMonth) {
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        if (whichMonth == 0) {
            $scope.month = 0;
        }
        else {
            $scope.month += whichMonth;
        }
        title = $scope.titleMonth();
        

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
                text: title + ' overview'
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
                },
                crosshair: true
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
        }

        title = $scope.titleMonth();

        return Highcharts.chart('stat', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: title + ' percentage'
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

    // stats for total logged time  
    $scope.showMonthTotal = function(whichMonth) {
        if (whichMonth== 0) {
            $scope.month = 0;
        }
        else {
            $scope.month += whichMonth;
        }
        title = $scope.titleMonth();

        return Highcharts.chart('stat', {
        chart: {
            type: 'bar'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Logged hours during ' + title
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
            data: TimeTracker.statMonthTotalList($scope.month)
        }]
        });
    };

    $scope.showYear = function(whichYear) {

        if (whichYear == 0) {
            $scope.year = 0;
        }
        else {
            $scope.year += whichYear;
        }

        now = new Date;
        thisYear = now.getFullYear();
        titleYear = thisYear + $scope.year;

    
        return Highcharts.chart('stat', {
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: titleYear
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount of hours'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} hours</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: TimeTracker.statYearOverview($scope.year)
        });
    }

});