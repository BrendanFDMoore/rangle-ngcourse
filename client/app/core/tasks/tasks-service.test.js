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



    it('should get tasks', function(done) {
      // Notice that we've specified that our function takes a 'done' argument.
      // This tells Mocha this is an asynchronous test. An asynchronous test will
      // not be considered 'successful' until done() is called without any
      // arguments. If we call done() with an argument the test fails, treating
      // that argument as an error.
      inject(function (tasks) {

        tasks.getTasks()
          // Attach the handler for resolved promise.
          .then(function (tasks) {
            // Assertions thrown here will result to a failed promise downstream.
            expect(tasks.length).to.equal(1);
            // Remember to call done(), otherwise the test will time out (and
            // fail).
            done();
          })
          // Attach the error handler. This is very important and easy to forget.
          .then(null, function(error) {
            done(error); // This can be simplified - see below.
          });
      });
    });
  });