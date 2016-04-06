'use strict';

angular.module('ngcourse')

.controller('TaskListCtrl', function($scope, $log, $window) {
  $scope.numberOfTasks = 0;
  
  $scope.addTask = function() {
    $scope.numberOfTasks += 1;
  };

  $scope.messageParent = function() {
    $scope.$emit('hello.parent', {animal: 'turtle'})
  };

  $scope.$on('hello.child', function(event, payload) {
    $window.alert(payload.fruit);
  });
})
.run(function($log) {
  $log.info('TaskListCtrl ready!');
});