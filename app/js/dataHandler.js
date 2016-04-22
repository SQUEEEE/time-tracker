//model for auth
timeTrackerApp.factory("DataHandler", ["$firebaseArray", function($firebaseArray){
	/*this.userId = undefined; //the id of the user that is logged in
	this.calendarList = undefined; //the list of calendars that the user has on their Google Account, including info about whether to sync the calendar etc
	this.data = undefined; //the events?? 
	this.categories = undefined; //the categories that the user has saved
	this.calendarListRef = undefined;
	this.firebaseRef = undefined;


	/*
		when the user is authorized we initiate the firebase connections
	*/

	this.initiateUser = function(userId){
		console.log("initializing user ", userId);
		this.userId = userId; //if we need to save this?
		this.firebaseRef = new Firebase("https://time-trackertest.firebaseio.com/" + userId);
		this.calendarListRef = this.firebaseRef.child('calendarList');
		this.calendarList = $firebaseArray(this.calendarListRef);
		this.eventsRef = this.firebaseRef.child('events');
		this.events = $firebaseArray(this.eventsRef);


		//check if there is an Undefined-categori, if not; add it
		this.categoriesRef = this.firebaseRef.child('categories');
		this.categories = $firebaseArray(this.categoriesRef);


		/*
			check that there is the default category Undefined; if not then add it
		*/
		if(!checkHasUndefined(this.categoriesRef)){
				this.categories.$add({
					'name':'Undefined',
					'color':'LightGray',
					'autoReport':false
				});
		}


	}

	var checkHasUndefined = function(catRef){
		catRef.once("value", function(snapshot){

			snapshot.forEach(function(snapChild){
				
				var category = snapChild.val();
				if(category.name === "Undefined"){
					console.log("category Undefined exists");
					return true;
				}
			});
			return false;
			
		});

	}

	var existsInList = function(item, list){
		for(i in list){
			if(list[i].id === item.id){
				return true;
			}

		}
	}


	/*
	function that takes a list of calendars and sees if any should be added to the user's list of calendars
	calendar should contain the following:
	 id, name (these are from the calendarList data), 
	 sync, category (timeTracker-specific) <-- what are the defaults? 

	*/
	this.updateCalendarList = function(calendarList){
		//get the existing CalendarList
		var category = 'Important';
		var sync = true;
		

		this.calendarListRef.once("value", function(snapshot){
			//this.existingCalendars = snapshot.val(); //snapshot for each!!
			snapshot.forEach(function(snapChild){ //loops through the calendars in the snapshot
				var calendar = snapChild.val();
				
				if(!existsInList(calendar, this.existingCalendars)){

					//add the calendar. This doesn't work for some reason so omitting it for now
					/*this.calendarList.$add({
						'id': calendarList[i].id, 
						'name': calendarList[i].summary, 
						'category': category, 
						'sync': sync
					}*/

					console.log("adding new calendar");
				}

				//console.log("looping through calendar", calendar.name);
			});


		/*	for(i in calendarList){

				//console.log(calendarList[i].id);
				//existsInList(calendarList[i], this.existingCalendars);
				
				
			}*/

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

		syncedCalendars = [];

		//iterate through the calendars and add the ones with value sync = true to the list

		this.calendarListRef.once("value", function(snapshot){
			var allCals = snapshot.val();

			for(i in allCals){
				if(allCals[i].sync){
					syncedCalendars.push(allCals[i].id);
				}
			}

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
		//either specify the calendar in the path in the firebase or as a field in the event object
		

		//var currentEvents = this.eventsRef.child(calendarId); doesn't work
		this.events.$add(resp);

		//loop through in same manner as updateCalendarList
	}

	return this;

}]);

