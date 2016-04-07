'use strict';

var expect = chai.expect;
// We can move expect definition to client/testing/test-utils.js

describe('tasks service', function () {
  // Load the angular module. Having smaller modules helps here.
  beforeEach(module('ngcourse.server'));
  beforeEach(module('ngcourse.users'));
  beforeEach(module('ngcourse.tasks'));
  it('should get loaded', function() {
    // Inject the service.
    inject(function(tasks) {
      // Notice that the service is available inside the closure.
      // We can assert that the service has loaded by calling
      // getTasks().
      expect(tasks.getTasks()).to.not.be.undefined;
    });
  });
});