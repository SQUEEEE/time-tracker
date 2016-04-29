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
	var categoryArray = [];


	//to know when to update the date from firebase
	var loadedData = false;
	this.changeLoadedData = function(){
		loadedData = true;
	}
	this.getLoadedData = function(){
		return loadedData;
	}

	// generates a new ID to use for an event
	this.createID = function() {
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
	    		}
	    	}

	    	if (working == true) {
	    		bool = false;
	    	}
	    }  

	    return id;
	}


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



	this.changeCalendarCategory = function(calendar, category) {
		for (i in calendarArray) {
			if (calendarArray[i].name == calendar.name) {
				for (j in categoryArray) {
					if (categoryArray[j].name == category.name){
						for (e in data){
							if(data[e].calendarId == calendarArray[i].id){
								if (data[e].category == calendarArray[i].category.name) {
									data[e].category = categoryArray[j].name;
									data[e].color = categoryArray[j].color;
									if (data[e].logged == true){
										data[e].borderColor = categoryArray[j].color;
									}
								}
							}
						}
						calendarArray[i].category = categoryArray[j];
						break;
					}
				}	
				break;
			}
		}
	}	

	this.getTestCalendars = function(){
		return calendarArray;
	}

	this.setCalendars = function(calendars){
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
				data[index].start = startDate;
				data[index].end = endDate;
				
				data[index].updated = Date.now();

				var currentTime = Date.now();
        		var eventEndTime = Date.parse(data[index].end);
				if (currentTime > eventEndTime) {
					if(data[index].autoReport==true){
                		data[index].logged = true;
                		data[index].borderColor = data[index].color;
                	}
                	else{
                		data[index].logged = false;
            			data[index].borderColor = 'black';
                	}
        		}
        		else {
            		data[index].logged = false;
            		data[index].borderColor = 'black';
        		}

        		this.autoReportAll();
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
					
					this.changeCategoryToUndefined(category);
					categoryArray.splice(index, 1);
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
				data[i].autoReport = categoryArray[0].autoReport;
			}
		}

		for (j in calendarArray) {
			if (calendarArray[j].category.name == category) {
				calendarArray[j].category = categoryArray[0];
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
				if (data[i].logged == true){
					data[i].borderColor = category.color;
				}
				
			}
		}
	}

	this.changeColorCalendar = function(category) {
		for (i in calendarArray) {
			if (calendarArray[i].category.name == category.name) {
				calendarArray[i].category.color = category.color;
			}
		}
	}


	//var categoryArray = [new CategoryClass("Undefined", true, this.colorsWithoutDublett(null)), new CategoryClass("KTH", true, this.colorsWithoutDublett(null)), new CategoryClass("Work", true, this.colorsWithoutDublett(null)), new CategoryClass("Other", true, this.colorsWithoutDublett(null))];	//the real list of categories


	/*****Eventclass **/
	// The attributes are: id, created, updated, title, start, end, category, logged, autoReport, color, textColor, hidden, intern, logged, borderColor
	var EventClass = function(current, category, logged, dataList, calendarId){
	//creates objects with the attributes we want, current is a object we want to copy most from
		this.id=current.id;

		this.created=current.created;	
		this.updated=current.updated;
		this.title=current.summary;

		this.start=current.start;
		this.end=current.end;
		this.calendarId = calendarId;
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

		if (this.logged==false){	//if not logged we have a black border
			this.borderColor='black'; 
		}
		else{
			this.borderColor=this.color;
		}
			
		return this;
	};



	this.addNewEvent = function(name, start, end, category){
		
		current = {
		   "kind": "calendar#event",
		   "id": this.createID(),
		   "created": Date.now(),	
		   "updated": Date.now(),	
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

			for (i in data) {
				if (data[i]._id == id) {
					bool = false;
				}
			}

			if (bool == true) {
				eventObject._id = id;
				break;
			}
			id++;
		}
		data.push(eventObject);
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


	var iterateData = this.iterateData = function(testData, calendar){
		var iteratedData = [];

		for(index in testData){
			var current = testData[index];
			randNum = Math.floor((Math.random() * categoryArray.length));
			end = current.end.dateTime;
			current.end = end;
			start = current.start.dateTime;
			current.start = start;

			var eventObject = new EventClass(current, calendar.category, false, iteratedData, calendar.id);
			iteratedData.push(eventObject);
			data.push(eventObject);
		}
		//data.push(iteratedData);
	
		autoReportAll();
		//return data;
	};


	/************ AUTO REPORT *************/

	// auto reports events that has already happen if auto report is set to true
	var autoReportAll = this.autoReportAll = function() {
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

	// calculates duration depedning on start and end time of events
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

		for (k = 0; k < 6; k++) {		// creates a list with the dates
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

	// returns a list for week pie chart
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



	// returns a list for week overview statistics
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

	// returns a list for week total statistics
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

		if (year % 4 == 0) {		// if leap year
			daysInMonth[1] = 29;
		}
		
		startDate = new Date (year, month+whichMonth, 1, 0, 0, 0, 0);
		startMs = startDate.getTime();
		endMs = startMs;

		newMonth = (month+whichMonth)%12;

		if (newMonth < 0) {			// 'modulo' for negative numbers
			newMonth = 12+newMonth;
		}	

		for	(k = 1; k < daysInMonth[newMonth]; k++) {	// sets the right end time
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

		if (startDate.getFullYear() % 4 == 0) {		// if leap year
			daysInMonth[1] = 29;
		}
		
		newMonth = month%12;

		if (newMonth < 0) {			// 'modulo' for negative numbers
			newMonth = 12+newMonth;
		}	

		for	(k = 0; k < daysInMonth[newMonth]-1; k++) {		// creates a list with all the dates
			n = parseInt(k)+1;
			ms = n * 86400000;
			date = new Date(startMs + ms);
			dateList.push(date.toDateString());
		}

		for (i in dateList) {
			sum = 0;
			for (j in data) {			// for every event
				if (data[j].logged == true && data[j].category == category) {	// if logged and right category

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

	// returns a list of objects with categories and amount of time spent per category for one month
	this.statPieMonth = function(whichMonth) {
		daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

		now = new Date();
		year = now.getFullYear();

		if (year % 4 == 0) {		// if leap year
			daysInMonth[1] = 29;
		}

		month = now.getMonth();
		startDate = new Date (year, month+whichMonth, 1, 0, 0, 0, 0);
		startMs = startDate.getTime();
		endMs = startMs;

		newMonth = (month+whichMonth)%12;
		if (newMonth < 0) {				// 'modulo' for negative numbers
			newMonth = 12+newMonth;
		}	

		for	(k = 1; k < daysInMonth[newMonth]; k++) {	// sets the right end time
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
	// returns a list for year statistics
	this.statYearOverview = function (whichYear) {
		objList = [];
		daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];

		now = new Date();
		year = now.getFullYear();

		if (year % 4 == 0) {		// if leap year
			daysInMonth[1] = 29;
		}

		for (index in categoryArray) {
			dataList = [];
			for (j = 0; j < 12; j++) {

				startDate = new Date(year + whichYear, j, 1, 0, 0, 0, 0)
				startMs = startDate.getTime();
				endMs = startMs;

				for	(k = 1; k < daysInMonth[j]; k++) {	// sets the right end time
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
	
	this.setEventData = function(events){

		data = events;
		//autoReportAll();
	}

	this.getSyncedCalendars = function(){
		var toSync = [];
		for(i in calendarArray){
			cal = calendarArray[i];
			if(cal.sync){
				toSync.push(cal);
			}
		}
		return toSync;
	}

	this.addCalendar = function(calendar){
		//adds calendar from google-response - defaults to sync and no category
		calendarArray.push(this.createCalendar(calendar.id, calendar.summary, categoryArray[0], true));
	}

	return this;

});

