//test model for the real data
/*
timeTrackerApp.factory("UserData", ["$firebaseObject", function($firebaseObject){
	console.log("UserData factory");
	var UserData = $firebaseObject.$extend({
		getThings: function(){
			//console.log("Data extended function");
			return "mjau";
		}
	});

	return function(userId){
		var ref = new Firebase("https://time-trackertest.firebaseio.com/").child(userId);
	
		return new UserData(ref);
	}

}]);
*/




timeTrackerApp.factory("Data", ["$firebaseArray", function($firebaseArray){
	console.log("UserData factory");
	
	var ref = new Firebase("https://time-trackertest.firebaseio.com/116512303895961512463");
	
	return $firebaseArray(ref);


}]);

