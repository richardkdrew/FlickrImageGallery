describe('factory: logger', function () {
  var service;

  beforeEach(function () {
    module('components.logger');
    inject(function($injector) {
      service = $injector.get('logger');
    })
  });

  it('should be defined', function ()
  {
    expect(service).toBeDefined();
  });
});
