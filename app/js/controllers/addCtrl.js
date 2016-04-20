timeTrackerApp.controller('AddCtrl', function($scope, TimeTracker, currentAuth) {
	
	$scope.categories = TimeTracker.getCategories();

	$scope.timerRunning = false;	// bool if timer is running
	$scope.timeStarted = false;		// bool if timer has ever been started/only paused not cleared
	$scope.hour = 0;
	$scope.minute = 0;
	$scope.second = 0;

	//lastInput = [0,0,0];
	console.log(currentAuth);

	//create variables for today
	var today = new Date();	
	$scope.day = today.getDate();
	$scope.month = today.getMonth()+1; //January is 0!
	$scope.year = today.getFullYear();
	$scope.startHour = today.getHours();
	$scope.startMinute = today.getMinutes();

	$scope.user = currentAuth.google.displayName;
	$scope.category = $scope.categories[0];
	$scope.name = "";

	//for the error handling
	$scope.pressButton = false;
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
		var month = $scope.month;		//to make it easier to refer to 
		if(month==2){
			if($scope.year%4==0){
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
		if($scope.hour>=0 && $scope.minute>=0 && $scope.second>=0){
			if($scope.hour>0 || $scope.minute>0 || $scope.second>0){
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
		if($scope.year>=2000 && $scope.month>0 && $scope.month<=12 && $scope.day>0 && $scope.day<=$scope.getNumberOfDays()){
			$scope.date = true;
		}
		else{
			$scope.date = false;
		}
	}

	$scope.checkStart = function(){	//checks validity for the starttime
		if($scope.startHour>=0 && $scope.startHour<24 && $scope.startMinute>=0 && $scope.startMinute<60){
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
    	if($scope.duration && $scope.date && $scope.start && $scope.name.length>0){
    		$scope.pressButton = true;
    	}
    	else{
    		$scope.pressButton = false;
    	}
    	
    }

   
    $scope.checkEverything();	//creates start values


	$scope.setTimer = function(_hour,_minute,_second){
		$scope.hour = $scope.hours;
		$scope.minute = $scope.min;
		$scope.second = $scope.sec;
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
        console.log('Timer Stopped - data = ', data);
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
		var start = new Date($scope.year, $scope.month-1, $scope.day, $scope.startHour, $scope.startMinute);
		var startMilli = start.getTime();

		var milliTotal = ($scope.hour*60*60*1000) + ($scope.minute*60*1000) + ($scope.second*1000);
		var end = new Date(startMilli+milliTotal);
	
		$scope.modalEvent = TimeTracker.addNewEvent($scope.name, start, end, $scope.category);	
		console.log($scope.modalEvent.end.toDateString())
        $('#popUpModal').modal();                     //starts the modal box

        return false;
    
	}



});