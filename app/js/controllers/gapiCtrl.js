timeTrackerApp.controller('gapiCtrl', function ($scope, GAPI) {
    //$scope.videos = Youtube.search({ part: 'snippet', q: 'Search terms' });

    $scope.authorize = function () {
      GAPI.init(); 
    }

    $scope.videos = "";
});