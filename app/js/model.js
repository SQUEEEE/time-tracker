timeTrackerApp.factory('TimeTracker', function ($resource) {




	var testData = [
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
	    "dateTime": "2013-12-06T08:00:00+01:00"
	   },
	   "end": {
	    "dateTime": "2013-12-06T10:00:00+01:00"
	   },
	   "iCalUID": "080045b8ce6d8543b8945ad1212b349e1a9c3c0f",
	   "sequence": 0,
	   "reminders": {
	    "useDefault": true
	   }
	}
	];

	this.getTestData = function() {
		return testData;
	}



	return this;

});

