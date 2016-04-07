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

        service.get = sinon.spy(function () {
          return Q.when(data);
          // or try this: Q.reject(new Error('Some Error'));
        });
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

    it('should only call server.get once', function() {
      var tasks = getService('tasks');
      var server = getService('server');
      server.get.reset(); // Reset the spy.
      return tasks.getTasks() // Call getTasks the first time.
        .then(function () {
          return tasks.getTasks(); // Call it again.
        })
        .then(function () {
          server.get.should.have.been.calledOnce; // Check the number of calls.
        });
    });
  });