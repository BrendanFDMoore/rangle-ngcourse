'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http, $filter, users, tasks) {

  var vm = this;

  vm.owner = '';
  vm.description = '';
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

  vm.createTask = function() {
    var newTask = {
      owner:vm.owner,
      description:vm.description
    };
    $log.info(newTask);
    tasks.createTask(newTask)
      .then(function(tasks){
        vm.owner = '';
        vm.description = '';
        vm.tasks = tasks;
      })
      .then(null, $log.error);
  };
  vm.getUserDisplayName = function(name){
    return name;
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});