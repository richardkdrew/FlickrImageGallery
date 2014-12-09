'use strict';

describe('controller: galleries', function () {
  var controller, mockDataService = {}, scope, mockLogger = {};

  beforeEach(function () {
    module('app.galleries');

    inject(function($rootScope, $q, $controller) {
      scope = $rootScope.$new();

      // Set up the mocked logger
      mockLogger = {
        info: function () {}
      };

      sinon.stub(mockLogger, 'info', function() {
      });

      // Set up the mocked data service
      mockDataService = {
        getGalleries: function () {}
      };

      sinon.stub(mockDataService, 'getGalleries', function() {
        var deferred = $q.defer();
        deferred.resolve(mockData.getMockGalleries());
        return deferred.promise;
      });

      // Set up the controller under test
      controller = $controller('Galleries', { $scope: scope,
        dataService: mockDataService,
        logger: mockLogger
      });
      $rootScope.$apply();
    });

  });

  it('should be defined', function () {
    expect(controller).toBeDefined();
  });

  describe('after initialise function is called', function() {

    it('should have title of Galleries', function() {
      expect(controller.title).toEqual('Galleries');
    });

    it('should have 6 Galleries loaded', function() {
      expect(controller.galleries.photosets.photoset.length).toEqual(6);
    });

    it('should have called the logger:info method', function () {

      expect(mockLogger.info.called).toBeTruthy();
    });

    it('should have called the dataService:getGalleries method', function () {
      expect(mockDataService.getGalleries.called).toBeTruthy();
    });

  });

});
