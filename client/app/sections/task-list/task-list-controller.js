'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http) {

  var vm = this;

  vm.tasks = [];

  vm.filterTasksAsynchronously = function(tks){
    return tks;
  };

  $http.get('http://ngcourse.herokuapp.com/api/v1/tasks')
    .then(function(response) {
      return response.data;
    })
    .then(function(tasks) {
      return vm.filterTasksAsynchronously(tasks);
    })
    .then(function(tasks) {
      $log.info(tasks);
      vm.tasks = tasks;
    })
    .then(null, function(error) {
      $log.error(error);
    });

  vm.addTask = function() {
    vm.tasks.push({owner:'alice',description:'Some new task...'})
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});