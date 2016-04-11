'use strict';

angular.module('ngcourse.users', ['ngcourse.server'])
.factory('users', function($q, $filter, server) {
  var service = {};
  var validusers = [];

  var userValidPromise;
  service.userAuthPromise = $q.defer();

  service.user = null;
  service.username = null;
  service.password = null;
  service.error = null;
  service.login = function(inUser, inPass){
    service.username = inUser;
    service.password = inPass;
    return service.userIsValid(service.username)
      .then(function (data){
        //console.log(service.username);
        //console.log('real userIsValid success');
        //console.log(data);
        service.error = null;
        service.user = service.filterUsers(validusers,{username:service.username})[0];
        service.userAuthPromise.resolve(service.username);
        return true;
      }, function(msg){
        //console.log(service.username);
        //console.log('real userIsValid fail');
        //console.log(msg);
        service.error = 'NOT A VALID USER';
        //service.userAuthPromise.reject(service.error);
        userValidPromise = null;
        throw new Error(service.error);
      });
      //.catch(console.log.bind(console));
  };

  service.getUser = function(username){
    return service.whenAuthenticated()
      .then(function(){
        var userObj=service.filterUsers(validusers,{username:service.username})[0];
        //console.log('userObj');
        //console.log(userObj);
        return userObj;
      })
      .then(null, function(msg){
        return {};
      });
  };

  service.getUserDisplayName = function(username){
    //console.log('service.getUserDisplayName ');
    //console.log(validusers);
    //console.log(username);
    var filteredUsers = service.filterUsers(validusers,{username:username});
    if (filteredUsers.length>0){
      var dn = filteredUsers[0].displayName;
      //console.log(dn);
      return dn;
    }
    else {
      return '';
    }
  };

  service.setUsername = function (name) {
    service.userIsValid(name)
      .then(function (data){
        //console.log('real userIsValid success');
        //console.log(data);
        service.username = name;
        service.userAuthPromise.resolve(service.username);
      }, function(msg){
        //console.log('real userIsValid fail');
        //console.log(msg);
        service.username = 'NOT A VALID USER';
        service.userAuthPromise.reject();
      });
      //.catch(console.log.bind(console));
  };

  service.getUsername = function () {
    return service.username;
  };

  service.whenAuthenticated = function () {
    return service.userAuthPromise.promise;
  };

  service.filterUsers = function(allusers, usermask){
    //console.log('filterUsers');
    //console.log($filter('filter')(allusers, usermask, true));
    return $filter('filter')(allusers, usermask, true);
  };

  
  service.userIsValid = function(checkname){
    //console.log('real users userIsValid');
    //console.log('service.userIsValid: ',allusers,checkname);
    if (userValidPromise) {return userValidPromise.promise;}

    userValidPromise = $q.defer();

    service.getUsers()
      .then(function(){
        //console.log('real getUsers check if userIsValid');
        var filtered = service.filterUsers(validusers,{username:checkname});
        //console.log('filtered');
        //console.log(filtered);
        if (filtered.length>0){
          //console.log('filterUsers not length 0');
          userValidPromise.resolve(true);
          return true;
        }
        else {
          //console.log('filterUsers is length 0');
          userValidPromise.reject(false);
          throw new Error('User not valid');
        }
      }, function(err){
        //console.log('real getUsers fail');
        //console.log(err);
        userValidPromise.reject(false);
        throw new Error('getUsers failed');        
      });
      //.catch(console.log.bind(console));

    return userValidPromise.promise;
  };

  var getUsersPromise;
  service.getUsers = function () {
    //console.log('real users getUsers');
    if (getUsersPromise) { 
      return getUsersPromise.promise;
    }
    getUsersPromise = $q.defer();
    //service.whenAuthenticated()
    //  .then(function(data){
    console.log('server.get calling...');
    server.get('/api/v1/users')
      .then(function(users){
        console.log('server.get success');
        console.log(users);
        validusers = users;
        getUsersPromise.resolve(validusers);
        return validusers;
      })
      .then(null,function(msg){
        console.error('server.get fail');
        console.log(msg);
        validusers = [];
        getUsersPromise.reject(msg);
        throw new Error('getUsers failed to fetch users');
      });
      //.catch(console.log.bind(console));
    //  })
    //   .then(null,function(){
    //     $log.error(msg);
    //     userPromise.reject(msg);
    //   });

    return getUsersPromise.promise;
  };

  return service;
});