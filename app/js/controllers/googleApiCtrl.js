//code for connecting to the google api

timeTrackerApp.controller("googleApiCtrl", function($scope){

	  var CLIENT_ID = '122923477419-e3s0kltaumck69gqfn8d0he948lhpd8q.apps.googleusercontent.com';
      var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

      this.authorized = false;

     // var authorizeDiv = document.getElementById('authorize-div');
      //var authorizedDiv = document.getElementById('authorized-div');

      /**
       * Check if current user has authorized this application.
       */

      this.checkAuth = function () {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      $scope.handleAuthResult = function (authResult) {
        
        if (authResult && !authResult.error) {
          // Hide auth UI, then load Calendar client library.
         // authorizeDiv.style.display = 'none';
          //authorizedDiv.style.display = 'inline';
          $scope.authorized = true;
          $scope.loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
        //  authorizeDiv.style.display = 'none';
          //authorizedDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      $scope.handleAuthClick = function (event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          $scope.handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      $scope.loadCalendarApi = function () {
        gapi.client.load('calendar', 'v3', $scope.done());
      }

      $scope.done = function(){
      	console.log("klart");
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
	
});