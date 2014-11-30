describe('factory: dataService', function () {
  var service, $httpBackend, flickrApi, mocks = {};

  beforeEach(function () {
    module('app.core');
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
	
	    mocks.galleriesDataMocks = mockData.getMockGalleries();
	
		//'https://api.flickr.com/services/rest?api_key=36862b3eb779f31ad749a8b561b730b6&format=json&method=flickr.photosets.getList&nojsoncallback=1&primary_photo_extras=url_sq,+url_q,+url_t,+url_m,+url_c,+url_b,+url_o&user_id=19632847@N00'
	    $httpBackend.whenGET(flickrApi.url + '?api_key=' + flickrApi.key + '&format=json&method=' + flickrApi.galleriesMethod + '&nojsoncallback=1&primary_photo_extras=' + flickrApi.photoExtras.split(' ').join('+') + '&user_id=' + flickrApi.userId)
	.respond(mocks.galleriesDataMocks);
	}));
	
    it('should be defined', function ()
    {
      expect(service.getGalleries()).toBeDefined();
	  expect(service.getGalleries()).toNotEqual(null);
    });

	it('should return a promise', function () {
	  expect(service.getGalleries().then).toBeDefined();
	  // TODO check this expect in more detail
	  expect(service.getGalleries().catch).toBeDefined();
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
});
