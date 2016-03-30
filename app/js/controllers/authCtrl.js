
//model for auth
timeTrackerApp.factory("Auth", ["$firebaseAuth", 
	function($firebaseAuth){
		var ref = new Firebase("https://time-trackertest.firebaseio.com/data");
		return $firebaseAuth(ref);

	}]);


timeTrackerApp.controller("authCtrl", function($scope, Auth){

	$scope.auth = Auth;

	$scope.login = function(){
		Auth.$authWithOAuthPopup("google").then(function(authData){
			console.log("Logged in as:", authData.uid);

		}).catch(function(error){
			console.log("Authentication failed:", error);
		});
	}

	$scope.auth.$onAuth(function(authData){
		$scope.authData = authData;
	})


	
})