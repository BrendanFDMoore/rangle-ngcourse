'use strict';

angular.module('ngcourse', [])
.controller('MainCtrl', function($scope, $log) {
  $scope.username = 'alice';
  $scope.numberOfTasks = 0;
  $scope.addTask = function() {
    $log.debug('Current number of tasks:', $scope.numberOfTasks);
    $scope.numberOfTasks += 1;
  };
  $scope.login = function() {
    $scope.isAuthenticated = true;
  };
})
.run(function($log) {
  $log.info('All ready!');
});