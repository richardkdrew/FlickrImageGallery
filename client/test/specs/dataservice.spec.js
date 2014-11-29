describe('factory: dataService', function () {
  var service, $httpBackend, mocks = {};

  beforeEach(function () {
    module('app.core');
    inject(function($injector) {
      service = $injector.get('dataService');
    })

    mocks.galleriesDataMocks = [{
      data: {results: mockData.getMockGalleries()}
    }];
  });

  /*beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', "https://api.flickr.com/services/rest?api_key=36862b3eb779f31ad749a8b561b730b6&format=json&method=flickr.photosets.getList&nojsoncallback=1&primary_photo_extras=url_sq,+url_s,+url_m,+url_l&user_id=19632847@N00")
.respond([200, mocks.galleriesDataMocks, {}]);
     }));*/

  it('should be defined', function ()
  {
    expect(service).toBeDefined();
  });

  describe('function: getGalleries', function() {

	beforeEach(inject(function (_$httpBackend_) {
	    $httpBackend = _$httpBackend_;

	    $httpBackend.whenGET("https://api.flickr.com/services/rest?api_key=36862b3eb779f31ad749a8b561b730b6&format=json&method=flickr.photosets.getList&nojsoncallback=1&primary_photo_extras=url_sq,+url_q,+url_t,+url_m,+url_c,+url_b,+url_o&user_id=19632847@N00")
	.respond([200, mocks.galleriesDataMocks, {}]);
	}));
	
    it('should be defined', function ()
    {
      expect(service.getGalleries()).toBeDefined();
      $httpBackend.flush();
    });

	it('should return response code 200', function () {
		service.getGalleries().then(function(result) {
			//console.log(result[0]);
        	expect(result[0]).toEqual(200);
      });
      $httpBackend.flush();
    });

	it('should return 6 galleries', function () {
		service.getGalleries().then(function(result) {
			//console.log(result[1][0].data.results.photosets.photoset);
			var data = result[1][0].data.results.photosets.photoset;
        expect(data.length).toEqual(6);
      
      });
      $httpBackend.flush();
    });

  })
});
