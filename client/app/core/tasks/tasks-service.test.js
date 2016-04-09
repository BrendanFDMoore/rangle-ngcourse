  describe('tasks service', function () {
    // Load the angular module. Having smaller modules helps here.
    beforeEach(module('ngcourse.tasks'));

    beforeEach(module(function($provide){

      // Mock 'users'.
      $provide.service('users', function() {
        var service = {};
        var users = [{
            username: 'bob',
            displayName: 'Bob BeebleBrox'
          },
          {
            username: 'ed',
            displayName: 'Ed Mirvish'
          },
          {
            username: 'alice',
            displayName: 'Alice Hatter'
          }
        ];

        service.getUsername = function () {
          return Q.when(fixedusers[2].username);
        };

        service.getUsers = function () {
          return Q.when(users);
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
      var newTask = {
        owner: 'alice',
        description: 'A newly-created task.'
      };
      return tasks.createTask(newTask)
        .then(function (receivedTasks) {
          expect(receivedTasks.length).to.equal(2);
        });
    });

    it('should return a rejected promise with message null parameter not valid', function() {
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

    it('should return a rejected promise with message empty owner not valid', function() {
      var tasks = getService('tasks');
      var newTask={
        owner: '',
        description: 'A newly-created task.'
      };
      return tasks.createTask(newTask)
        .then(function(){throw new Error('FAIL: test should not pass.');})
        .then(null, function(error){
          console.log(error.message);
          expect(error.message).to.equal('empty owner not valid');
        });
    });

    it('should return a rejected promise with message empty description not valid', function() {
      var tasks = getService('tasks');
      var newTask={
        owner: 'bob',
        description: ''
      };
      return tasks.createTask(newTask)
        .then(function(){throw new Error('FAIL: test should not pass.');})
        .then(null, function(error){
          console.log(error.message);
          expect(error.message).to.equal('empty description not valid');
        });
    });

    it('should return a rejected promise with message task owner not a valid user', function() {
      var tasks = getService('tasks');
      var newTask={
        owner: 'alicefake',
        description: 'non empty'
      };
      return tasks.createTask(newTask)
        .then(function(){throw new Error('FAIL: test should not pass.');})
        .then(null, function(error){
          console.log(error.message);
          expect(error.message).to.equal('task owner not a valid user');
        });
    });

  });