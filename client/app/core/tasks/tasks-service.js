'use strict';

angular.module('ngcourse.tasks', [])
.factory('tasks', function($http, $filter) {
  var service = {};

  service.filterTasks = function(alltasks, mask){
    return $filter('filter')(alltasks, mask, true);;
  };

  service.getTasks = function () {
    return $http.get('http://ngcourse.herokuapp.com/api/v1/tasks')
      .then(function(response) {
        return response.data;
      });
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