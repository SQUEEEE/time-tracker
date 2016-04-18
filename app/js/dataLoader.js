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

    var handleAuthResult = function (authResult) {
      console.log(authResult);
      //var authorizeDiv = document.getElementById('authorize-div');
      if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        console.log("works");

        //load the userID and then call the function that loads the calendars
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



      /*
        First we want to list all of the users calendars, and check which ones are to be synced 
        (maybe with a record in the firebase?)
        Then we want to iterate these to load the events and save the new/updated ones to Firebase
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

          //firebase connection
          var ref = new Firebase("https://time-trackertest.firebaseio.com/" + DataHandler.userId);

          //load the data into the DataHandler
          DataHandler.data = $firebaseArray(ref);

          /*
            Add the data to firebase. This will be changed to a call to a function in the 
            DataHandler that will only add new events and update the information with 
            TimeTracker-specific data.
          */

          DataHandler.data.$add(calendars); 

          //testData = events;
          //iterateData();
        });
      }

      return this;
});

