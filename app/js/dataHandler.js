//model for auth
timeTrackerApp.factory("DataHandler", function($firebaseArray, $firebaseObject, TimeTracker){

	/*
		when the user is authorized we initiate the firebase connections
	*/

	this.initiateUser = function(userId){
		console.log("initializing user ", userId);
		this.userId = userId; //if we need to save this?
		this.firebaseRef = new Firebase("https://time-trackertest.firebaseio.com/" + userId);
		

		this.test = $firebaseArray(this.testPath);
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


		console.log("Updating calendars")

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
		console.log("############################");
		console.log(resp);
		for(i in resp){
			var newEvent = resp[i];

			retValue = existsInList(newEvent, currentEvents);
			console.log("retValue: ", retValue);

			if (retValue != false) {	// exists in currentEvents
				//current event updated tid > våran updated tid:
				// den med senast updated tiden, skriver över tiderna, 
				// namnet skrivs alltid över på det event som redan finns
				
				console.log("currentEvents[retValue]", currentEvents[retValue]);
				console.log("updated", currentEvents[retValue].updated);
				console.log("Funkar detta?", Date.parse(currentEvents[retValue].updated));


			}
			else if (retValue == false && newEvent.start.dateTime) { // not in current Events, a new event
				newEvents.push(newEvent);
				console.log("new event! last updated:", newEvent);
			}
			else {
				console.log("släng detta event - heldag?")
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
		console.log("Get category for", calendarId);
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
		console.log("saving TimeTracker data to Firebase");

		this.testCategories.set(cleanUp(TimeTracker.getCategories())); 
		this.testCalendars.set(cleanUp(TimeTracker.getTestCalendars())); 
		this.testEvents.set(cleanUp(TimeTracker.getTestData())); 
		console.log("save events!")
	}

	/*
		helper function to cleanUp angular-specific keys when saving data to firebase
	*/
	var cleanUp = function(data){
		var newData = angular.fromJson(angular.toJson(data));
		return newData;
	}

	this.setTimeTrackerData = function(){

		console.log("getting TimeTracker data from Firebase");


		this.testCategories.once("value", function(snapshot){

			console.log("setting the categoryArray to firebase data");
			
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
			console.log("setting the calendarArray to firebase data");
			
		});

		this.testEvents.once("value", function(snapshot){

			console.log("setting the calendarArray to firebase data");
			res = snapshot.val();
			if(res===null){
				res = [];
			}
			TimeTracker.setEventData(res); //to fix
			
			
		});
	}

	return this;

});

