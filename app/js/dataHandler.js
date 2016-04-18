//model for auth
timeTrackerApp.factory("DataHandler", ["$firebaseArray", function($firebaseArray){
	this.userId = undefined; //the id of the user that is logged in
	this.calendarList = undefined; //the list of calendars that the user has on their Google Account, including info about whether to sync the calendar etc
	this.data = undefined; //the events?? 
	this.categories = undefined; //the categories that the user has saved


	/*
	function that takes a list of calendars and sees if any should be added to the user's list of calendars
	calendar should contain the following:
	 id, name (these are from the calendarList data), 
	 sync, category (timeTracker-specific) <-- what are the defaults? 

	*/
	this.updateCalendarList = function(calendarList){
		//get the existing CalendarList
		existingList = this.calendarList;
		
		//loop through the incoming calendarList and see if there is a matching id in the existingList
	}

	/*
		function that returns ids of calendars that are to be synced
	*/

	this.getSyncedCalendars = function(){

		syncedCalendars = [];

		//iterate through the calendars and add the ones with value sync = true to the list

		return syncedCalendars;
	}


	/*
		function that takes a list of events for a calendar and sees if any need to be added or updated
		an event should contain the following (needs to be revised)

		id; <-
		url (htmlLink); <-?
		created; probably not needed
		updated; <-
		title (summary); <-
		description; <-?
		start (start.dateTime); <-
		end=(end.dateTime); <-

		this.category=category.name;	<-		
		this.logged=logged;		<-	
		this.autoReport = category.autoReport;	<-	// bool depending on if the event should be auto reported
		this.color=category.color; <-
		this.textColor='black'; <- ? 

		+ indicator of when updated in firebase

	*/
	this.updateEvents = function(){
		//maybe open the events for the specific calendar here? 

		//loop through in same manner as updateCalendarList
	}

	return this;

}]);

