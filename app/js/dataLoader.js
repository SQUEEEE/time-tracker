//model for auth
timeTrackerApp.factory("DataLoader", function($http, $firebaseArray, DataHandler){
	/*var ref = new Firebase("https://time-trackertest.firebaseio.com/data");
	return $firebaseAuth(ref);*/
    
    var CLIENT_ID = '122923477419-e3s0kltaumck69gqfn8d0he948lhpd8q.apps.googleusercontent.com';

    var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      /**
       * Check if current user has authorized this application.
       */
    this.checkAuth = function () {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
    }

       /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
    var loadCalendarApi = function() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
    }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      var handleAuthResult = function (authResult) {
      	console.log(authResult);
        //var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
         	console.log("works");

          gapi.client.load('oauth2','v2',function(){
            gapi.client.oauth2.userinfo.get().execute(function(resp){
              console.log(resp.id);
              DataHandler.userId = resp.id;
              console.log(DataHandler.userId);
              loadCalendarApi();

            });
          });
          	
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
         console.log("didn't work");
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      this.handleAuthClick = function(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult());
        return false;
      }


      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      var listUpcomingEvents = function() {


          //https://developers.google.com/apis-explorer/#p/calendar/v3/calendar.calendarList.list
          var request = gapi.client.calendar.calendarList.list({
            'maxResults':10
          });
       /* var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          //'timeMin': (new Date()).toISOString(),
          'timeMin': (new Date(2015,1,1)).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });*/

        request.execute(function(resp) {
          /*var events = resp.items;
          console.log(events)*/

          var calendars = resp.items;
          console.log(resp);

          var ref = new Firebase("https://time-trackertest.firebaseio.com/" + DataHandler.userId);
          DataHandler.data = $firebaseArray(ref);
          DataHandler.data.$add(calendars); //hera we want to add something that specifies the user we are to save the data to

          //testData = events;
          //iterateData();
        });
      }

      return this;
});

