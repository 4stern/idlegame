'use strict';

describe('Service: thegame', function () {

  // load the service's module
  beforeEach(module('idlegameApp'));

  // instantiate service
  var thegame;
  beforeEach(inject(function (_thegame_) {
    thegame = _thegame_;
  }));

  it('should do something', function () {
    expect(!!thegame).toBe(true);
  });

});
