'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http, $filter, users, tasks, router) {

  var vm = this;
  vm.tasks = [];  
  vm.addTask = router.goToAddTask;
  vm.editTask = router.goToTask;

  vm.username = '';
  users.whenReady()
    .then(function(){
       vm.username = users.getUsername();
    })
    .then(null, $log.error);

  // vm.owner = '';
  // vm.description = '';
  

  tasks.getTasks()
    .then(function (tasks) {
      console.log(tasks);
      return users.whenReady()
        .then(function () {
          vm.tasks = tasks;
        });
    })
    .then(null, $log.error);

  /*vm.addTask = function() {
    vm.tasks.push({owner:'alice',description:'Some new task...'});
  };*/

  vm.getUserDisplayName = users.getUserDisplayName;
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});