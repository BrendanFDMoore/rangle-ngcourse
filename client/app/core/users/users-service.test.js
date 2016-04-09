  describe('users service', function () {
    // Load the angular module. Having smaller modules helps here.
    beforeEach(module('ngcourse.users'));

    beforeEach(module(function($provide){

      // Mock 'server'.
      $provide.service('server', function() {
        var service = {};
        var data = [{
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

    it('should get users', function() {
      var users = getService('users');
      users.setUsername('alice');
      return users.getUsers()
        .then(function (receivedUsers) {
          console.log(receivedUsers);
          console.log(receivedUsers.length);
          expect(receivedUsers.length).to.equal(3);
        });
    });

    it('should return a promise', function() {
      var users = getService('users');
      users.setUsername('alice');
      return users.whenAuthenticated()
        .then(function (data) {
          //done();
        })
        .then(null,function (msg) {
          $log.error(msg);
        });
    });


  });