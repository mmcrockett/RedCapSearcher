var app = angular.module('RedcapSearcher', ['ngResource', 'ngCookies']);
app.config(["$httpProvider", function(provider) {
  provider.defaults.headers.common['X-CSRF-Token'] = jQuery('meta[name=csrf-token]').attr('content');
}]);
