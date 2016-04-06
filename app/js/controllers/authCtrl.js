

timeTrackerApp.controller("authCtrl", function($scope, Auth, Data){

	$scope.auth = Auth;
	$scope.data = Data;
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

	$scope.addData = function(){
		Data.$add({test : "hej"});
	}
	
})