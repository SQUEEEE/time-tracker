

timeTrackerApp.controller("authCtrl", function($scope, Auth){

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
	}

	$scope.auth.$onAuth(function(authData){
		$scope.authData = authData;
	})


	
})