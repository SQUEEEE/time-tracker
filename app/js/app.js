

var timeTrackerApp = angular.module('timeTracker', ['ngRoute', 'ngResource', 'timer', 'ui.calendar', 'gapi'])
.value('GoogleApp', {
    apiKey: 'OHBEmVA34lNWNNNy-HNZyJep',
    clientId: '122923477419-e3s0kltaumck69gqfn8d0he948lhpd8q.apps.googleusercontent.com',
    scope: [
      // whatever scopes you need for your app, for example:
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/userinfo.profile'
      // ...
    ]
  })

/*app.run(['GAuth', 'GApi', 'GData', '$state', '$rootScope',
    function(GAuth, GApi, GData, $state, $rootScope) {

        $rootScope.gdata = GData;

        var CLIENT = 'yourGoogleAuthAPIKey';
        var BASE = 'https://myGoogleAppEngine.appspot.com/_ah/api';

        GApi.load('myApiName','v1',BASE);
        GApi.load('calendar','v3'); // for google api (https://developers.google.com/apis-explorer/)

        GAuth.setClient(CLIENT);
        GAuth.setScope("https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly"); // default scope is only https://www.googleapis.com/auth/userinfo.email

        GAuth.checkAuth().then(
            function (user) {
                console.log(user.name + 'is login')
                $state.go('webapp.home'); // an example of action if it's possible to
                              // authenticate user at startup of the application
            },
            function() {
                $state.go('login');       // an example of action if it's impossible to
                      // authenticate user at startup of the application
            }
        );

    }
]);*/

timeTrackerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'AddCtrl'
        /*resolve: {
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?
          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }*/
      }).
      when('/statistics', {
        templateUrl: 'partials/statistics.html',
        controller: 'StatisticsCtrl'
        /*resolve: {
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?
          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }*/
      }).
      when('/calendar', {
        templateUrl: 'partials/calendar.html',
        controller: 'CalendarCtrl'
        /*resolve: {
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?
          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }*/

      }).
      when('/settings', {
        templateUrl: 'partials/settings.html',
        controller: 'SettingsCtrl'
        /*resolve: {
          //controller will not be loaded until $waitForAuth resolves
          //Auth refers to $firebaseAuth wrapper in authCtrl?
          currentAuth: ["Auth", function(Auth){
            return Auth.$requireAuth();
          }]
        }*/
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'gapiCtrl'
      }).

      //testing authorization with firebase

     /* when('/auth', {
        templateUrl: 'partials/auth.html',
        controller: 'authCtrl'
      }).*/
      // redirects all other url:s to '/add'
      otherwise({
        redirectTo: '/add'
      });
  }]);