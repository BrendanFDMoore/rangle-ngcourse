'use strict';

angular.module('ngcourse', ['ngcourse.users', 'ngcourse.tasks', 'ngcourse.server'])
.run(function($log) {
  $log.info('All ready!');
});