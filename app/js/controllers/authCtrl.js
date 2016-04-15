

timeTrackerApp.controller("authCtrl", function($scope, Auth, TimeTracker){

	$scope.auth = Auth;
	console.log("authCtrl loaded");

	$scope.login = function(){
		Auth.$authWithOAuthPopup("google", function(error, authData){
			if(error){
				console.log(error);
			}
			else{
				console.log("Logged in as ", authData.uid);
			}
		}, {
			scope: "calendar.readonly"
		})

		TimeTracker.checkAuth();
		TimeTracker.handleAuthClick();
	}

	$scope.auth.$onAuth(function(authData){
		$scope.authData = authData;
		console.log($scope.authData);
	})
	

})