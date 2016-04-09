timeTrackerApp.factory('TimeTracker', function ($resource) {

	var data = []; // a list of events with the right attributes

	var colors = ['lightblue', 'green', 'pink', 'AntiqueWhite', 'Aquamarine', 'CadetBlue', 'Chartreuse', 'Coral',
					'CornflowerBlue', 'Crimson', 'DarkCyan', 'DarkGoldenRod', 'DarkGreen', 'DarkSalmon', 'GoldenRod',
					'GreenYellow', 'IndianRed', 'Khaki', 'LightCoral', 'LightCyan', 'LightGray', 'LightGreen',
					'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSteelBlue', 'LimeGreen',
					'MediumAquaMarine', 'MediumSeaGreen', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleVioletRed', 
					'PapayaWhip', 'PeachPuff', 'Peru', 'Plum', 'PowderBlue', 'RosyBrown', 'Salmon', 'SeaGreen', 
					'Silver', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Wheat', 'Violet',
					'YellowGreen'];		//all available colors for categories

	
	var testData = [			//a list of events imported from the api
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
	    "dateTime": "2016-04-07T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-07T10:00:00+01:00"
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
	    "dateTime": "2016-04-06T10:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-06T12:00:00+01:00"
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
	    "dateTime": "2016-04-06T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-06T10:00:00+01:00"
	   },
	   "iCalUID": "1cb6047381d01f23bc96475f8b0b9cfc8d21beec",
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
	    "dateTime": "2016-04-05T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-05T10:00:00+01:00"
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
	    "dateTime": "2016-04-09T11:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-09T15:00:00+01:00"
	   },
	   "iCalUID": "0646191c57dad5a4ebc4e10f112ec9a042b001eb",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
	}
	];

	/******* Categories *****/
	var CategoryClass = function(name){		//represents a category with name and color
		this.name = name;
		this.color = colors[Math.floor(Math.random() * colors.length)];
		this.autoreport = false;
		return this;
	}

	this.createCategory = function(name){		//creates a new category
		return new CategoryClass(name);
	}

	// removes a category
	this.removeCategory = function(category) {
		console.log(categoryArray);
		console.log(category);
		if (category != "Undefined") {
			for (index in categoryArray) {
				if (categoryArray[index].name == category) {
					categoryArray.splice(index, 1);
					this.changeCategoryToUndefined(category);
				}
			}
		}
		console.log(categoryArray);
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


	var categoryArray = [new CategoryClass("Undefined"), new CategoryClass("KTH"), new CategoryClass("Work"), new CategoryClass("Other")];	//the real list of categories


	/*****Eventclass **/
	var EventClass = function(current, category, logged){
	//creates objects with the attributes we want, current is a object we want to copy most from
		this.id=current.id;
		this.url=current.htmlLink;
		this.created=current.created;
		this.updated=current.updated;
		this.title=current.summary;
		this.description=current.description;
		this.creator=current.creator.email;
		this.organizer=current.organizer.email;		//do we want organizer or creator? Which is what?
		this.start=current.start.dateTime;
		this.end=current.end.dateTime;
		this.iCalUID=current.iCalUID;		//what is it and do we need it?
		this.category=category.name;				//a category grouping some events together, should have a unique color
		this.logged=logged;				//true/false depending on if the event is logged or not
		this.autoreport = category.autoreport;		// bool depending on if the event should be auto reported
		this.color=category.color;
		this.textColor='black';
		return this;
	};

	//creates "our" objects of all objects in the imported list
	//can be used for automatic logging when a whole calendar should have the same category
	this.iterateData = function(){
		var iteratedData = [];
		for(index in testData){
			var current = testData[index];
			randNum = Math.floor((Math.random() * categoryArray.length));
			var eventObject = new EventClass(current, categoryArray[randNum], false);
			iteratedData.push(eventObject);
		}
		data = iteratedData
		return data;
	};

	// autoreports events that has already happen if autoreport is set to true
	this.autoreportAll = function() {
		currentTime = Date.now();
		console.log(data);
		//console.log("2", currentTime);
		for (index in data) {
			eventEndTime = Date.parse(data[index].end);
			//console.log("eventtime: ", data[index].end);
			//console.log("in ms: ", eventEndTime);
			
			if (currentTime > eventEndTime && data[index].autoreport == true) {
				data[index].logged = true;
			}
		}
		console.log(data);
	};

	// changes autoreport for a category and its events
	this.changeAutoreport = function(category) {	
		for (index in categoryArray){					// change autoreport for category
			if (categoryArray[index].name == category.name) {	
				categoryArray[index].autoreport == category.autoreport;
			}
		}

		for (i in data) {								// change on the events
			if (data[i].category == category.name) {
				data[i].autoreport = category.autoreport;
			}
		}

		if (category.autoreport == true) {			// if change to true, autoreport unlogged events directly
			this.autoreportAll();
		}

		console.log(data);
		console.log(categoryArray);
	}

	/***Returns**/
	
	//returns the data
	this.getTestData = function() {
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

	// returns current week logged time
	this.createWeekList = function(startDate, category) {
		dataList = [];
		num = [1,2,3,4,5,6]

		dateList = [];
		start = startDate.toDateString();
		dateList.push(start);

		startMs = startDate.getTime();

		for (k in num) {
			n = parseInt(k)+1;
			ms = n * 86400000;
			date = new Date(startMs + ms);
			dateList.push(date.toDateString());

		}

		for (i in dateList) {
			sum = 0;
			for (j in data) {			// for every event
				if (data[j].logged == true && data[j].category == category) {	// if logged and right category

					compareDate = Date.parse(data[j].start);
					compareDate = new Date(compareDate);
					if (dateList[i] == compareDate.toDateString()) {
						sum += (this.calcDuration(data[j].start, data[j].end)) /(1000 * 60 * 60);	// change to hours instead of milliseconds
					}
				}
			}
			dataList.push(sum);
		}

		return dataList;
	}

	// returns a list with logged time the current week
	this.statWeekSeries = function() {
		weekList = [];
		now = new Date();
		year = now.getFullYear();
		month = now.getMonth();
		day = now.getDate();
		weekday = now.getDay();

		startWeek = new Date (year, month, day-weekday+1, 0, 0, 0, 0);

		for (index in categoryArray) {	// for every category
			
			list = this.createWeekList(startWeek, categoryArray[index].name);

			obj = {name: categoryArray[index].name, data: list, color: categoryArray[index].color, pointInterval: 24 * 3600 * 1000, pointStart: startWeek.getTime()};
			weekList.push(obj);
		}
		return weekList;
	}


	// returns a list with logged time the current month
	this.statMonthSeries = function() {
		monthList = [];
		now = new Date();
		year = now.getFullYear();
		month = now.getMonth();

		startDate = new Date (year, month, 1, 0, 0, 0, 0);

		for (index in categoryArray) {	// for every category
			
			list = this.createMonthList(startDate, categoryArray[index].name, month);

			obj = {name: categoryArray[index].name, data: list, color: categoryArray[index].color, pointInterval: 24 * 3600 * 1000, pointStart: startDate.getTime()};
			monthList.push(obj);
		}
		return monthList;
	}

	// returns current month logged time
	this.createMonthList = function(startDate, category, month) {
		daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
		dataList = [];
		dateList = [];
		num = [];

		for (i = 0; i < daysInMonth[month]; i++) {
			num.push(0);
		}

		start = startDate.toDateString();
		dateList.push(start);

		startMs = startDate.getTime();

		for (k in num) {
			n = parseInt(k)+1;
			ms = n * 86400000;
			date = new Date(startMs + ms);
			dateList.push(date.toDateString());
		}

		for (i in dateList) {
			sum = 0;
			for (j in data) {			// for every event
				if (data[j].logged == true && data[j].category == category) {	// if logged and right category

					compareDate = Date.parse(data[j].start);
					compareDate = new Date(compareDate);
					if (dateList[i] == compareDate.toDateString()) {
						sum += (this.calcDuration(data[j].start, data[j].end)) /(1000 * 60 * 60);	// change to hours instead of milliseconds
					}
				}
			}
			dataList.push(sum);
		}
		return dataList;
	}



	this.getTestCalendars = function(){
		return ["KTH calendar", "Work calendar", "Potatoes", "Standard calendar"]
	}

	

	this.iterateData();
	this.autoreportAll();

	return this;

});

