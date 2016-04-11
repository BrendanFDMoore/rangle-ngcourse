'use strict';

angular.module('ngcourse.main-ctrl', [
  'ngcourse.users',
  'koast'
])
.controller('MainCtrl', function($log, $state, users, koast) {
  var vm = this;
  vm.twowaytest = 'Not authed yet...';
  vm.error = null;
  vm.signalCommsSuccess = function(){
    console.log('event binding success');
  };

  vm.user = koast.user;

  koast.user.whenAuthenticated()
    .then(function() {
      return users.whenReady();
    })
    .then(function() {
      console.log(koast.user.data.username);
      vm.userDisplayName = users.getUserDisplayName(koast.user.data.username);
      console.log(vm.userDisplayName);
    })
    .then(null, $log.error);

  function showLoginError(errorMessage) {
    vm.errorMessage = 'Login failed.';
    $log.error(errorMessage);
  }

  vm.login = function (form) {
    koast.user.loginLocal(form)
      .then(function(){
        $state.go('tasks');
      })
      .then(null, showLoginError);
  };
  vm.logout = function () {
    koast.user.logout()
      .then(null, $log.error);
  };

  
})
.run(function($log) {
  $log.info('MainCtrl ready!');
});