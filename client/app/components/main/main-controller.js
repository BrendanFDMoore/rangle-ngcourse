'use strict';

angular.module('ngcourse')

.controller('MainCtrl', function($scope, $log, $window) {
  $scope.username = 'alice';  
  $scope.isAuthenticated = false;

  $scope.login = function() {
    $scope.isAuthenticated = true;
  };

  $scope.messageChild = function() {
    $scope.$broadcast('hello.child', {fruit: 'peaches'});
  };

  $scope.$on('hello.parent', function(event, payload) {
    $window.alert(payload.animal);
  });
})
.run(function($log) {
  $log.info('MainCtrl ready!');
});