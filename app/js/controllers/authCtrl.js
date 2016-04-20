

timeTrackerApp.controller("authCtrl", function($scope, Auth, DataLoader, DataHandler){

	$scope.auth = Auth;
	$scope.data = DataHandler.data;

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

		DataLoader.checkAuth();
		DataLoader.handleAuthClick();

	}

	$scope.auth.$onAuth(function(authData){
		$scope.authData = authData;
	})
	

	$scope.loadData = function(){
		DataLoader.checkAuth();
		DataLoader.handleAuthClick();
	}
})