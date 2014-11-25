describe('dataservice', function () {
  var dataservice;

  beforeEach(module('app.core'));

  beforeEach(inject(function(_dataservice_) {
    dataservice = _dataservice_;
  }));

  it('should be registered', (function() {
    expect(dataservice).not.to.equal(null);
  }));

  describe('getGalleriesData function', function () {
    it('should exist', function () {
      expect(dataservice.getGalleriesData).not.to.equal(null);
    });
  });

});
