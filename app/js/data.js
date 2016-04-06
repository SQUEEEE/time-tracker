//test model for the real data
timeTrackerApp.factory("Data", ["$firebaseObject", function($firebaseObject){
	
	var Data = $firebaseObject.$extend({
		getThings: function(){
			console.log("Data extended function");
			return "mjau";
		}
	});

	return function(){
		var ref = new Firebase("https://time-trackertest.firebaseio.com/data");
	
		return new Data(ref);
	}

}]);


/* old things

timeTrackerApp.factory("Data", ["$firebaseArray", function($firebaseArray){
	var ref = new Firebase("https://time-trackertest.firebaseio.com/data");
	
	return $firebaseArray(ref);


}]);

*/