'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($log, $window) {

  var vm = this;

  vm.tasks = [
    {
      owner: 'alice',
      description: 'Build the dog shed.'
    },
    {
      owner: 'bob',
      description: 'Get the milk.'
    },
    {
      owner: 'alice',
      description: 'Fix the door handle.'
    }
  ];

  vm.addTask = function() {
    vm.tasks.push({owner:'alice',description:'Some new task...'})
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});