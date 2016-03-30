app.controller("authCtrl", function($scope, $firebaseAuth){
	var ref = new Firebase("https://time-trackertest.firebaseio.com/data");

	
	var auth = $firebaseAuth(ref);

	
	$scope.login = function(){
		auth.$authWithOAuthPopup("google").then(function(authData){
			console.log("Logged in as:", authData.uid);

		}).catch(function(error){
			console.log("Authentication failed:", error);
		});
	}

	
})