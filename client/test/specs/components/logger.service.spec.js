'use strict';

describe('factory: logger', function () {
  var service, mockLog, mocks = {};

  beforeEach(module('components.logger'));

  beforeEach(function () {
    mockLog = sinon.stub({
      error : function (message, data, title) {},
      info  : function (message, data, title) {},
      warn  : function (message, data, title) {},
      log   : function () {}
    });

    module(function($provide) {
      //specHelper.fakeLogger($provide);
      $provide.value('$log', mockLog);
    });
    inject(function ($injector) {
      service = $injector.get('logger');

      mocks.mockData = "test data";
      mocks.mockMessage = "test message";
      mocks.mockTitle = "test title";
    })
  });

  it('should be defined', function () {
    expect(service).toBeDefined();
  });

  describe('function: error', function () {

    it('should call the $log.error function', function () {
      spyOn(mockLog, 'error');
      service.error(mocks.mockMessage, mocks.mockData, mocks.mockTitle);

      expect(mockLog.error).toHaveBeenCalled();
      expect(mockLog.error).toHaveBeenCalledWith('Error: ' + mocks.mockMessage, mocks.mockData);
    })

  })

  describe('function: info', function () {

    it('should call the $log.info function', function () {
      spyOn(mockLog, 'info');
      service.info(mocks.mockMessage, mocks.mockData, mocks.mockTitle);

      expect(mockLog.info).toHaveBeenCalled();
      expect(mockLog.info).toHaveBeenCalledWith('Info: ' + mocks.mockMessage, mocks.mockData);
    })

  })

  describe('function: success', function () {

    it('should call the $log.info function', function () {
      spyOn(mockLog, 'info');
      service.success(mocks.mockMessage, mocks.mockData, mocks.mockTitle);

      expect(mockLog.info).toHaveBeenCalled();
      expect(mockLog.info).toHaveBeenCalledWith('Success: ' + mocks.mockMessage, mocks.mockData);
    })

  })

  describe('function: warning', function () {

    it('should call the $log.warn function', function () {
      spyOn(mockLog, 'warn');
      service.warning(mocks.mockMessage, mocks.mockData, mocks.mockTitle);

      expect(mockLog.warn).toHaveBeenCalled();
      expect(mockLog.warn).toHaveBeenCalledWith('Warning: ' + mocks.mockMessage, mocks.mockData);
    })

  })

  /*describe('function: log', function () {

    it('should call the $log.log function', function () {
      spyOn(mockLog, 'log');
      service.log();

      expect(mockLog.log).toHaveBeenCalled();
    })

  })*/

});
