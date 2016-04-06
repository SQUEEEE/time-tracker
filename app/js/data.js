//test model for the real data
timeTrackerApp.factory("Data", ["$firebaseArray", function($firebaseArray){
	var ref = new Firebase("https://time-trackertest.firebaseio.com/data");
	
	return $firebaseArray(ref);


}]);
