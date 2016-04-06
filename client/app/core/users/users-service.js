'use strict';

angular.module('ngcourse.users', [])
.factory('users', function($http) {
  var service = {};

  service.username = '';
  service.setUsername = function (name) {
    service.username = name;
  };
  service.getUsername = function () {
    return service.username;
  };

  return service;
});