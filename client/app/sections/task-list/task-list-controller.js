'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http, $filter, users, tasks) {

  var vm = this;

  vm.tasks = [];  

  tasks.getMyTasks()
    .then(function(tasks) {
      $log.info(tasks);
      vm.tasks = tasks;
    })
    .then(null, $log.error);

  vm.addTask = function() {
    vm.tasks.push({owner:'alice',description:'Some new task...'});
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});