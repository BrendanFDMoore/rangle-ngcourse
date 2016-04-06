'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http, $filter, users) {

  var vm = this;

  vm.tasks = [];

  vm.filterTasks = function(alltasks, mask){
    return $filter('filter')(alltasks, mask, true);;
  };

  function getTasks() {
    return $http.get('http://ngcourse.herokuapp.com/api/v1/tasks')
      .then(function(response) {
        return response.data;
      });
  }

  function getMyTasks() {
    return getTasks()
      .then(function(tasks) {
        return vm.filterTasks(tasks, {
          owner: users.getUsername()||'alice'
        });
      });
  }

  getMyTasks()
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