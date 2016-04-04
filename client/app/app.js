'use strict';

angular.module('ngcourse', [])
.controller('MainCtrl', function($scope) {
  $scope.username = 'alice';
  $scope.numberOfTasks = 0;
  $scope.addTask = function() {
    $scope.numberOfTasks += 1;
  };
})
.run(function($log) {
  $log.info('All ready!');
});