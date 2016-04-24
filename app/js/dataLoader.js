//model for auth
timeTrackerApp.factory("DataLoader", function($http, DataHandler, TimeTracker){
    
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


    this.handleAuthClick = function() {
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
            DataHandler.initiateUser(resp.id)
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
        Then we want to iterate these to load the events and save the new/updated ones to Firebase
       */
    var loadCalendars = function() {


        //https://developers.google.com/apis-explorer/#p/calendar/v3/calendar.calendarList.list

      var request = gapi.client.calendar.calendarList.list({
        'fields': 'items(id, summary)'
      });

      request.execute(function(resp) {
        var calendars = resp.items;
        console.log(calendars);

        DataHandler.updateCalendars(calendars);
        /*
          Call to a function in the 
          DataHandler that will only add new events and update the information with 
          TimeTracker-specific data.
        */



      


        //calendars to get events from - change to TimeTracker-data

        calendarsToSync = TimeTracker.getSyncedCalendars();


        /*
          loop through the calendarsToSync-list and then call the loadEvents function for every one 
        */

        for(i in calendarsToSync){
          loadEvents(calendarsToSync[i]);
          console.log("sync calendar ", calendarsToSync[i]);
        }

        console.log("done with syncing");
        DataHandler.save(); // save everything to firebase once everything is loaded

       
      });

    }


    /*
      api request for events from a specific calendar
      check if you can do something here to specify if the events have changed since a specific time? - updateMin could be something useful
    */
    var loadEvents = function(calendar){
      console.log("loading events from ", calendar.id);
      var request = gapi.client.calendar.events.list({
        'calendarId': calendar.id,
        //'timeMin': (new Date()).toISOString(),
        'timeMin': (new Date(2016,1,1)).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'orderBy': 'startTime',
        'fields': 'items(end,id,start,summary,updated)'
      });

      request.execute(function(resp) {
        //call the DataHandler.updateEvents-function
        console.log("response");
        DataHandler.updateEvents(calendar, resp.items);

      });
    }

    this.loadData = function(){
      console.log("Loading data!");
      this.checkAuth();
      this.handleAuthClick();
      TimeTracker.changeLoadedData();
    }


      return this;
});

