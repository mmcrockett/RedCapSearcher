app.controller('SearchController', ['$scope', '$cookieStore', '$timeout', 'Search', 'filterFilter', function($scope, $cookieStore, $timeout, Search, filter) {
  $scope.NONE    = 0;
  $scope.LOADING = 1;
  $scope.LOADED  = 2;
  $scope.SEARCH  = 3;
  $scope.filter = filter;
  $scope.error  = "";
  $scope.url    = "http://localhost:8100/redcap/api/";
  $scope.token  = "FF0FD3F7D30C6A1B93C25672A5AFC2ED";
  $scope.state  = $scope.NONE;
  $scope.search = "";
  $scope.headers = [];
  $scope.data   = [];

  $scope.verify = function() {
    if ($scope.LOADING != $scope.state) {
      $scope.state = $scope.LOADING;
      Search.query(
      {url: $scope.url, token: $scope.token},
      function(v) {
        $scope.state = $scope.LOADED;
        $scope.error   = "";
        $scope.data = v;
        $timeout(function(){$scope.state = $scope.SEARCH;}, 1500);
        angular.forEach($scope.data[0], function(v, k){
          $scope.headers.push(k);
        });
      },
      function(v) {
        $scope.state = $scope.NONE;
        console.error('!Error: ' + v.data);
        $scope.error = v.data;
      });
    }
  };
}]);
