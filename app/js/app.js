

var timeTrackerApp = angular.module('timeTracker', ['ngRoute', 'ngResource', 'timer', 'firebase']);


timeTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'AddCtrl'
      }).
      when('/statistics', {
        templateUrl: 'partials/statistics.html'
      }).
      when('/calendar', {
        templateUrl: 'partials/calendar.html'
      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home.html'
      }).

      //testing authorization with firebase

      when('/auth', {
        templateUrl: 'partials/auth.html',
        controller: 'authCtrl'
      }).
      // redirects all other url:s to '/add'
      otherwise({
        redirectTo: '/add'
      });
  }]);