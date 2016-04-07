

var timeTrackerApp = angular.module('timeTracker', ['ngRoute', 'ngResource', 'timer', 'firebase']);

//auth routing
timeTrackerApp.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // redirects to home when requireAuth fails
  if (error === "AUTH_REQUIRED") {
    $location.path("/home");
  }
});
}]);


timeTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'AddCtrl',
        resolve: {
          //redirect to home if not authenticated

          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/statistics', {
        templateUrl: 'partials/statistics.html',
        controller: 'StatisticsCtrl',
        resolve: {
          //redirect to home if not authenticated

          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/calendar', {
        templateUrl: 'partials/calendar.html',
        controller: 'CalendarCtrl',
        resolve: {
           //redirect to home if not authenticated


          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }

      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
           //redirect to home if not authenticated


          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'authCtrl'
      }).

      // redirects all other url:s to '/add'
      otherwise({
        redirectTo: '/add'
      });
  }]);