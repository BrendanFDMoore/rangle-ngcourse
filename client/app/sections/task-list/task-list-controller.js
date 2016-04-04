'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($scope, $log) {
  $scope.numberOfTasks = 0;
  
  $scope.addTask = function() {
    $scope.numberOfTasks += 1;
  };
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});