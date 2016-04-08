'use strict';

angular.module('ngcourse.tasks', ['ngcourse.server'])
.factory('tasks', function($filter, $q, server, users) {
  var service = {};

  service.filterTasks = function(alltasks, mask){
    return $filter('filter')(alltasks, mask, true);
  };

  var taskPromise;
  service.getTasks = function () {
    taskPromise = taskPromise || server.get('/api/v1/tasks');
    return taskPromise;
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

    //data looks valid, so post it
    return server.post(newTask);      
  };

  return service;
});