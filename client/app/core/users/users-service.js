'use strict';

angular.module('ngcourse.users', [])
.factory('users', function($q) {
  var service = {};
  var users = [];

  service.userAuthPromise = $q.defer();

  service.username = '';
  service.setUsername = function (name) {
    service.username = name;
    service.userAuthPromise.resolve(service.username)
  };
  service.getUsername = function () {
    return service.username;
  };

  service.whenAuthenticated = function () {
    return service.userAuthPromise.promise;
  };

  service.getUsers = function () {
    return users;
  };

  return service;
});