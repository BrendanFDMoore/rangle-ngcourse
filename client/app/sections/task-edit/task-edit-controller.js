'use strict';

angular.module('ngcourse')

.controller('TaskEditCtrl', function($log, tasks, $stateParams, router) {

  var vm = this;

  console.log('Loaded TaskEditCtrl >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

  console.log($stateParams._id)
  tasks.getTask($stateParams._id)
    .then(function (response) {
      console.log('response');
      console.log(response);
      if(response.length>0){
        vm.task = response[0];
      }
      else{
        vm.task = null;
      }
    })
    .then(null, $log.error);

  vm.cancel = router.goToTaskList;

  vm.updateTask = function (task) {
    tasks.updateTask(task)
      .then(function () {
        router.goToTaskList();
      })
      .then(null, $log.error);
  };
})
.run(function($log) {
  $log.info('TaskEditCtrl ready!');
});