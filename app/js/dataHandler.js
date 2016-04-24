//model for auth
timeTrackerApp.factory("DataHandler", function($firebaseArray, $firebaseObject, TimeTracker){

	/*
		when the user is authorized we initiate the firebase connections
	*/

	this.initiateUser = function(userId){
		//console.log("initializing user ", userId);
		this.userId = userId; //if we need to save this?
		this.firebaseRef = new Firebase("https://time-trackertest.firebaseio.com/" + userId);

		this.testCategories = this.firebaseRef.child('categories');
		this.testCalendars = this.firebaseRef.child('calendars');
		this.testEvents = this.firebaseRef.child('events');


		//this.testCategories.onDisconnect().set(TimeTracker.getCategories()); //this doesn't work?
		
		this.setTimeTrackerData();

	}


	var existsInList = function(item, list){
		for(i in list){
			if(list[i].id === item.id){
				return i;
			}
		}
		return false;
	}


	/*
	function that takes a list of calendars and sees if any should be added to the user's list of calendars
	*/
	this.updateCalendars = function(calendars){

		//check if the incoming calendars already are saved and only add them if they're not
		var existingCals = TimeTracker.getTestCalendars();

		for(i in calendars){
			var cal = calendars[i];
			if(!existsInList(cal, existingCals)){
				TimeTracker.addCalendar(cal);
			}
		}

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

		might have to update the info saved
		+ indicator of when updated in firebase

	*/
	this.updateEvents = function(calendar, resp){
		var currentEvents = TimeTracker.getTestData();
		var calendarCategory = calendar.category; 

		var newEvents = [];

		for(i in resp){
			var newEvent = resp[i];

			retValue = existsInList(newEvent, currentEvents);


			if (retValue != false) {	// exists in currentEvents
		

				currentListMs = Date.parse(currentEvents[retValue].updated);
				newEventMs = Date.parse(newEvent.updated);
				if (currentListMs < newEventMs) {	// event updated from google
					currentEvents[retValue].summary = newEvent.summary;
					currentEvents[retValue].updated = newEvent.updated;
					currentEvents[retValue].start = newEvent.start;
					currentEvents[retValue].end =  newEvent.end;
					console.log("ändrat Event", currentEvents[retValue]);
				}
				
			}
			else if (retValue == false && newEvent.start.dateTime) { // not in current Events, a new event
				newEvents.push(newEvent);
	
			}


			/*
			var exists = existsInList(newEvent, currentEvents);
			if(!exists && newEvent.start.dateTime){

			if(!existsInList(newEvent, currentEvents) && newEvent.start.dateTime){
				newEvents.push(newEvent);
				console.log("new event!");
			}	
			else{
				console.log("event already exists");
			}*/
		}


		TimeTracker.iterateData(newEvents, calendar.category);
		this.save();
	
	}

	this.getCategory = function(calendarId){

		this.calendarListRef
			.orderByChild('id')
			.equalTo(calendarId)
			.once('value', function(snapshot){

				/*
					to get the right part of the returned object, we loop through, 
					but in reality we only do it once
				*/
				var calObj = snapshot.val()
				for(key in calObj){
					return calObj[key].category;
				}
				
			});
	}

	this.save = function(){
		this.testCategories.set(cleanUp(TimeTracker.getCategories())); 
		this.testCalendars.set(cleanUp(TimeTracker.getTestCalendars())); 
		this.testEvents.set(cleanUp(TimeTracker.getTestData())); 

	}

	/*
		helper function to cleanUp angular-specific keys when saving data to firebase
	*/
	var cleanUp = function(data){
		var newData = angular.fromJson(angular.toJson(data));
		return newData;
	}

	this.setTimeTrackerData = function(){

		this.testCategories.once("value", function(snapshot){
			
			//if the firebase was empty, we set it to the default Undefined category
			res = snapshot.val();
			if(res===null){
				res = [TimeTracker.createCategory("Undefined", false)];
			}

			TimeTracker.setCategories(res);
			
			
		});

		this.testCalendars.once("value", function(snapshot){

			res = snapshot.val();
			if(res===null){
				res = [];
			}
			TimeTracker.setCalendars(res);
			
		});

		this.testEvents.once("value", function(snapshot){


			res = snapshot.val();
			if(res===null){
				res = [];
			}
			TimeTracker.setEventData(res); //to fix
			
			
		});
	}

	return this;

});

