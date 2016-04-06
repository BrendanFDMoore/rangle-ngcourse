'use strict';

angular.module('ngcourse')

.controller('MainCtrl', function($log, $window) {
  var vm = this;
  vm.username = 'alice';  
  vm.isAuthenticated = false;

  vm.login = function() {
    vm.isAuthenticated = true;
  };

})
.run(function($log) {
  $log.info('MainCtrl ready!');
});