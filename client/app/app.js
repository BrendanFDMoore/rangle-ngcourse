'use strict';

angular.module('ngcourse', ['ngcourse.users'])
.run(function($log) {
  $log.info('All ready!');
});