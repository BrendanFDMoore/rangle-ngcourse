  describe('tasks service', function () {
    // Load the angular module. Having smaller modules helps here.
    beforeEach(module('ngcourse.tasks'));

    beforeEach(module(function($provide){

      // Mock 'users'.
      $provide.service('users', function() {
        var service = {};
        var data = [{
          description: 'Mow the lawn'
        }];

        service.getUsername = function () {
          return 'alice';
          // or try this: Q.reject(new Error('Some Error'));
        };
        return service;
      });


      // Mock 'server'.
      $provide.service('server', function() {
        var service = {};
        var data = [{
          description: 'Mow the lawn'
        }];

        service.get = function () {
          return Q.when(data);
          // or try this: Q.reject(new Error('Some Error'));
        };
        return service;
      });
      // Mock $q.
      $provide.service('$q', function() {
        return Q;
      });
    }));



    it('should get tasks', function() {
      var tasks = getService('tasks');
      return tasks.getTasks()
        .then(function (receivedTasks) {
          expect(receivedTasks.length).to.equal(1);
        });
    });
  });