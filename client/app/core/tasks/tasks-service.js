'use strict';

angular.module('ngcourse.tasks', [])
.factory('tasks', function($http, $filter, server) {
  var service = {};

  service.filterTasks = function(alltasks, mask){
    return $filter('filter')(alltasks, mask, true);;
  };

  service.getTasks = function () {
    return server.get('/api/v1/tasks');
  };

  service.getMyTasks = function (username) {
    return service.getTasks()
      .then(function(tasks) {
        return service.filterTasks(tasks, {
          owner: username
        });
      });
  };

  return service;
});