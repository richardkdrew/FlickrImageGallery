'use strict';

describe('factory: dataService', function () {
  var service, $httpBackend, flickrApi, mockGalleryId, mockLogger;

  beforeEach(module('app.core'));

  beforeEach(function () {

    mockLogger = {
      error: function () {}
    };

    sinon.stub(mockLogger, 'error', function() {
    });

    module(function ($provide) {
      $provide.value('logger', mockLogger);
    })

    inject(function($injector) {
      service = $injector.get('dataService');
    })
  });

  it('should be defined', function ()
  {
    expect(service).toBeDefined();
  });

  describe('function: getGalleries', function() {

    beforeEach(inject(function (_$httpBackend_, _flickrApi_) {
        $httpBackend = _$httpBackend_;
        flickrApi = _flickrApi_;

      //'https://api.flickr.com/services/rest?api_key=36862b3eb779f31ad749a8b561b730b6&format=json&method=flickr.photosets.getList&nojsoncallback=1&primary_photo_extras=url_sq,+url_q,+url_t,+url_m,+url_c,+url_b,+url_o&user_id=19632847@N00'
        $httpBackend.whenGET(flickrApi.url + '?api_key=' + flickrApi.key + '&format=json&method=' + flickrApi.galleriesMethod + '&nojsoncallback=1&primary_photo_extras=' + flickrApi.photoExtras.split(' ').join('+') + '&user_id=' + flickrApi.userId)
    .respond(mockData.getMockGalleries());
    }));

    it('should be defined', function ()
    {
      expect(service.getGalleries()).toBeDefined();
    });

    it('should return a promise', function () {
      expect(service.getGalleries().then).toBeDefined();
    });

    it('should have a successful status', function () {
      service.getGalleries().then(function(data) {
            expect(data.stat).toEqual('ok');
        });
        $httpBackend.flush();
    });

    it('should return 6 galleries', function () {
      service.getGalleries().then(function(data) {
          expect(data.photosets.photoset.length).toEqual(6);
        });
        $httpBackend.flush();
    });

  })

  describe('function: getGalleryPictures', function() {

    beforeEach(inject(function (_$httpBackend_, _flickrApi_) {
      $httpBackend = _$httpBackend_;
      flickrApi = _flickrApi_;

      mockGalleryId = mockData.mockGalleryId;

      //'https://api.flickr.com/services/rest?api_key=36862b3eb779f31ad749a8b561b730b6&extras=url_sq,+url_q,+url_t,+url_m,+url_c,+url_b,+url_o&format=json&method=flickr.photosets.getPhotos&nojsoncallback=1&photoset_id=72157628060674071'
      $httpBackend.whenGET(flickrApi.url + '?api_key=' + flickrApi.key + '&extras=' + flickrApi.photoExtras.split(' ').join('+') + '&format=json&method=' + flickrApi.galleryPicturesMethod + '&nojsoncallback=1' +  '&photoset_id=' + mockGalleryId)
        .respond(mockData.getMockGallery);
    }));

    it('should be defined', function ()
    {
      expect(service.getGalleryPictures(mockGalleryId)).toBeDefined();
    });

    /*it('should call the logger:error function when not successful', inject(function ($rootScope) {

      $httpBackend.whenGET(flickrApi.url + '?api_key=' + flickrApi.key + '&extras=' + flickrApi.photoExtras.split(' ').join('+') + '&format=json&method=' + flickrApi.galleryPicturesMethod + '&nojsoncallback=1' +  '&photoset_id=' + mockGalleryId)
        .respond(500);

      service.getGalleryPictures(mockGalleryId)
      $rootScope.$apply();

      expect(mockLogger.error.called).toBeTruthy();
    }));*/

    it('should return a promise', function () {
      expect(service.getGalleryPictures(mockGalleryId).then).toBeDefined();
    });

    it('should have a successful status', function () {
      service.getGalleryPictures(mockGalleryId).then(function(data) {
        expect(data.stat).toEqual('ok');
      });
      $httpBackend.flush();
    });

  })
});
