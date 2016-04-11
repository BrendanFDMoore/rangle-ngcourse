'use strict';

angular.module('ngcourse.users', ['koast'])
.factory('users', function(koast) {
  var service = {};
  var byUserName = {};

  service.user = null;
  service.username = null;
  service.password = null;
  service.error = null;
  var usersPromise = koast.user.whenAuthenticated()
    .then(function () {
      service.username = koast.user.data.username;
      return koast.queryForResources('users')
        .then(function (userArray) {
          service.all = userArray;
          userArray.forEach(function(user) {
            if (user.username) {
              byUserName[user.username] = user;
            }
          });
        });
    });

  service.whenReady = function () {
    return usersPromise;
  };

  service.getUserByUsername = function(username) {
    return byUserName[username];
  };

  service.getUserDisplayName = function (username) {
    var user = service.getUserByUsername(username);
    console.log(user);
    if (!user) {
      return '';
    }

    return user.displayName;
  };  

  service.getUsername = function () {    
    return service.username;
  };

  return service;
});