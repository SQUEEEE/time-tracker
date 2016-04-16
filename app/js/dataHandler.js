//model for auth
timeTrackerApp.factory("DataHandler", ["$firebaseArray", function($firebaseArray){
	var ref = new Firebase("https://time-trackertest.firebaseio.com/");
	return $firebaseArray(ref);

}]);

