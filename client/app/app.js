'use strict';

angular.module('ngcourse', ['ngcourse.users', 'ngcourse.tasks'])
.run(function($log) {
  $log.info('All ready!');
});