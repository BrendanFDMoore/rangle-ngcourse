'use strict';

angular.module('ngcourse', [
  'ngcourse.users',
  'ngcourse.tasks',
  'ngcourse.server',
  'ngcourse.router'
])
.run(function($log) {
  $log.info('All ready!');
});