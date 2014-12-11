'use strict';

describe('service: galleriesService', function () {
  var service, mockDataService, mockLogger, deferred;

  beforeEach(module('app.galleries'));

  beforeEach(function () {
    mockDataService = {
      getGalleries          : function () {},
      getGalleryPictures  : function () {}
    };

    mockLogger = {
      error: function () {}
    };

    sinon.stub(mockLogger, 'error', function() {
    });

    module(function ($provide) {
      $provide.value('dataService', mockDataService);
      $provide.value('logger', mockLogger);
    })
  });

  describe('function: getGalleries', function () {

    beforeEach(inject(function ($q, galleriesService) {

      service = galleriesService;
      deferred = $q.defer();

    }));

    it('should return a promise', function () {

      // Set up the getGalleries call to succeed
      sinon.stub(mockDataService, 'getGalleries', function () {
        deferred.resolve(mockData.getMockGalleries());
        return deferred.promise;
      });

      expect(service.getGalleries().then).toBeDefined();
    });

    it('should call the dataService:getGalleries function', inject(function ($rootScope) {

      // Set up the getGalleries call to succeed
      sinon.stub(mockDataService, 'getGalleries', function () {
        deferred.resolve(mockData.getMockGalleries());
        return deferred.promise;
      });

      service.getGalleries();
      $rootScope.$apply();

      expect(mockDataService.getGalleries.called).toBeTruthy();
    }));

    it('should call the logger:error function when not successful', inject(function ($rootScope) {

      // Set up the getGalleries call to fail
      sinon.stub(mockDataService, 'getGalleries', function () {
        deferred.reject(mockData.getMockGalleries());
        return deferred.promise;
      });

      service.getGalleries();
      $rootScope.$apply();

      expect(mockLogger.error.called).toBeTruthy();
    }));

    it('should return 6 galleries when successful', inject(function ($rootScope) {

      // Set up the getGalleries call to succeed
      sinon.stub(mockDataService, 'getGalleries', function () {
        deferred.resolve(mockData.getMockGalleries());
        return deferred.promise;
      });

      var result = service.getGalleries();
      $rootScope.$apply();

      expect(result.$$state.value.photosets.photoset.length).toEqual(6);
    }));

  });

  describe('function: getGalleryPictures', function () {

    var mockGalleryId;

    beforeEach(inject(function ($q, galleriesService) {
      service = galleriesService;
      deferred = $q.defer();
      mockGalleryId = mockData.mockGalleryId;
    }));

    it('should return a promise', function () {

      // Set up the getGalleryPictures call to succeed
      sinon.stub(mockDataService, 'getGalleryPictures', function() {
        deferred.resolve(mockData.getMockGalleryPictures());
        return deferred.promise;
      });

      expect(service.getGallery(mockGalleryId).then).toBeDefined();
    });

    it('should call the dataService:getGallery function', inject(function ($rootScope) {

      // Set up the getGalleries call to succeed
      sinon.stub(mockDataService, 'getGalleryPictures', function() {
        deferred.resolve(mockData.getMockGalleryPictures());
        return deferred.promise;
      });

      service.getGallery(mockGalleryId);
      $rootScope.$apply();

      expect(mockDataService.getGalleryPictures.called).toBeTruthy();
    }));

    it('should call the logger:error function when not successful', inject(function ($rootScope) {

      // Set up the getGalleries call to fail
      sinon.stub(mockDataService, 'getGalleryPictures', function() {
        deferred.reject(mockData.getMockGalleryPictures());
        return deferred.promise;
      });

      service.getGallery(mockGalleryId);
      $rootScope.$apply();

      expect(mockLogger.error.called).toBeTruthy();
    }));

  });

});
