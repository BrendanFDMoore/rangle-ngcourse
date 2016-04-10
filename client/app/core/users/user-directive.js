'use strict';

angular.module('ngcourse')
.directive('ngcUser',
  function () {
    return {
      restrict: 'E', // vs 'A', 'AE'
      replace: true,
      scope: {}, // vs 'true', 'null'
      templateUrl: '/app/components/users/user.html'
    };
  }
);