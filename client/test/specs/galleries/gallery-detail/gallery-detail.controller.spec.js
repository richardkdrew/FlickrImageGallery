'use strict';

describe('controller: galleries', function () {
  var controller, mockDataService = {}, scope, routeParams, mockLogger = {};

  beforeEach(function () {
    module('app.galleries');

    inject(function($rootScope, $q, $controller) {
      scope = $rootScope.$new();
      routeParams = { id: mockData.mockGalleryId};

      // Set up the mocked logger
      mockLogger = {
        info: function () {}
      };

      sinon.stub(mockLogger, 'info', function() {
      });

      // Set up the mocked data service
      mockDataService = {
        getGalleryPictures: function () {}
      };

      sinon.stub(mockDataService, 'getGalleryPictures', function() {
        var deferred = $q.defer();
        deferred.resolve(mockData.getMockGalleryPictures());
        return deferred.promise;
      });

      // Set up the controller under test
      controller = $controller('GalleryDetail', {
        $scope        : scope,
        $routeParams  : routeParams,
        dataService   : mockDataService,
        logger        : mockLogger

      });
      $rootScope.$apply();
    });

  });

  it('should be defined', function () {
    expect(controller).toBeDefined();
  });

  describe('after initialise function is called', function() {

    it('should have title of Gallery Detail', function() {
      expect(controller.title).toEqual('Gallery Detail');
    });

    it('should have a Gallery loaded', function() {
      expect(controller.gallery.photoset).toBeDefined();
    });

    it('should have called the logger:info method', function () {
      expect(mockLogger.info.called).toBeTruthy();
    });

    it('should have called the dataService:getGalleryPictures method', function () {
      expect(mockDataService.getGalleryPictures.called).toBeTruthy();
    });

  });

});
