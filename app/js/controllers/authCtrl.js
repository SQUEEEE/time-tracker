timeTrackerApp.controller("authCtrl", function($scope, Auth, TimeTracker, DataLoader, DataHandler){

	if(TimeTracker.getLoadedData() == false){
		DataLoader.loadData();
	}

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

		DataLoader.loadData();

	}

	$scope.auth.$onAuth(function(authData){
		$scope.authData = authData;
	})
	

	$scope.loadData = function(){
		console.log("Loading data!");
      	//DataLoader.checkAuth();
      	//DataLoader.handleAuthClick();
      	//TimeTracker.changeLoadedData();
		DataLoader.loadData();
	}
})