describe('factory: dataService', function () {
  var service, $httpBackend, mocks = {};

  beforeEach(function () {
    module('app.core');
    /*inject(function($injector) {
      service = $injector.get('dataService');
    })*/

    mocks.galleriesDataMocks = [{
      data: {results: mockData.getMockGalleries()}
    }];

    /*inject(function (dataService, _$httpBackend_) {
      service = dataService;
      $httpBackend = _$httpBackend_;

      $httpBackend.whenGET("https://api.flickr.com/services/rest").respond([200, mocks.galleriesDataMocks, {}]);
    })*/
  });

  beforeEach(inject(function (_dataService_, _$httpBackend_) {
    service = _dataService_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET("https://api.flickr.com/services/rest?api_key=36862b3eb779f31ad749a8b561b730b6&format=json&method=flickr.photosets.getList&nojsoncallback=1&primary_photo_extras=url_sq,+url_s,+url_m,+url_l&user_id=19632847@N00").respond([200, mocks.galleriesDataMocks, {}]);
  }));

  it('should be defined', function ()
  {
    expect(service).toBeDefined();
  });

  describe('function: getGalleries', function() {
    //httpBackend.whenGET("https://api.flickr.com/services/rest").respond([200, mocks.galleriesDataMocks, {}]);

    it('should be defined', function ()
    {
      expect(service.getGalleries()).toBeDefined();
      $httpBackend.flush();
    });

    /*it('should return 2', function () {
      var result = service.getGalleries();
      expect(result).toEqual(2);
    });*/

    it('should return 4 Galleries', function (done) {
      //httpBackend.when('GET', 'https://api.flickr.com/services/rest?api_key=36862b3eb779f31ad749a8b561b730b6&format=json&method=flickr.photosets.getList&nojsoncallback=1&primary_photo_extras=url_sq,+url_s,+url_m,+url_l&user_id=19632847@N00').respond(200, mocks.galleriesDataMocks);
      service.getGalleries().then(function(data) {
        expect(data.length).to.equal(4);
        done();
      });
      $httpBackend.flush();
    });

  })
});
