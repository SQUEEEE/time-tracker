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


    this.handleAuthClick = function(event) {
      gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult());
      return false;
    }

    var handleAuthResult = function (authResult) {
      //var authorizeDiv = document.getElementById('authorize-div');
      if (authResult && !authResult.error) {
        //see if something can be done here to omit the firebase authentication
        console.log("Authorization works");

        //load the userID and then call the function that loads the api
        gapi.client.load('oauth2','v2',function(){
          gapi.client.oauth2.userinfo.get().execute(function(resp){
            console.log("UserID: ", resp.id);
            DataHandler.userId = resp.id;
            loadCalendarApi();

          });
        });
          
      } else {
        
       console.log("Authorization didn't work");
      }
    }

    //load the calendar api and call the function that gets the data
    var loadCalendarApi = function() {
        gapi.client.load('calendar', 'v3', loadCalendars);
    }

      /*
        First we want to list all of the user's calendars, and check which ones are to be synced 
        (need to decide which is best: a bool on each calendar-record or sepearate record with the calendars that are to be synced)
        Then we want to iterate these to load the events and save the new/updated ones to Firebase
       */
    var loadCalendars = function() {


        //https://developers.google.com/apis-explorer/#p/calendar/v3/calendar.calendarList.list

      var request = gapi.client.calendar.calendarList.list({
        'fields': 'items(id, summary)'
      });

      request.execute(function(resp) {
        var calendars = resp.items;

        //firebase connection
        DataHandler.calendarListRef = new Firebase("https://time-trackertest.firebaseio.com/" + DataHandler.userId + "/calendarList");

        //load the data into the DataHandler
        DataHandler.calendarList = $firebaseArray(DataHandler.calendarListRef);

        /*
          Call to a function in the 
          DataHandler that will only add new events and update the information with 
          TimeTracker-specific data.
        */

        DataHandler.updateCalendarList(calendars); 

        //calendars to get events from
        calendarsToSync = DataHandler.getSyncedCalendars;

        for(i in calendarsToSync){
          loadEvents(calendarsToSync[i]);
        }

        /*
          loop through the calendarsToSync-list and then call the loadEvents function for every one 
        */
       
      });

    }


    /*
      api request for events from a specific calendar
      check if you can do something here to specify if the events have changed since a specific time? 
    */
    var loadEvents = function(calendarId){
      var request = gapi.client.calendar.events.list({
        'calendarId': calendarId,
        //'timeMin': (new Date()).toISOString(),
        'timeMin': (new Date(2015,1,1)).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      });

      request.execute(function(resp) {
        console.log("resp");

        //call the DataHandler.updateEvents-function

        DataHandler.updateEvents(calendarId, resp);

      });
    }

      return this;
});

