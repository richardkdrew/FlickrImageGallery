'use strict';

ddescribe('controller: galleries', function () {
  var controller, mockDataService, mockLogger;

  beforeEach(module('app.galleries', function($provide, $q) {
    $provide.value('dataService', sinon.stub({getGalleries: function() {
      var deferred = $q.defer();
      deferred.resolve(mockData.getMockGalleries());
      return deferred.promise;
    }}));
    $provide.value('logger', sinon.stub({
      error   : function (message, data, title) {},
      info    :    function (message, data, title) {},
      success : function (message, data, title) {},
      warning : function (message, data, title) {},
      log     :    function() {}
    }));
  }));

  beforeEach(inject(function($controller){//}, $q, dataService, logger) {

    /*mockDataService = sinon.stub({
      getGalleries: function() {
        var deferred = $q.defer();
        deferred.resolve(mockData.getMockGalleries());
        return deferred.promise;
      }
    });

    mockLogger = sinon.stub({
      error   : function (message, data, title) {},
      info    : function (message, data, title) {},
      success : function (message, data, title) {},
      warning : function (message, data, title) {},
      log     : function() {}
    });*/

    /*module(function($provide) {
      $provide.value('dataService', mockDataService);
      $provide.value('logger', mockLogger);
    });*/

    /*sinon.stub(dataService, 'getGalleries', function() {
       var deferred = $q.defer();
       deferred.resolve(mockData.getMockGalleries());
       return deferred.promise;
    });*/

     /*sinon.stub(logger,  'error',   function (message, data, title) {},
                         'info',    function (message, data, title) {},
                         'success', function (message, data, title) {},
                         'warning', function (message, data, title) {},
                         'log',     function() {}
     );*/

    controller = $controller('Galleries');
  }));

  /*beforeEach(function () {
    mockDataService = sinon.stub({
      getGalleries: function() {
        var deferred = $q.defer();
        deferred.resolve(mockData.getMockGalleries());
        return deferred.promise;
      }
    })

    mockLogger = sinon.stub({
      error   : function (message, data, title) {},
      info    : function (message, data, title) {},
      success : function (message, data, title) {},
      warning : function (message, data, title) {},
      log     : function() {}
    })

    module(function($provide) {
      $provide.value('dataService', mockDataService);
      $provide.value('logger', mockLogger);
    });

    inject(function($controller, dataService, logger) {

      /*sinon.stub(dataService, 'getGalleries', function() {
        var deferred = $q.defer();
        deferred.resolve(mockData.getMockGalleries());
        return deferred.promise;
      });

      sinon.stub(logger,  'error', function (message, data, title) {},
                          'info', function (message, data, title) {},
                          'success', function (message, data, title) {},
                          'warning', function (message, data, title) {},
                          'log', function() {}
      )*/

      /*controller = $controller('Galleries');
    })
  });*/

  it('should be defined', function ()
  {
    expect(controller).toBeDefined();
  });

});
