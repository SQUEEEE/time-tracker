app.controller("authCtrl", function($scope, $firebaseObject){
	var ref = new Firebase("https://time-trackertest.firebaseio.com/data");

	//download the data into a local object
	var syncObject = $firebaseObject(ref);

	//sync the object with a three-way data binding

	syncObject.$bindTo($scope, "data");
})