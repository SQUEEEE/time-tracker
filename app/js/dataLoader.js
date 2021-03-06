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

        //load the userID and then call the function that loads the api
        gapi.client.load('oauth2','v2',function(){
          gapi.client.oauth2.userinfo.get().execute(function(resp){
            data = DataHandler.initiateUser(resp.id)
            data.$loaded()
            .then(function() {
            DataHandler.setTimeTrackerData();
            loadCalendarApi()
            })
            .catch(function(err) {
            }); 


    //this.testCategories.onDisconnect().set(TimeTracker.getCategories()); //this doesn't work?
    

            //setTimeout(loadCalendarApi, 200); //make sure loadCalendarApi call doesnt happen to fast
          });
        });
          
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

        DataHandler.updateCalendars(calendars);
        /*
          Call to a function in the 
          DataHandler that will only add new events and update the information with 
          TimeTracker-specific data.
        */

        //calendars to get events from

        calendarsToSync = TimeTracker.getSyncedCalendars();
        unsyncedCalendars = TimeTracker.getUnsyncedCalendars();
        //console.log("sync", calendarsToSync);
        //console.log("unsync", unsyncedCalendars);

        /*
          loop through the calendarsToSync-list and then call the loadEvents function for every one 
        */
        
        for (j in calendarsToSync){
          loadEvents(calendarsToSync[j]);

        }

        if (calendarsToSync.length == 0) {
          TimeTracker.resetData();
        }

        for (i in unsyncedCalendars) {
          TimeTracker.removeUnsyncedEvents(unsyncedCalendars[i]);
        }

        //console.log(TimeTracker.getTestData());

        DataHandler.save(); // save everything to firebase once everything is loaded

        // fujt3r8bscbg6rkv30r41h1cmo@group.calendar.google.com
        // fujt3r8bscbg6rkv30r41h1cmo@group.calendar.google.com

       
      });

    }


    /*
      api request for events from a specific calendar
      check if you can do something here to specify if the events have changed since a specific time? - updateMin could be something useful
    */
    var loadEvents = function(calendar){

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
        DataHandler.updateEvents(calendar, resp.items);

      });
    }

    this.loadData = function(){

      this.checkAuth();
      this.handleAuthClick();
      TimeTracker.changeLoadedData();
    }


      return this;
});

