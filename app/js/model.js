timeTrackerApp.factory('TimeTracker', function ($resource) {

	var data = []; // a list of events with the right attributes

	var testCategories = ["KTH", "Work", "Other"];


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
	    "dateTime": "2016-03-30T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-03-30T10:00:00+01:00"
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
	    "dateTime": "2016-03-30T10:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-03-30T12:00:00+01:00"
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
	    "dateTime": "2016-03-30T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-03-30T10:00:00+01:00"
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
	    "dateTime": "2016-03-31T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-03-31T10:00:00+01:00"
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
	    "dateTime": "2016-04-01T11:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2016-04-01T15:00:00+01:00"
	   },
	   "iCalUID": "0646191c57dad5a4ebc4e10f112ec9a042b001eb",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
	}
	];

	var EventClass = function(current, category, logged){
	//creates objects with the attributes we want, current is a object we want to copy most from

		this.id=current.id;
		this.created=current.created;
		this.updated=current.updated;
		this.title=current.summary;
		this.creator=current.creator.email;
		this.organizer=current.organizer.email;		//do we want organizer or creator? Which is what?
		this.start=current.start.dateTime;
		this.end=current.end.dateTime;
		this.iCalUID=current.iCalUID;		//what is it and do we need it?
		this.category=category;				//a category grouping some events together, should have a unique color
		this.logged=logged;					//true/false depending on if the event is logged or not

		return this
	};

	/*this.addEvent = function(category, logged) {
		// TODO skapa object
		var eventObject = new EventClass(object, category, logged);
		data.push(eventObject)
		return eventObject
	}*/

	//creates "our" objects of all objects in the imported list
	//can be used for automatic logging when a whole calendar should have the same category
	this.iterateData = function(){
		var iteratedData = [];
		for(index in testData){
			var current = testData[index];
			randNum = Math.floor((Math.random() * testCategories.length));
			var eventObject = new EventClass(current, testCategories[randNum], true);
			iteratedData.push(eventObject);
		}
		data = iteratedData
		return data;
	};
	
	//returns the data
	this.getTestData = function() {
		return data;
	};


	/******* Statistics *******/

	// calculate duration between two datetimes
	this.calcDuration = function(start, end) {		// TODO: Funkar inte just nu!
		duration = 0;
		duration += end.dateTime - start.dateTime;
		/*console.log(end.dateTime);
		console.log(start.dateTime);
		console.log(duration);*/

		return 2;
	}
	// calculate total amount of logged time for a category
	this.calcTimeCategory = function(category) {
		sum = 0;
		for (index in data) {
			if (category == data[index].category) {
				if (data[index].logged == true) {
					sum += this.calcDuration(data[index].start, data[index].end);
				}
			}
		}
		return sum;
	}
	// calculate total amount of logged time
	this.calcTimeAllCategories = function() {
		sum = 0;
		for (index in testCategories) {
			sum += this.calcTimeCategory(testCategories[index]);
		}

		return sum;
	}

	// returns a list of objects with categories and amount of time spent per category
	this.statPieObjects = function() {
		objList = [];
		for (index in testCategories) {
			obj = {name: testCategories[index], y: this.calcTimeCategory(testCategories[index])};
			objList.push(obj);
		}

		return objList;
	}

	// returns a list of spent time in category order
	this.statBarList = function() {
		valueList = [];
		for (index in testCategories) {
			valueList.push(this.calcTimeCategory(testCategories[index]));
		}
		return valueList;
	}

	this.statWeekSeries = function() {
		weekList = [];
		for (index in testCategories) {
			obj = {name: testCategories[index], data: [2,2,2,2,2,2,2]};
			weekList.push(obj);
		}
		return weekList;
	}

	this.isEarlier = function(myDate, comparedTo) {
		if (myDate < comparedTo) {
			return true;
		}
		return false;
	}

	this.isLater = function(myDate, comparedTo) {
		if (myDate >= comparedTo) {
			return true;
		}
		return false;
	}

	// returns test categories
	this.getTestCategories = function() {
		return testCategories;
	}

	this.iterateData();


	return this;

});

