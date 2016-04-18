//model for auth
timeTrackerApp.factory("DataHandler", ["$firebaseArray", function($firebaseArray){
	this.userId = undefined;
	this.data = undefined;
	return this;

}]);

