'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $window) {
  var vm = this;

  vm.numberOfTasks = 0;
  
  vm.addTask = function() {
    vm.numberOfTasks += 1;
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});