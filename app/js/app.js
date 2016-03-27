

var timeTrackerApp = angular.module('timeTracker', ['ngRoute', 'ngResource']);


timeTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'partials/add.html'
      }).
      when('/statistics', {
        templateUrl: 'partials/statistics.html'
      }).
      when('/calendar', {
        templateUrl: 'partials/calendar.html'
      }).
      when('/settings', {
        templateUrl: 'partials/settings.html'
      }).
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      // redirects all other url:s to '/add'
      otherwise({
        redirectTo: '/add'
      });
  }]);