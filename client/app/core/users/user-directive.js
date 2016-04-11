'use strict';

angular.module('ngcourse')
.controller('NgcUserDirectiveCtrl', function (users) {
  var vm = this;
  vm.username = null;
  vm.userData = null;
  //vm.userData = users.getUser(vm.username);
  users.whenAuthenticated()
    .then(function (name){
      vm.username = name;
      vm.userDisplayName = name;
      vm.twoWayBind = "I got authed!";
      vm.eventHandler();
      users.getUser(vm.username)
        .then(function(data){
          //console.log(data);
          vm.userData = data;
        });
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