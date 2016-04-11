angular.module('ngcourse.router', [
    'ui.router'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(false);

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'MainCtrl as main',
        templateUrl: '/app/components/main/main.html'
      })
      .state('tasks', {
        url: '/tasks',
        views: {
          'actionArea@tasks': {
            template: ' <button ng-click="taskList.addTask()">Add task</button> '
          },
          '': {
            controller: 'TaskListCtrl as taskList',
            templateUrl: '/app/sections/task-list/task-list.html'
          }
        }
      })
      .state('tasks.details', {
        url: '/{_id:[0-9a-fA-F]{24}}',

        views: {
          'actionArea@tasks': {
            controller: 'TaskEditCtrl as taskEdit',
            templateUrl: '/app/sections/task-edit/task-edit.html'
          }
        }
      })
      .state('tasks.add', {
        url: '/add',

        views: {
          'actionArea@tasks': {
            controller: 'TaskAddCtrl as taskAdd',
            templateUrl: '/app/sections/task-add/task-add.html'
          }
        }
      });
      /*.state('account', {
        url: '/my-account',
        template: 'my account',
        resolve: {
          greeting: function($timeout) {
            return $timeout(function() {
              return 'Hello';
            }, 3000);
          }
        }
      })
      .state('tasksDetailById', {
        url: '/tasks/{_id}',
        template: 'task details with id'
      })
      .state('tasksDetailByRegex', {
        url: '/tasks/{_id:[A-Za-z0-9-_]{0,}}',
        template: 'task details with regex'
      });*/
  })
  .factory('router', function($log, $state, $stateParams) {
    var service = {};

    service.goToTask = function(taskId) {
      $state.go('tasks.details', {
        _id: taskId
      });
    };

    service.getTaskId = function() {
      return $stateParams._id;
    };

    service.goToAddTask = function () {
      $state.go('tasks.add');
    };

    service.goToTaskList = function () {
      $state.go('tasks', {}, {
        reload: true
      });
    };

    // Updates a state param without triggering a reload.
    function quietlyUpdateParam(key, value) {
      $state.params[key] = value;
      $stateParams[key] = value;
      $state.$current.params[key] = value;
    }

    return service;
  });
