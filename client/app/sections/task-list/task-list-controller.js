'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http, $filter, users, tasks, router) {

  var vm = this;

  vm.username = '';
  users.whenAuthenticated()
    .then(function(){
       vm.username = users.getUsername();
    });

  vm.owner = '';
  vm.description = '';
  vm.tasks = [];  

  tasks.getMyTasks()
    .then(function(tasks) {
      $log.info(tasks);
      vm.tasks = tasks;
      tasks.forEach(function(task){
        task.can = {};
        task.can.edit = true;
        console.log(task);
      });
    })
    .then(null, $log.error);

  /*vm.addTask = function() {
    vm.tasks.push({owner:'alice',description:'Some new task...'});
  };*/

  vm.addTask = router.goToAddTask;

  vm.editTask = router.goToTask;

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
    //return name;
    return users.getUserDisplayName(name);
    /*return users.getUserDisplayName(name)
      .then(function(displayName){
        return displayName;
      })
      .catch(console.log.bind(console));*/
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});