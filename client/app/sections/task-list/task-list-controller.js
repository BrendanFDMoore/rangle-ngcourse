'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $http) {

  var vm = this;

  vm.tasks = [];

  $http.get('http://ngcourse.herokuapp.com/api/v1/tasks')
    .success(function(data, status) {
      $log.info(data);
      vm.tasks = data;
    })
    .error(function(data, status) {
      $log.error(status, data);
    });

  vm.addTask = function() {
    vm.tasks.push({owner:'alice',description:'Some new task...'})
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});