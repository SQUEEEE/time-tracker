

var timeTrackerApp = angular.module('timeTracker', ['ngRoute']);


timeTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'partials/add.html'
      }).
      // redirects all other url:s to '/add'
      otherwise({
        redirectTo: '/add'
      });
  }]);