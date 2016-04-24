//model for auth
timeTrackerApp.factory("DataHandler", function($firebaseArray, $firebaseObject, TimeTracker){

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
				
		var categoriesRef = this.categoriesRef = this.firebaseRef.child('categories');
		var categories = this.categories = $firebaseArray(categoriesRef);
		
		//firebase paths for testing
		this.testPath = this.firebaseRef.child('testPath');
		this.test = $firebaseArray(this.testPath);
		this.testCategories = this.testPath.child('categories');
		this.testCalendars = this.testPath.child('calendars');
		this.testEvents = this.testPath.child('events');


		//this.testCategories.onDisconnect().set(TimeTracker.getCategories()); //this doesn't work?
		
		this.setTimeTrackerData();
		/*$firebaseObject(this.testCategories).$loaded().then(function(data){
			console.log("categories loaded from firebase", data.val());
		})*/


		/*
			check that there is the default category Undefined; if not then add it
			CHANGE so this adds Undefined category in the TimeTracker data instead
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

		this.save();

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
		var calendarCategory = calendar.category; //this doesn't get returned fast enough :(
		//look at this when not super tired https://www.firebase.com/blog/2016-01-21-keeping-our-promises.html
		//things to resolve: check which category the calendar has

		var newEvents = [];

		for(i in resp){
			var newEvent = resp[i];
			if(!existsInList(newEvent, currentEvents) && newEvent.start.dateTime){
				newEvents.push(newEvent);
				console.log("new event!");
			}
			else{
				console.log("event already exists");
			}
		}


		TimeTracker.iterateData(newEvents, calendar.category);
		
		//might make an addEvent-function later for this as it will be used in other contexts as well
			
		/*this.eventsRef.once("value", function(snapshot){
				var existingEvents = snapshot.val();

				loop through the incoming calendarList and see if there is a matching id in the existingList 
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

		});*/
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
	}

	/*
		helper function to cleanUp angular-specific keys when saving data to firebase
	*/
	var cleanUp = function(data){
		var newData = angular.fromJson(angular.toJson(data));
		return newData;
	}

	this.setTimeTrackerData = function(){

		//have some syncronization problems here, needs to be checked out
		console.log("getting TimeTracker data from Firebase");


		this.testCategories.once("value", function(snapshot){
			//console.log("Firebase categories:", snapshot.val());
			console.log("setting the categoryArray to firebase data");
			
			//if the firebase was empty, we set the data to an empty array 
			res = snapshot.val();
			if(res===null){
				res = [];
			}

			TimeTracker.setCategories(res);
			
			
		});

		this.testCalendars.once("value", function(snapshot){
			//console.log("Firebase calendars:", snapshot.val());
			

			res = snapshot.val();
			if(res===null){
				res = [];
			}
			TimeTracker.setCalendars(res);
			console.log("setting the calendarArray to firebase data");
			
		});

		this.testEvents.once("value", function(snapshot){
			//console.log("Firebase events:", snapshot.val());
			

			console.log("setting the calendarArray to firebase data");
			res = snapshot.val();
			if(res===null){
				res = [];
			}
			TimeTracker.data = res; //to fix
			
			
		});

		/*console.log("TimeTracker categories:", TimeTracker.getCategories());
		console.log("TimeTracker calendars:", TimeTracker.getTestCalendars());
		console.log("TimeTracker events:", TimeTracker.getTestData());*/
	}

	return this;

});

