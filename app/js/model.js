timeTrackerApp.factory('TimeTracker', function ($resource, $http) {

	var data = []; // a list of events with the right attributes
	//var dataIndex;


	
	var colors = ['lightblue', 'green', 'pink', 'AntiqueWhite', 'Aquamarine', 'CadetBlue', 'Chartreuse', 'Coral',
					'CornflowerBlue', 'Crimson', 'DarkCyan', 'DarkGoldenRod', 'DarkGreen', 'DarkSalmon', 'GoldenRod',
					'GreenYellow', 'IndianRed', 'Khaki', 'LightCoral', 'LightCyan', 'LightGray', 'LightGreen',
					'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSteelBlue', 'LimeGreen',
					'MediumAquaMarine', 'MediumSeaGreen', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleVioletRed', 
					'PapayaWhip', 'PeachPuff', 'Peru', 'Plum', 'PowderBlue', 'RosyBrown', 'Salmon', 'SeaGreen', 
					'Silver', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Wheat', 'Violet',
					'YellowGreen'];		//all available colors for categories


	var calendarArray = [];

		// generates a new ID to use for an event
	this.createID = function() {
	   	//possible = "AB"
	    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    
	    bool = true;
	    while (bool == true) {
	    	id = "";
	    	working = true;

	    	for (i=0; i < 45; i++) {
	        	id += possible.charAt(Math.floor(Math.random() * possible.length));
	    	}

	    	for (index in data) {
	    		if (data[index].id == id) {
	    			working = false;
	    			//console.log("ID finns redan");
	    		}
	    	}

	    	if (working == true) {
	    		bool = false;
	    		//console.log("Nu är loopen klar");
	    	}
	    	//console.log("Är detta en oändlig loop?");
	    }  

	    return id;
	}

	
	/*var testData = [			//a list of events imported from the api
	{
	   "kind": "calendar#event",
	   "etag": "\"2756392697640000\"",
	   "id": "_60s30c1k6lh3gor56pi3gd9k6dh3ge9k6lgm8c9i64p64cpk75ij2o9pccpm6c36",
	   "status": "confirmed",
	   "htmlLink": "https://www.google.com/calendar/event?eid=XzYwczMwYzFrNmxoM2dvcjU2cGkzZ2Q5azZkaDNnZTlrNmxnbThjOWk2NHA2NGNwazc1aWoybzlwY2NwbTZjMzYgaGVsbHF1aXN0LmVyaWthQG0",
	   "created": "2013-08-31T00:16:01.000Z",
	   "updated": "2013-09-03T08:19:08.820Z",
	   "summary": "Envariabelanalys (SF1625) Föreläsning",
	   "description": "https://www.kth.se/social/course/SF1625/subgroup/ht-2013-cdate-copen/event/6899290/\n",
	   "location": "E1",
	   "creator": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "organizer": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "start": {
	    "dateTime": "2016-04-20T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-20T10:00:00+01:00"
	   },
	   "iCalUID": "080045b8ce6d8543b8945ad1212b349e1a9c3c0f",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
	},
	{
	   "kind": "calendar#event",
	   "etag": "\"2756392697640000\"",
	   "id": "_65h36d9i6tijgdb171i66dhnc5i3eoj375h3id1ocgsm8d366spm4oj5cks36d9k",
	   "status": "confirmed",
	   "htmlLink": "https://www.google.com/calendar/event?eid=XzY1aDM2ZDlpNnRpamdkYjE3MWk2NmRobmM1aTNlb2ozNzVoM2lkMW9jZ3NtOGQzNjZzcG00b2o1Y2tzMzZkOWsgaGVsbHF1aXN0LmVyaWthQG0",
	   "created": "2013-08-31T00:18:29.000Z",
	   "updated": "2013-09-03T08:19:08.820Z",
	   "summary": "Datorteknik och komponenter (IS1500) Övning",
	   "description": "https://www.kth.se/social/course/IS1500/subgroup/ht-2013-cdate/event/6912690/\n",
	   "location": "Q24, Q31, Q33, Q36",
	   "creator": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "organizer": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "start": {
	    "dateTime": "2016-04-15T10:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-15T12:00:00+01:00"
	   },
	   "iCalUID": "1b3527e85a8dc67ad7bc9b948d9d4f73bbee8354",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
	},
	{

	   "kind": "calendar#event",
	   "etag": "\"2756392697640000\"",
	   "id": "_65hm4dhg6grj6e1hcgo32phi6dh66e9m6grjaphoc8o64eb3cphjgp1i65h6apb3",
	   "status": "confirmed",
	   "htmlLink": "https://www.google.com/calendar/event?eid=XzY1aG00ZGhnNmdyajZlMWhjZ28zMnBoaTZkaDY2ZTltNmdyamFwaG9jOG82NGViM2NwaGpncDFpNjVoNmFwYjMgaGVsbHF1aXN0LmVyaWthQG0",
	   "created": "2013-08-31T00:15:59.000Z",
	   "updated": "2013-09-03T08:19:08.820Z",
	   "summary": "Envariabelanalys (SF1625) Föreläsning",
	   "description": "https://www.kth.se/social/course/SF1625/subgroup/ht-2013-cdate-copen/event/6899260/\n",
	   "location": "D1",
	   "creator": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "organizer": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "start": {
	    "dateTime": "2016-04-19T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-19T10:00:00+01:00"
	   },
	   "iCalUID": "1cb6047381d01f23bc96475f8b0b9cfc8d21beec",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
  	},
  	{	//a test intern event
	   "kind": "calendar#event",
	   "etag": "\"2756392697640000\"",
	   "id": this.createID(),
	   "status": "confirmed",
	   "htmlLink": "https://www.google.com/calendar/event?eid=XzY1aW1jZDlsNm9wamVwaGk2NHA2NGNyM2NrcDMwcGo0NjRybWFjajM3NHJtOGQ5bmNsajMwb2oxY2NwMzZjaGwgaGVsbHF1aXN0LmVyaWthQG0",
	   "created": "2013-08-31T00:15:49.000Z",
	   "updated": "2013-09-03T08:19:08.820Z",
	   "summary": "Envariabelanalys (SF1625) Föreläsning",
	   "description": "https://www.kth.se/social/course/SF1625/subgroup/ht-2013-cdate-copen/event/6898920/\n",
	   "location": "E1",
	   "intern":true,
	   "creator": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "organizer": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "start": {
	    "dateTime": "2016-04-21T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-21T10:00:00+01:00"
	   },
	   "iCalUID": "1ef55637f212b3ce20fd17e2c97d57ef0bac2325",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	    
	   }
  	},
  	{
	   "kind": "calendar#event",
	   "etag": "\"2756392697640000\"",
	   "id": "_65imcd9l6opjephi64p64cr3ckp30pj464rmacj374rm8d9nclj30oj1ccp36chl",
	   "status": "confirmed",
	   "htmlLink": "https://www.google.com/calendar/event?eid=XzY1aW1jZDlsNm9wamVwaGk2NHA2NGNyM2NrcDMwcGo0NjRybWFjajM3NHJtOGQ5bmNsajMwb2oxY2NwMzZjaGwgaGVsbHF1aXN0LmVyaWthQG0",
	   "created": "2013-08-31T00:15:49.000Z",
	   "updated": "2013-09-03T08:19:08.820Z",
	   "summary": "Envariabelanalys (SF1625) Föreläsning",
	   "description": "https://www.kth.se/social/course/SF1625/subgroup/ht-2013-cdate-copen/event/6898920/\n",
	   "location": "E1",
	   "creator": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "organizer": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "start": {
	    "dateTime": "2016-04-11T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-11T10:00:00+01:00"
	   },
	   "iCalUID": "1ef55637f212b3ce20fd17e2c97d57ef0bac2325",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
  	},
  	{
	   "kind": "calendar#event",
	   "etag": "\"2756392708568000\"",
	   "id": "_60r38dhh74om6d9nchgm8db16him4opkckoj0phh64p6aoppc4o38cj260o32pb2",
	   "status": "confirmed",
	   "htmlLink": "https://www.google.com/calendar/event?eid=XzYwcjM4ZGhoNzRvbTZkOW5jaGdtOGRiMTZoaW00b3BrY2tvajBwaGg2NHA2YW9wcGM0bzM4Y2oyNjBvMzJwYjIgaGVsbHF1aXN0LmVyaWthQG0",
	   "created": "2011-05-13T14:43:39.000Z",
	   "updated": "2013-09-03T08:19:14.284Z",
	   "summary": "Envariabelanalys (SF1625) Övning",
	   "description": "https://www.kth.se/social/course/SF1625/event/5410390/\n",
	   "location": "D34, D35, D41",
	   "creator": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "organizer": {
	    "email": "hellquist.erika@gmail.com",
	    "displayName": "Erika Hellquist",
	    "self": true
	   },
	   "start": {
	    "dateTime": "2016-04-13T11:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-15T15:00:00+01:00"
	   },
	   "iCalUID": "0646191c57dad5a4ebc4e10f112ec9a042b001eb",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
	}
	];*/


	

	/*********** Calendar class *************/
	var CalendarClass = function(id, name, category, sync) {
		this.id = id;
		this.name = name;
		this.sync = sync;
		this.category = category;
	}
	
	// creates a new calendar object
	this.createCalendar = function(id, name, category, sync) {
		return new CalendarClass(id, name, category, sync);
	}

	this.createTestCalendarArray = function() {
		calendarArray.push(this.createCalendar("fakeID1", "KTH calendar", categoryArray[1], true));
		calendarArray.push(this.createCalendar("fakeID2", "Work calendar", categoryArray[2], true));
		calendarArray.push(this.createCalendar("fakeID3", "Other calendar", categoryArray[3], true));
		calendarArray.push(this.createCalendar("fakeID4", "Private calendar", null, false));
	}

	this.changeCalendarCategory = function(calendar, category) {
		for (i in calendarArray) {
			if (calendarArray[i].name == calendar.name) {
				for (j in categoryArray) {
					if (categoryArray[j].name == category.name){
						calendarArray[i].category = categoryArray[j];
						break;
					}
				}	
				break;
			}
		}

		// TODO: Write code to change also in the events
	}	

	this.getTestCalendars = function(){
		return calendarArray;
	}

	this.setCalendars = function(calendars){
		console.log("in setCategories");
		calendarArray = calendars;
	}

	// changes sync for a calendar
	this.changeSync = function(calendar) {
		for (index in calendarArray) {
			if (calendarArray[index].name == calendar.name) {
				calendarArray[index].sync == calendar.sync;
			}
		}

	}


	//updates both start and end time for the event in data list
	this.updateTime = function(event, startDate, endDate){
		for(index in data){
			if(data[index].id == event.id){
				//console.log("här kommer id på eventet")
				//console.log(data[index].id)
				data[index].start = startDate;
				data[index].end = endDate;
				var currentTime = Date.now();
        		var eventEndTime = Date.parse(data[index].end);
				if (currentTime > eventEndTime) {
					//console.log("currenttime>eventendtime")
					if(data[index].autoReport==true){
						//console.log("autoreport==true")
                		data[index].logged = true;
                		data[index].borderColor = data[index].color;
                	}
                	else{
                		//console.log("autoreport==false")
                		data[index].logged = false;
            			data[index].borderColor = 'black';
                	}
        		}
        		else {
        			//console.log("not gonna log")
            		data[index].logged = false;
            		data[index].borderColor = 'black';
        		}
			}
		}
	}

	this.hideEvent = function(calEvent){
		for(index in data){
			if(data[index].id == calEvent.id){
				data[index].logged = calEvent.logged;
				data[index].color = calEvent.color;
				data[index].borderColor = calEvent.borderColor;
				data[index].textColor = calEvent.textColor;
				data[index].autoReport = calEvent.autoReport;
				data[index].hidden = calEvent.hidden;
			}
		}
	}

	this.deleteEvent = function(calEvent){
		for(index in data){
			if(data[index].id == calEvent.id){
				//console.log(data[index].name)
				data.splice(index, 1);
			}
		}
	}

	/******* Categories *****/
	var colorsTaken = [];

	//returns a color for a specific category (if the category is not yet created, input null) which has not the same as another category
	this.colorsWithoutDublett = function(category){
		var loop = true;
		while(loop==true){
			var inList = false;
			var color = colors[Math.floor(Math.random() * colors.length)];
			for(index in colorsTaken){
				if(color==colorsTaken[index]){
					inList = true;
				}
			}
			if(inList == false){
				if (category){
					for (i in colorsTaken){
						if(colorsTaken[i]==category.color){
							colorsTaken.splice(i, 1);
						}
					}
				}
				loop = false;
				colorsTaken.push(color);
			}
		}
		return color;
	}

	var CategoryClass = function(name, autoReport, color){		//represents a category with name and color
		this.name = name;
		this.color = color;
		this.autoReport = autoReport;
		return this;
	}

	this.createCategory = function(name, autoReport){		//creates a new category
		return new CategoryClass(name, autoReport, this.colorsWithoutDublett(null));
	}


	// removes a category
	this.removeCategory = function(category) {
		if (category != "Undefined") {
			for (index in categoryArray) {
				if (categoryArray[index].name == category) {
					categoryArray.splice(index, 1);
					this.changeCategoryToUndefined(category);
				}
			}
		}
	}

	// changes all the events of one category to undefined
	this.changeCategoryToUndefined = function(category) {
		for (i in data) {
			if (data[i].category == category) {
				data[i].category = categoryArray[0].name;
				data[i].color = categoryArray[0].color;
			}
		}
	}
	// changes the name of a category
	this.changeCategoryName = function(category, newName) {
		oldName = category.name;

		for (index in categoryArray) {
			if (categoryArray[index].name == category.name){
				categoryArray[index].name = newName;
			}
		}

		for (i in data) {
			if (data[i].category == oldName) {
				data[i].category = newName;
			}
		}
	}
	// change color for all events in one category when the category color has been changed
	this.changeColor = function(category) {
		for (i in data) {
			if (data[i].category == category.name) {
				data[i].color = category.color;
			}
		}
	}


	var categoryArray = [new CategoryClass("Undefined", true, this.colorsWithoutDublett(null)), new CategoryClass("KTH", true, this.colorsWithoutDublett(null)), new CategoryClass("Work", true, this.colorsWithoutDublett(null)), new CategoryClass("Other", true, this.colorsWithoutDublett(null))];	//the real list of categories


	/*****Eventclass **/
	// The attributes are: id, created, updated, title, start, end, category, logged, autoReport, color, textColor, hidden, intern, logged, borderColor
	var EventClass = function(current, category, logged, dataList){
	//creates objects with the attributes we want, current is a object we want to copy most from
		this.id=current.id;

		this.created=current.created;	
		this.updated=current.updated;
		this.title=current.summary;

		this.start=current.start;
		this.end=current.end;

		this.category=category.name;				//a category grouping some events together, should have a unique color
		this.logged=logged;				//true/false depending on if the event is logged or not
		this.autoReport = category.autoReport;		// bool depending on if the event should be auto reported
		this.color=category.color;
		this.textColor='black';
		this.hidden = false;
		if(current.intern){
			this.intern = true;
		}
		else{
			this.intern = false;
		}
		//console.log(this.intern)

		if (this.logged==false){	//if not logged we have a black border
			this.borderColor='black'; 
		}
		else{
			this.borderColor=this.color;
		}


		/*//to handle passing midnight events by splitting them by midnight, Recursion! <3
		startNow = new Date(this.start);
		endNow = new Date(this.end);


		if(!(startNow.getDate() == endNow.getDate())){		//we need to handle it
			start = new Date();
			start.setDate(startNow.getDate()+1);	//start time for the new event is the next day
			start.setHours(0, 0, 0);				//at midnight
			
			current.start = start;
			current.end = this.end;
			
			eventObject = new EventClass(current, category, logged, dataList);	//creates a new event
			
			dataList.push(eventObject);				//and adds the new event to the data list
			
			updatedEnd = new Date();
			updatedEnd.setDate(startNow.getDate());		//changes the end time for this current event to midnight at the day of the start date
			updatedEnd.setHours(23,59,59);
			this.end = updatedEnd;
		}*/
			
		return this;
	};



	this.addNewEvent = function(name, start, end, category){
		
		current = {
		   "kind": "calendar#event",
		   "id": this.createID(),
		   "created": Date.now(),	// date.now().toDateString() ?
		   "updated": Date.now(),	// date.now() ?
		   "summary": name,
		   "start": start,
		   "end": end,
		   "intern": true
		};

		currentTime = Date.now();
		eventEndTime = Date.parse(end);
			
		if (currentTime > eventEndTime) {
				logged = true;
		}
		else {
			logged = false;
		}
		
		
		eventObject = new EventClass(current, category, logged, data);

		id = data.length+1;
		while (true) {
			bool=true;
			//testID = "_"+id.toString();
			//console.log("testID: ", testID);

			for (i in data) {
				if (data[i]._id == id) {
					//console.log(data[i]._id)
					bool = false;
				}
			}

			if (bool == true) {
				eventObject._id = id;
				break;
			}
			id++;
		}

		//eventObject._id = (data.length+1)
		console.log("data for new event:", eventObject);
		data.push(eventObject);
		console.log(data);
		//autoReportAll();
		return eventObject;
	};



	// changes category and color according to calenderEvent (and ID)
	this.changeCategory = function(calEvent) {
		for (index in data) {
			if (data[index].id == calEvent.id) {
				data[index].category = calEvent.category;
				data[index].color = calEvent.color;
				return;
			}
		}
	}
	// changes logged status according to calenderEvent (and ID)
	this.changeLoggedStatus = function(calEvent) {
		for (index in data) {
			if (data[index].id == calEvent.id) {
				data[index].logged = calEvent.logged;
				data[index].borderColor = calEvent.borderColor;
				return;
			}
		}
	}

	//creates "our" objects of all objects in the imported list
	//can be used for automatic logging when a whole calendar should have the same category


	var iterateData = this.iterateData = function(testData, category){
		var iteratedData = [];

		for(index in testData){
			var current = testData[index];
			randNum = Math.floor((Math.random() * categoryArray.length));
			end = current.end.dateTime;
			current.end = end;
			start = current.start.dateTime;
			current.start = start;

			var eventObject = new EventClass(current, category, false, iteratedData);
			iteratedData.push(eventObject);
			data.push(eventObject);
		}
		//data.push(iteratedData);
		console.log("data:", data);
		autoReportAll();
		//return data;
	};

	/************ AUTO REPORT *************/

	// auto reports events that has already happen if auto report is set to true
	var autoReportAll = this.autoReportAll = function() {
		//console.log("In auto report");
		currentTime = Date.now();

		for (index in data) {
			eventEndTime = Date.parse(data[index].end);
			
			if (currentTime > eventEndTime && data[index].autoReport == true) {
				data[index].logged = true;
				data[index].borderColor = data[index].color;
			}
		}
	};

	// changes auto report for a category and its events
	this.changeAutoReport = function(category) {	
		for (index in categoryArray){					// change auto report for category
			if (categoryArray[index].name == category.name) {	
				categoryArray[index].autoReport == category.autoReport;
			}
		}

		for (i in data) {								// change on the events
			if (data[i].category == category.name) {
				data[i].autoReport = category.autoReport;
			}
		}

		if (category.autoReport == true) {			// if change to true, auto report unlogged events directly
			this.autoReportAll();
		}
	}

	this.changeEventAutoReport = function(event) {
		for (index in data) {
			if (data[index].id == event.id) {
				data[index].autoReport = event.autoReport
			}
		}
	}

	/***Returns**/
	
	//returns the data
	this.getTestData = function() {
		console.log("in getTestData()");
		return data;
	};

	//returns the possible colors
	this.getAllColors = function(){
		return colors;
	}
	// returns all categories
	this.getCategories = function(){
		return categoryArray;
	}

	this.setCategories = function(categories){
		//for setting the categories from the firebase
		console.log("in setCategories");
		categoryArray = categories;
	}
	// returns all category names in a list
	this.getCategoryNames = function(){
		nameList = []
		for (num in categoryArray) {
			nameList.push(categoryArray[num].name);
		}
		return nameList;
	}
	// returns the color of a category
	this.getColorByCategory = function(category) {
		for (index in categoryArray) {
			if (categoryArray[index].name == category) {
				return categoryArray[index].color
			}
		}
	}

	/******* Statistics *******/

	// calculate duration between two datetimes, returns milliseconds
	this.calcDuration = function(start, end) {

		endTime = Date.parse(end);
		startTime = Date.parse(start);
		duration = endTime-startTime;

		return duration;
	}
	// calculate total amount of logged time for a category, returns hours
	this.calcTimeCategory = function(category) {
		sum = 0;
		for (i in data) {
			if (category == data[i].category) {
				if (data[i].logged == true) {
					sum += this.calcDuration(data[i].start, data[i].end);
				}
			}
		}
		result = sum /(1000 * 60 * 60);

		return result;
	}
	// calculate total amount of logged time, returns hours 
	this.calcTimeAllCategories = function() {
		sum = 0;
		for (j in categoryArray) {
			sum += this.calcTimeCategory(categoryArray[j].name);
		}
		return sum;
	}

	// calculate total amount of logged time for a category, returns hours
	this.calcPeriodCategory = function(category, startMs, endMs) {
		sum = 0;
		for (i in data) {
			if (category == data[i].category) {
				if (data[i].logged == true) {

					if (Date.parse(data[i].start) >= startMs && Date.parse(data[i].end) <= endMs) {
						sum += this.calcDuration(data[i].start, data[i].end);
					}
				}
			}
		}
		result = sum /(1000 * 60 * 60);

		return result;
	}


	// returns a list of objects with categories and amount of time spent per category
	this.statPieObjects = function() {
		objList = [];
		for (index = 0; index < categoryArray.length; index++) {
			obj = {name: categoryArray[index].name, y: this.calcTimeCategory(categoryArray[index].name), color: categoryArray[index].color}; // 
			objList.push(obj);		
		}
		return objList;
	}

	// returns a list of spent time in category order
	this.statBarList = function() {
		valueList = [];
		for (k in categoryArray) {
			valueList.push({name: categoryArray[k].name, y: this.calcTimeCategory(categoryArray[k].name), color: categoryArray[k].color});
		}
		return valueList;
	}

	this.calcDayDuration = function(j, dateList, i) {
		sum = 0;

		startDateMilli = Date.parse(data[j].start);
		startDate = new Date(startDateMilli);
		startDateString = startDate.toDateString();

		endDateMilli = Date.parse(data[j].end);
		endDate = new Date(endDateMilli);
		endDateString = endDate.toDateString();


		startLateMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1,0,0,0,0);
		endEarlyMidnight = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),0,0,0,0);

		if (dateList[i] == startDateString && dateList[i] == endDateString) {	// if the whole event is the same day
			sum += (this.calcDuration(data[j].start, data[j].end)) /(1000 * 60 * 60);	// change to hours instead of milliseconds
		}
		else if (dateList[i] == startDateString && dateList[i] != endDateString) {	// report first day of event
			sum += (this.calcDuration(data[j].start, startLateMidnight) /(1000 * 60 * 60));	// change to hours instead of milliseconds
		}
		else if ((dateList[i] != startDateString) && (dateList[i] == endDateString)) {	// if its the last day of the event
			sum += (this.calcDuration(endEarlyMidnight, data[j].end) /(1000 * 60 * 60));	// change to hours instead of milliseconds
		}
		else if (Date.parse(dateList[i]) >= startLateMidnight.getTime() && Date.parse(dateList[i]) <= endEarlyMidnight.getTime()) { // if its a date between start and end

			milliDate = Date.parse(dateList[i]);
			d = new Date(milliDate);
			startD = new Date(d.getFullYear(), d.getMonth(), d.getDate(),0,0,0,0);
			endD = new Date(d.getFullYear(), d.getMonth(), d.getDate()+1,0,0,0,0);

			sum += (this.calcDuration(startD, endD) /(1000 * 60 * 60));	// change to hours instead of milliseconds
		}		

		return sum;
	}

	// returns current week logged time
	this.createWeekList = function(startDate, category) {
		dataList = [];
		dateList = [];
		start = startDate.toDateString();
		dateList.push(start);

		startMs = startDate.getTime();

		for (k = 0; k < 6; k++) {
			n = parseInt(k)+1;
			ms = n * 86400000;
			date = new Date(startMs + ms);
			dateList.push(date.toDateString());
		}
		
		for (i in dateList) {
			sum = 0;
			for (j in data) {			// for every event
				if (data[j].logged == true && data[j].category == category) {	// if logged and right category

					sum += this.calcDayDuration(j, dateList, i);
				}
			}
			dataList.push(sum);
		}
		return dataList;
	}


	// returns a list of objects with categories and amount of time spent per category for one week
	this.statPieWeek = function(whichWeek) {

		now = new Date();
		year = now.getFullYear();
		month = now.getMonth();
		day = now.getDate();
		weekday = now.getDay();

		if (weekday == 0) {	// since sunday returns 0 from getDay()
			weekday = 7;
		}

		startDate = new Date (year, month, day-weekday+1+(7*whichWeek), 0, 0, 0, 0);
		
		startMs = startDate.getTime();

		endMs = startMs + 6*24*60*60*1000;

		objList = [];
		for (index = 0; index < categoryArray.length; index++) {

			value = this.calcPeriodCategory(categoryArray[index].name, startMs, endMs);

			obj = {name: categoryArray[index].name, y: value, color: categoryArray[index].color};
			objList.push(obj);		
		}
		return objList;
	}



	// returns a list with logged time the current week
	this.statWeekSeries = function(whichWeek) {
		weekList = [];
		now = new Date();
		year = now.getFullYear();
		month = now.getMonth();
		day = now.getDate();
		weekday = now.getDay();

		if (weekday == 0) {	// since sunday returns 0 from getDay()
			weekday = 7;
		}

		startWeek = new Date (year, month, day-weekday+1+(7*whichWeek), 0, 0, 0, 0);

		for (index in categoryArray) {	// for every category
			
			list = this.createWeekList(startWeek, categoryArray[index].name);

			obj = {name: categoryArray[index].name, data: list, color: categoryArray[index].color, pointInterval: 24 * 3600 * 1000, pointStart: startWeek.getTime()};
			weekList.push(obj);
		}
		return weekList;
	}

	// returns a list of spent time in category order
	this.statWeekTotalList = function(whichWeek) {

		now = new Date();
		year = now.getFullYear();
		month = now.getMonth();
		day = now.getDate();
		weekday = now.getDay();

		if (weekday == 0) {	// since sunday returns 0 from getDay()
			weekday = 7;
		}
		
		startDate = new Date (year, month, day-weekday+1+(7*whichWeek), 0, 0, 0, 0);
		
		startMs = startDate.getTime();

		endMs = startMs + 6*24*60*60*1000;

		objList = [];
		for (index = 0; index < categoryArray.length; index++) {

			value = this.calcPeriodCategory(categoryArray[index].name, startMs, endMs);

			obj = {name: categoryArray[index].name, y: value, color: categoryArray[index].color};
			objList.push(obj);		
		}
		return objList;
	}


	// returns a list of spent time in category order
	this.statMonthTotalList = function(whichMonth) {
		daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

		now = new Date();
		year = now.getFullYear();
		month = now.getMonth();

		if (year % 4 == 0) {
			daysInMonth[1] = 29;
		}
		
		startDate = new Date (year, month+whichMonth, 1, 0, 0, 0, 0);
		startMs = startDate.getTime();
		endMs = startMs;

		newMonth = (month+whichMonth)%12;

		if (newMonth < 0) {
			newMonth = 12+newMonth;
		}	

		for	(k = 1; k < daysInMonth[newMonth]; k++) {
			ms = 86400000;
			endMs += ms
		}

		objList = [];
		for (index = 0; index < categoryArray.length; index++) {

			value = this.calcPeriodCategory(categoryArray[index].name, startMs, endMs);

			obj = {name: categoryArray[index].name, y: value, color: categoryArray[index].color};
			objList.push(obj);		
		}
		return objList;
	}



	// returns current month logged time
	this.createMonthList = function(startDate, category, month) {
		daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
		dataList = [];
		dateList = [];

		start = startDate.toDateString();
		dateList.push(start);

		startMs = startDate.getTime();

		if (startDate.getFullYear() % 4 == 0) {
			daysInMonth[1] = 29;
		}
		
		newMonth = month%12;

		if (newMonth < 0) {
			newMonth = 12+newMonth;
		}	

		for	(k = 0; k < daysInMonth[newMonth]-1; k++) {
			n = parseInt(k)+1;
			ms = n * 86400000;
			date = new Date(startMs + ms);
			dateList.push(date.toDateString());
		}

		for (i in dateList) {
			sum = 0;
			for (j in data) {			// for every event
				if (data[j].logged == true && data[j].category == category) {	// if logged and right category

				//	sum += this.calcDay(j, dateList, i);

					/*compareDate = Date.parse(data[j].start);
					compareDate = new Date(compareDate);
					if (dateList[i] == compareDate.toDateString()) {
						sum += (this.calcDuration(data[j].start, data[j].end)) /(1000 * 60 * 60);	// change to hours instead of milliseconds
					}*/

					startDateMilli = Date.parse(data[j].start);
					startDate = new Date(startDateMilli);
					startDateString = startDate.toDateString();

					endDateMilli = Date.parse(data[j].end);
					endDate = new Date(endDateMilli);
					endDateString = endDate.toDateString();


					startLateMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1,0,0,0,0);
					endEarlyMidnight = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),0,0,0,0);

					if (dateList[i] == startDateString && dateList[i] == endDateString) {	// if the whole event is the same day
						sum += (this.calcDuration(data[j].start, data[j].end)) /(1000 * 60 * 60);	// change to hours instead of milliseconds
					}
					else if (dateList[i] == startDateString && dateList[i] != endDateString) {	// report first day of event
						sum += (this.calcDuration(data[j].start, startLateMidnight) /(1000 * 60 * 60));	// change to hours instead of milliseconds
					}
					else if ((dateList[i] != startDateString) && (dateList[i] == endDateString)) {	// if its the last day of the event
						sum += (this.calcDuration(endEarlyMidnight, data[j].end) /(1000 * 60 * 60));	// change to hours instead of milliseconds
					}
					else if (Date.parse(dateList[i]) >= startLateMidnight.getTime() && Date.parse(dateList[i]) <= endEarlyMidnight.getTime()) { // if its a date between start and end

						milliDate = Date.parse(dateList[i]);
						d = new Date(milliDate);
						startD = new Date(d.getFullYear(), d.getMonth(), d.getDate(),0,0,0,0);
						endD = new Date(d.getFullYear(), d.getMonth(), d.getDate()+1,0,0,0,0);

						sum += (this.calcDuration(startD, endD) /(1000 * 60 * 60));	// change to hours instead of milliseconds
					}

				}
			}
			dataList.push(sum);
		}
		return dataList;
	}

	// returns a list with logged time the current month
	this.statMonthSeries = function(whichMonth) {
		monthList = [];
		now = new Date();
		year = now.getFullYear();
		month = now.getMonth();

		startDate = new Date (year, month + whichMonth, 1, 0, 0, 0, 0);

		for (index in categoryArray) {	// for every category
			
			list = this.createMonthList(startDate, categoryArray[index].name, month+whichMonth);

			obj = {name: categoryArray[index].name, data: list, color: categoryArray[index].color, pointInterval: 24 * 3600 * 1000, pointStart: startDate.getTime()};
			monthList.push(obj);
		}
		return monthList;
	}

	// returns a list of objects with categories and amount of time spent per category for one week
	this.statPieMonth = function(whichMonth) {
		daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

		now = new Date();
		year = now.getFullYear();

		if (year % 4 == 0) {
			daysInMonth[1] = 29;
		}

		month = now.getMonth();
		startDate = new Date (year, month+whichMonth, 1, 0, 0, 0, 0);
		startMs = startDate.getTime();
		endMs = startMs;

		newMonth = (month+whichMonth)%12;


		if (newMonth < 0) {
			newMonth = 12+newMonth;
		}	

		for	(k = 1; k < daysInMonth[newMonth]; k++) {
			ms = 86400000;
			endMs += ms
		}
		
		objList = [];
		for (index = 0; index < categoryArray.length; index++) {

			value = this.calcPeriodCategory(categoryArray[index].name, startMs, endMs);

			obj = {name: categoryArray[index].name, y: value, color: categoryArray[index].color};
			objList.push(obj);		
		}
		return objList;
	}

	this.statYearOverview = function (whichYear) {
		objList = [];
		daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

		now = new Date();
		year = now.getFullYear();

		if (year % 4 == 0) {
			daysInMonth[1] = 29;
		}

		for (index in categoryArray) {
			dataList = [];
			for (j = 0; j < 12; j++) {

				startDate = new Date(year + whichYear, j, 1, 0, 0, 0, 0)
				startMs = startDate.getTime();
				endMs = startMs;

				for	(k = 1; k < daysInMonth[j]; k++) {
					ms = 86400000;
					endMs += ms
				}
				value = this.calcPeriodCategory(categoryArray[index].name, startMs, endMs);
				dataList.push(value);
			}
			obj = {name: categoryArray[index].name, data: dataList, color: categoryArray[index].color};
			objList.push(obj);
		}
		return objList;
	}
	

	this.initiateData = function(){
		//this.iterateData();
		//this.createTestCalendarArray();
		//this.autoReportAll();
	}


	this.setEventData = function(events){
		console.log("setting eventdata")
		data = events;
		//autoReportAll();
	}

	this.getSyncedCalendars = function(){
		console.log("getting synced calendars from TimeTracker");
		var toSync = [];

		for(i in calendarArray){
			cal = calendarArray[i];
			//console.log(cal);
			if(cal.sync){
				toSync.push(cal);
			}
		}

		return toSync;
	}

	this.addCalendar = function(calendar){
		//adds calendar from google-response - defaults to sync and no category
		calendarArray.push(this.createCalendar(calendar.id, calendar.summary, categoryArray[1], true));
	}

	return this;

});

