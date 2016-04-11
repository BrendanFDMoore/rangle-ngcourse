'use strict';

angular.module('ngcourse')

.controller('MainCtrl', function($log, $http, $state, users) {
  var vm = this;
  vm.twowaytest = "Not authed yet...";
  vm.error = null;
  vm.isAuthenticated = false;
  vm.login = function(username, password) {    
    vm.username = username;
    vm.password = password;
    users.login(vm.username,vm.password)
      .then(function(data){
        vm.error = null;
        $state.go('tasks');
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
  vm.signalCommsSuccess = function(){
    console.log('event binding success');
  };
})
.run(function($log) {
  $log.info('MainCtrl ready!');
});