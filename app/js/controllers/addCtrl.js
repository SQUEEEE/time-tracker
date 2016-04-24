

timeTrackerApp.controller('AddCtrl', function($scope, TimeTracker, currentAuth) {
	
	$scope.categories = TimeTracker.getCategories();

	$scope.timerRunning = false;	// bool if timer is running
	$scope.timeStarted = false;		// bool if timer has ever been started/only paused not cleared

	//lastInput = [0,0,0];
	//console.log(currentAuth);


	$scope.selectedDuration = {hour:0, minute:0, second:0};
	//create variables for today
	var today = new Date();	
	$scope.selectedDate = {day:today.getDate(), month:today.getMonth()+1, year:today.getFullYear()}; //January is 0!
	$scope.startTime = {startHour:today.getHours(), startMinute:today.getMinutes()};

	$scope.user = currentAuth.google.displayName;
	$scope.category = $scope.categories[0];
	$scope.name = {title:""};

	//for the error handling
	$scope.pressButton = true;
	$scope.duration = false;
	$scope.date = false;



	//to make the errors work
	$scope.master = {};
	$scope.update = function(user) {
      $scope.master = angular.copy(user);
    };
    $scope.reset = function(form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      $scope.user = angular.copy($scope.master);
    };
    $scope.reset();


	$scope.getNumberOfDays = function(){	//returns number of days in the month we are right now
		var month = $scope.selectedDate.month;		//to make it easier to refer to 
		if(month==2){
			if($scope.selectedDate.year%4==0){
				return 29;
			}
			else{
				return 28;
			}
		}
		else if(month%2==1){
			return 31;
		}
		else{
			return 30;
		}
	}


//ALL THE ERROR HANDLING FUNCTIONS
	

	$scope.checkDuration = function(){	//checks validity for the duration
		if($scope.selectedDuration.hour>=0 && $scope.selectedDuration.minute>=0 && $scope.selectedDuration.second>=0){
			if($scope.selectedDuration.hour>0 || $scope.selectedDuration.minute>0 || $scope.selectedDuration.second>0){
				$scope.duration = true;
			}
			else{
				$scope.duration = false;
			}
		}
		else{
			$scope.duration = false;
		}

	}

	$scope.checkDate = function(){	//checks validity for the date
		if($scope.selectedDate.year>=2000 && $scope.selectedDate.year<2200 && $scope.selectedDate.month>0 && $scope.selectedDate.month<=12 && $scope.selectedDate.day>0 && $scope.selectedDate.day<=$scope.getNumberOfDays()){
			$scope.date = true;
		}
		else{
			$scope.date = false;
		}
	}

	$scope.checkStart = function(){	//checks validity for the starttime
		if($scope.startTime.startHour>=0 && $scope.startTime.startHour<24 && $scope.startTime.startMinute>=0 && $scope.startTime.startMinute<60){
			$scope.start = true;
		}
    	else{
    		$scope.start = false;
    	}
	}


    $scope.checkEverything = function(){	//controlls everything is right in the form
    	$scope.checkDuration();
    	$scope.checkDate();
    	$scope.checkStart();
    	if($scope.duration && $scope.date && $scope.start && $scope.name.title.length>0 && $scope.name.title!=null){
    		$scope.pressButton = true;
    	}
    	else{
    		$scope.pressButton = false;
    	}
    	
    }

   
   // $scope.checkEverything();	//creates start values


	$scope.setTimer = function(_hour,_minute,_second){
		$scope.selectedDuration.hour = $scope.hours;
		$scope.selectedDuration.minute = $scope.min;
		$scope.selectedDuration.second = $scope.sec;
		$scope.checkEverything();
	}
	
	
		// selecting category in list
	$scope.selectCategory = function(selected) {
        for (index in $scope.categories) {
            if (selected == $scope.categories[index].name) { 
                $scope.category = selected;
            }
        }
    }

	// saves the timers time when it stops
	$scope.$on('timer-stopped', function (event, data){
		$scope.hours = data.hours;
		$scope.min = data.minutes;
		$scope.sec = data.seconds;
		$scope.millis = data.millis;
      //  console.log('Timer Stopped - data = ', data);
    });

	// starts the timer
	$scope.startTimer = function() {
		if (!($scope.timerRunning) && !$scope.timeStarted) {
			$scope.$broadcast('timer-start');
			$scope.timerRunning = true;
			$scope.timeStarted = true;
		}
		else if (!($scope.timerRunning) && $scope.timeStarted) {
			$scope.$broadcast('timer-resume');
			$scope.timerRunning = true;
			$scope.timeStarted = true;
		}
	}

	// pausing the timer
	$scope.pauseTimer = function() {
		$scope.$broadcast('timer-stop');
		$scope.timerRunning = false;	
	}

	// resets the timer
	$scope.resetTimer = function() {
		$scope.$broadcast('timer-reset');
		$scope.timerRunning = false;
		$scope.timeStarted = false;	
	}

	//adds a new event by calling addnewevent in the model with the times from the form
	$scope.addNewEvent = function() {
		$scope.checkEverything();
		if($scope.pressButton){
			start = new Date($scope.selectedDate.year, $scope.selectedDate.month-1, $scope.selectedDate.day, $scope.startTime.startHour, $scope.startTime.startMinute);
			startMilli = start.getTime();

			milliTotal = ($scope.hour*60*60*1000) + ($scope.minute*60*1000) + ($scope.second*1000);
			end = new Date(startMilli+milliTotal);
		
			$scope.modalEvent = TimeTracker.addNewEvent($scope.name.title, start, end, $scope.category);	
	        $('#popUpModal').modal();                     //starts the modal box

	        return false;
    	}
    	else{
    		return true;
    	}	
    
	}



});
