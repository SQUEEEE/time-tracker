//model for auth
timeTrackerApp.factory("DataHandler", ["$firebaseArray", function($firebaseArray){
	this.userId = undefined; //the id of the user that is logged in
	this.calendarList = undefined; //the list of calendars that the user has on their Google Account, including info about whether to sync the calendar etc
	this.data = undefined; //the events?? 
	this.categories = undefined; //the categories that the user has saved
	this.calendarListRef = undefined;
	this.firebaseRef = undefined;
	this.test = "crap";

	/*
	function that takes a list of calendars and sees if any should be added to the user's list of calendars
	calendar should contain the following:
	 id, name (these are from the calendarList data), 
	 sync, category (timeTracker-specific) <-- what are the defaults? 

	*/

	/*
		when the user is authorized we initiate the firebase connections
	*/

	this.initiateUser = function(userId){
		console.log("initializing user ", userId);
		this.userId = userId; //if we need to save this?
		this.firebaseRef = new Firebase("https://time-trackertest.firebaseio.com/" + userId);
		this.calendarListRef = this.firebaseRef.child('calendarList');
		this.calendarList = $firebaseArray(this.calendarListRef);
	}

	var existsInList = function(item, list){
		for(i in list){
			if(list[i].id === item.id){
				return true;
			}

			//console.log("List id: ", list[i].id, " item id: ");

			//console.log(item.id);
			//console.log(list[i].id);
		}
	}

	this.updateCalendarList = function(calendarList){
		//get the existing CalendarList
		var category = 'Important';
		var sync = true;
		

		this.calendarListRef.once("value", function(snapshot){
			this.existingCalendars = snapshot.val();

			for(i in calendarList){

				//console.log(calendarList[i].id);
				//existsInList(calendarList[i], this.existingCalendars);
				
				if(!existsInList(calendarList[i], this.existingCalendars)){

					//add the calendar. This doesn't work for some reason so omitting it for now
					/*this.calendarList.$add({
						'id': calendarList[i].id, 
						'name': calendarList[i].summary, 
						'category': category, 
						'sync': sync
					}*/

					console.log("adding new calendar");
				}
			}

		});

	
		
		//loop through the incoming calendarList and see if there is a matching id in the existingList

		/*for(i in calendarList){

			
				add the calendar: (later we should add the check if there is a record with the same id in the existingList)
			
			this.calendarList.$add({
				'id': calendarList[i].id, 
				'name': calendarList[i].summary, 
				'category': category, 
				'sync': sync

				}
			);
		}*/
	}


	/*
		function that returns ids of calendars that are to be synced
	*/
	this.getSyncedCalendars = function(){

		//console.log(this.calendarList);

		syncedCalendars = [];

		//iterate through the calendars and add the ones with value sync = true to the list

		this.calendarListRef.once("value", function(snapshot){
			var allCals = snapshot.val();

			for(i in allCals){
				if(allCals[i].sync){
					syncedCalendars.push(allCals[i].id);
				}
			}

			console.log("i am done now!")

		});

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
	this.updateEvents = function(calendarId, resp){
		//maybe open the events for the specific calendar here? not sure if we need to organize the data in this way 

		//loop through in same manner as updateCalendarList
	}

	return this;

}]);

