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
		var categoriesRef = this.categoriesRef = this.firebaseRef.child('categories');
		var categories = this.categoriesRef = $firebaseArray(categoriesRef);


		
		/*
			check that there is the default category Undefined; if not then add it
		*/

		categoriesRef.once("value", function(snapshot){
			var hasUndefined = false;

			snapshot.forEach(function(snapChild){
				var category = snapChild.val();
				if(category.name === "Undefined"){
					console.log("category Undefined exists");
					hasUndefined = true;
				}
			});
			if(!hasUndefined){
				console.log("i am in the if checkHasUndefined");
				categories.$add({
					'name':'Undefined',
					'color':'LightGray',
					'autoReport':false
				});
		}
			
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
	this.updateCalendarList = function(calendars){
		//get the existing CalendarList
		var category = 'Undefined';
		var sync = true;
		var calendarList = this.calendarList;

		this.calendarListRef.once("value", function(snapshot){
			var existingCalendars = snapshot.val();

			/*loop through the incoming calendarList and see if there is a matching id in the existingList */
			for(i in calendars){
				var cal = calendars[i];
				if(!existsInList(cal, existingCalendars)){

					//add the calendar. This doesn't work for some reason so omitting it for now
					calendarList.$add({
						'id': cal.id, 
						'name': cal.summary, 
						'category': category, 
						'sync': sync
					});

					console.log("adding new calendar", cal.summary);
				}

			}

		});
	}


	/*
		function that returns ids of calendars that are to be synced
	*/
	this.getSyncedCalendars = function(){

		syncedCalendars = [];

		//iterate through the calendars and add the ones with value sync = true to the list

		this.calendarListRef.once("value", function(snapshot){

			snapshot.forEach(function(snapChild){
				calendar = snapChild.val();
				if(calendar.sync){
					syncedCalendars.push(calendar.id);
				}
			})

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
		var events = this.events;

		//things to resolve: check which category the calendar has


		//TODO: check if the event already exists
			//might make an addEvent-function later for this as it will be used in other contexts as well
			
		this.eventsRef.once("value", function(snapshot){
				var existingEvents = snapshot.val();

				/*loop through the incoming calendarList and see if there is a matching id in the existingList */
				for(i in resp){
					var newEvent = resp[i];
					var category = 'Undefined';
				
					if(!existsInList(newEvent, existingEvents)){

						events.$add({
							'id': newEvent.id, 
							'name': newEvent.summary, 
							'start': newEvent.start,
							'end': newEvent.end,
							'category': category, 
							'updated': newEvent.updated,
							'calendar':calendarId
						});

						console.log("adding", newEvent.summary);
					}

				}

		});
	}

	return this;

}]);

