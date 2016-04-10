'use strict';

angular.module('ngcourse.users', ['ngcourse.server'])
.factory('users', function($q, $filter, server) {
  var service = {};
  var validusers = [];

  service.userAuthPromise = $q.defer();

  service.username = '';
  service.setUsername = function (name) {
    service.userIsValid(name)
      .then(function (valid){
        service.username = name;
        service.userAuthPromise.resolve(service.username);
      })
      .then(null, function(err){
        service.username = 'NOT A VALID USER';
        service.userAuthPromise.reject();
      });
  };

  service.getUsername = function () {
    return service.username;
  };

  service.whenAuthenticated = function () {
    return service.userAuthPromise.promise;
  };

  service.filterUsers = function(allusers, usermask){
    return $filter('filter')(allusers, usermask, true);
  };

  var userValidPromise;
  service.userIsValid = function(checkname){
    console.log('real users userIsValid')
    //console.log('service.userIsValid: ',allusers,checkname);
    if (userValidPromise) return userValidPromise.promise;

    userValidPromise = $q.defer();

    return service.getUsers()
      .then(function(){
        if (service.filterUsers(validusers,{username:checkname}).length>0)
          userValidPromise.resolve(true);
        else
          userValidPromise.reject(false);
      })
      .then(null,function(err){
        userValidPromise.reject(false);
      });
  }

  var getUsersPromise;
  service.getUsers = function () {
    console.log('real users getUsers')
    if (getUsersPromise) return getUsersPromise.promise;
    getUsersPromise = $q.defer();
    //service.whenAuthenticated()
    //  .then(function(data){
    server.get('/api/v1/users')
      .then(function(users){
        validusers = users;
        getUsersPromise.resolve(validusers);
      })
      .then(null,function(msg){
        $log.error(msg);
        validusers = [];
        getUsersPromise.reject(msg);
      });
    //  })
    //   .then(null,function(){
    //     $log.error(msg);
    //     userPromise.reject(msg);
    //   });

    return getUsersPromise.promise;
  };

  return service;
});