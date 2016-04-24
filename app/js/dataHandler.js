//model for auth
timeTrackerApp.factory("DataHandler", function($firebaseArray, $firebaseObject, TimeTracker){

	/*
		when the user is authorized we initiate the firebase connections
	*/

	this.initiateUser = function(userId){
		console.log("initializing user ", userId);
		this.userId = userId; //if we need to save this?
		this.firebaseRef = new Firebase("https://time-trackertest.firebaseio.com/" + userId);
		
		/*this.calendarListRef = this.firebaseRef.child('calendarList');
		this.calendarList = $firebaseArray(this.calendarListRef);
		this.eventsRef = this.firebaseRef.child('events');
		this.events = $firebaseArray(this.eventsRef);
				
		var categoriesRef = this.categoriesRef = this.firebaseRef.child('categories');
		var categories = this.categories = $firebaseArray(categoriesRef);*/
		
		//firebase paths for testing
		this.testPath = this.firebaseRef.child('testPath');
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
	calendar should contain the following:
	 id, name (these are from the calendarList data), 
	 sync, category (timeTracker-specific) <-- what are the defaults? 

	*/
	this.updateCalendars = function(calendars){
		//get the existing CalendarList
		/*var category = 'Undefined';
		var sync = true;
		var calendarList = this.calendarList;*/

		console.log("Updating calendars")

		var existingCals = TimeTracker.getTestCalendars();

		for(i in calendars){
			var cal = calendars[i];
			if(!existsInList(cal, existingCals)){
				TimeTracker.addCalendar(cal);
			}
		}

		/*this.calendarListRef.once("value", function(snapshot){
			var existingCalendars = snapshot.val();

			/*loop through the incoming calendarList and see if there is a matching id in the existingList */
			/*for(i in calendars){
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

		});*/


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
			var exists = existsInList(newEvent, currentEvents);
			if(!exists && newEvent.start.dateTime){
				newEvents.push(newEvent);
				console.log("new event! last updated:", newEvent);
			}
			else{
				console.log("event already exists");
			}
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

		/*console.log("TimeTracker categories:", TimeTracker.getCategories());
		console.log("TimeTracker calendars:", TimeTracker.getTestCalendars());
		console.log("TimeTracker events:", TimeTracker.getTestData());*/
	}

	return this;

});

