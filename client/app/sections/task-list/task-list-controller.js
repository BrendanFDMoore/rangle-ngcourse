'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http) {

  var vm = this;

  vm.tasks = [];

  var responsePromise = $http.get('http://ngcourse.herokuapp.com/api/v1/tasks');
  var tasksPromise = responsePromise.then(function(response) {
    return response.data;
  });
  var filteredTasksPromise = tasksPromise.then(function(tasks) {
    //return filterTasksAsynchronously(tasks);
    return tasks;
  });
  var vmUpdatePromise = filteredTasksPromise.then(function(tasks) {
    $log.info(tasks);
    vm.tasks = tasks;
  })
  var errorHandlerPromise = vmUpdatePromise.then(null, function(error) {
    $log.error(error);
  });

  vm.addTask = function() {
    vm.tasks.push({owner:'alice',description:'Some new task...'})
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});