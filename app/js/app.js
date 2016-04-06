

var timeTrackerApp = angular.module('timeTracker', ['ngRoute', 'ngResource', 'timer', 'firebase']);

//auth routing
timeTrackerApp.run(["$rootScope", "$location", function($rootScope, $location) {
$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
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
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?

          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/statistics', {
        templateUrl: 'partials/statistics.html',
        resolve: {
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?

          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/calendar', {
        templateUrl: 'partials/calendar.html',
        resolve: {
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?

          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?

          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'authCtrl'
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