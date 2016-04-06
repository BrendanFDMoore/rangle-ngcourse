'use strict';

angular.module('ngcourse')

.controller('MainCtrl', function($log, $http, users) {
  var vm = this;
  vm.isAuthenticated = false;
  vm.login = function(username, password) {
    vm.isAuthenticated = true;
    vm.username = username;
    vm.password = password;
    users.setUsername(vm.username);
  };

})
.run(function($log) {
  $log.info('MainCtrl ready!');
});