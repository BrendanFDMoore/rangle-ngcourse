'use strict';

angular.module('ngcourse.tasks', ['ngcourse.users', 'ngcourse.server'])
.factory('tasks', function($log, $filter, $q, server, users) {
  var service = {};

  service.filterTasks = function(alltasks, mask){
    return $filter('filter')(alltasks, mask, true);
  };

  var taskPromise;
  service.getTasks = function () {
    if (taskPromise) return taskPromise.promise;

    taskPromise = $q.defer();
    users.whenAuthenticated()
      .then(function(data){
        //console.log('whenAuthenticated success');
        server.get('/api/v1/tasks')
          .then(function(tasks){
            //console.log('server.get success');
            //console.log(tasks);
            //console.log(taskPromise);
            taskPromise.resolve(tasks);
            //console.log('server.get success done');
          })
          .then(null,function(msg){
            //console.log(msg);
            //console.log('server.get fail');
            $log.error(msg);
            taskPromise.reject(msg);
            //console.log('server.get fail done');
          });
      })
      .then(null,function(msg){
        //console.log('whenAuthenticated fail');
        $log.error(msg);
        taskPromise.reject(msg);
      });

    return taskPromise.promise;
  };

  service.getMyTasks = function () {
    return service.getTasks()
      .then(function(tasks) {
        return service.filterTasks(tasks, {
          owner: users.getUsername() || 'alice'
        });
      });
  };

  service.createTask = function (newTask) {
    console.log('start of service.createTask');
    var deferred = $q.defer();
    if(null == newTask) {
      
      deferred.reject(new Error('null parameter not valid'));
      return deferred.promise;
    }

    if(!newTask.owner || !(newTask.owner.length > 0)){
      
      deferred.reject(new Error('empty owner not valid'));
      return deferred.promise;
    }

    if(!newTask.description || !(newTask.description.length > 0)) {
      
      deferred.reject(new Error('empty description not valid'));
      return deferred.promise;
    } 

    console.log('start of service.createTask');
    users.getUsers()
      .then(function(userList){
        console.log('userList');
        console.log(userList);
        console.log(newTask.owner);
        users.userIsValid(newTask.owner)
          .then(function(valid){
            console.log('users.userIsValid success');
            //data looks valid, so post it
            server.post(newTask)
              .then(function(data){
                console.log('server.post success');
                deferred.resolve(data);
              })
              .then(null,function(msg){
                console.log('server.post fail 1');
                $log.error(msg);
                console.log('server.post fail 2');
                deferred.reject(msg);
              });
          })
          .then(null,function(notvalid){
            console.log('users.userIsValid fail');
            deferred.reject(new Error('task owner not a valid user'));
            //return deferred.promise;
          });
      })
      .then(null, function(msg){
        $log.error('get users error?');
        $log.error(msg);
        deferred.reject(new Error('error fetching user list'));
        //return deferred.promise;
      })
    return deferred.promise;
    
  };

  return service;
});