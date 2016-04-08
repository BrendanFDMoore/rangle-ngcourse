  describe('tasks service', function () {
    // Load the angular module. Having smaller modules helps here.
    beforeEach(module('ngcourse.tasks'));

    beforeEach(module(function($provide){

      // Mock 'users'.
      $provide.service('users', function() {
        var service = {};
        var data = 'alice';

        service.getUsername = function () {
          return Q.when(data);
          // or try this: Q.reject(new Error('Some Error'));
        };
        return service;
      });


      // Mock 'server'.
      $provide.service('server', function() {
        var service = {};
        var data = [{
          owner: 'bob',
          description: 'Mow the lawn'
        }];

        service.get = sinon.spy(function () {
          return Q.when(data);
          // or try this: Q.reject(new Error('Some Error'));
        });

        service.post = sinon.spy(function (newTask) {
          /*if(null == newTask) return Q.reject(new Error('No task object provided.'));
          if(!newTask.owner || !(newTask.owner.length > 0)) return Q.reject(new Error('Empty owner not valid.'));
          if(!newTask.description || !(newTask.description.length > 0)) return Q.reject(new Error('Empty description not valid.'));*/

          data.push(newTask);

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

    it('should return a promise', function() {
      var tasks = getService('tasks');
      var newTask={
        owner: 'Alice',
        description: 'A newly-created task.'
      };
      return tasks.createTask(newTask)
        .then(function (receivedTasks) {
          expect(receivedTasks.length).to.equal(2);
        });
    });

    it('should return a rejected with message null parameter not valid', function() {
      var tasks = getService('tasks');
      
      return tasks.createTask(null)
        // .then(function (receivedTasks) {
        //   done('test failed because createTask succeeded with null parameter')
        // })
        .fail(function(error){
          console.log(error.message);
          expect(error.message).to.equal('null parameter not valid');
        });
    });

    it('should return a rejected with message empty owner not valid', function() {
      var tasks = getService('tasks');
      var newTask={
        owner: '',
        description: 'A newly-created task.'
      };
      return tasks.createTask(newTask)
        .then(null, function(error){
          console.log(error.message);
          expect(error.message).to.equal('empty owner not valid');
        });
    });

    it('should return a rejected with message empty description not valid', function() {
      var tasks = getService('tasks');
      var newTask={
        owner: 'filled',
        description: ''
      };
      return tasks.createTask(newTask)
        .then(null, function(error){
          console.log(error.message);
          expect(error.message).to.equal('empty description not valid');
        });
    });


    /*it('should only call server.get once', function() {
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
    });*/
  });