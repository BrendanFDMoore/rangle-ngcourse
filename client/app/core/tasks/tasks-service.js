'use strict';

angular.module('ngcourse.tasks', [])
.factory('tasks', function($filter, server, users) {
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
          owner: users.getUsername() ||'alice'
        });
      });
  };

  return service;
});