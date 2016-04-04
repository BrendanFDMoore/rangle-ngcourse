'use strict';

angular.module('ngcourse')

.controller('MainCtrl', function($scope, $log) {
  $scope.username = 'alice';  
  $scope.isAuthenticated = false;

  $scope.login = function() {
    $scope.isAuthenticated = true;
  };

})
.run(function($log) {
  $log.info('MainCtrl ready!');
});