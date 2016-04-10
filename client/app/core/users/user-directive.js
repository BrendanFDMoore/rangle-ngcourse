'use strict';

angular.module('ngcourse')
.controller('NgcUserDirectiveCtrl', function (users) {
  var vm = this;
  users.whenAuthenticated()
    .then(function (name){
      vm.userDisplayName = name;
      //var userData = users.getUser(vm.username);
    });
})
.directive('ngcUser', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      usernameAlt: '@usernameAlt'
    },
    templateUrl: '/app/components/users/user.html',
    controller: 'NgcUserDirectiveCtrl',
    controllerAs:'ngcUserCtrl',
    bindToController: true
  };
});