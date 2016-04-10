'use strict';

angular.module('ngcourse')

.controller('MainCtrl', function($log, $http, users) {
  var vm = this;
  vm.error = null;
  vm.isAuthenticated = false;
  vm.login = function(username, password) {    
    vm.username = username;
    vm.password = password;
    users.login(vm.username,vm.password)
      .then(function(data){
        vm.error = null;
      })
      .then(null,function(err){
        vm.error = err.message;
      });
  };

  users.whenAuthenticated()
    .then(function(){
      vm.isAuthenticated = true;
      vm.userDisplayName = users.getUsername();
    });

})
.run(function($log) {
  $log.info('MainCtrl ready!');
});