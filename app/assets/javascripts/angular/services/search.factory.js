app.factory('Search', ['$resource', function($resource) {
  return $resource('/search.json');
}]);
