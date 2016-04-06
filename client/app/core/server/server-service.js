angular.module('ngcourse.server', [])

  .factory('server', function($http) {
    var service = {};

    var baseUrl = 'http://ngcourse.herokuapp.com';

    service.get = function (path) {
      return $http.get(baseUrl + path)
        .then(function(response) {
          return response.data;
        });
    };

    return service;
  });
