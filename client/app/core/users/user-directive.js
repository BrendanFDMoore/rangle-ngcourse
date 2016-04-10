'use strict';

angular.module('ngcourse')
.controller('NgcUserDirectiveCtrl', function (users) {
  var vm = this;
  users.whenAuthenticated()
    .then(function (name){
      vm.userDisplayName = name;
      vm.twoWayBind = "I got authed!";
      vm.eventHandler();
      //var userData = users.getUser(vm.username);
    });

})
.directive('ngcUser', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      usernameAlt: '@usernameAlt',
      twoWayBind: '=twoWayBind',
      eventHandler: '&eventHandler'
    },
    templateUrl: '/app/components/users/user.html',
    controller: 'NgcUserDirectiveCtrl',
    controllerAs:'ngcUserCtrl',
    bindToController: true
  };
});