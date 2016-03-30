timeTrackerApp.factory('TimeTracker', function ($resource) {

	var data = []; // a list of events with the right attributes

	var testCategories = ["KTH", "Work"];

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
	}
	];

	var EventClass = function(current, category, logged){
	//creates objects with the attributes we want, current is a object we want to copy most from

		//this.id=current.id;
		//this.created=current.created;
		//this.updated=current.updated;
		this.title=current.summary;
		//this.creator=current.creator.email;
		//this.organizer=current.organizer.email;
		this.start=current.start.dateTime;
		this.end=current.end.dateTime;
		//this.iCalUID=current.iCalUID;
		//this.category=category;
		//this.logged=logged;

		return this
	};

	/*this.addEvent = function(category, logged) {
		// TODO skapa object
		var eventObject = new EventClass(object, category, logged);
		data.push(eventObject)
		return eventObject
	}*/

	//creates "our" objects of all objects in the imported list
	this.iterateData = function(){
		var iteratedData = [];
		for(index in testData){
			var current = testData[index];
			var eventObject = new EventClass(current, "KTH", true);
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

	this.calcDuration = function(start, end) {		// TODO: Funkar inte just nu!
		duration = 0;
		duration += end.dateTime - start.dateTime;
		console.log(end.dateTime);
		console.log(start.dateTime);
		console.log(duration);

		return 2;
	}

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

	this.calcTimeAllCategories = function() {
		sum = 0;
		for (index in testCategories) {
			sum += this.calcTimeCategory(testCategories[index]);
		}

		return sum;
	}

	this.getTestCategories = function() {
		return testCategories;
	}

	this.iterateData();
	this.calcTimeCategory("KTH");


	return this;

});

