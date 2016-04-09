'use strict';

angular.module('ngcourse.users', ['ngcourse.server'])
.factory('users', function($q, server) {
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

  var userPromise;
  service.getUsers = function () {
    if (userPromise) return userPromise.promise;
    userPromise = $q.defer();
    service.whenAuthenticated()
      .then(function(data){
        server.get('/api/v1/users')
          .then(function(users){
            userPromise.resolve(users);
          })
          .then(null,function(msg){
            $log.error(msg);
            userPromise.reject(msg);
          });
      })
      .then(null,function(){
        $log.error(msg);
        userPromise.reject(msg);
      });

    return userPromise.promise;
  };

  return service;
});