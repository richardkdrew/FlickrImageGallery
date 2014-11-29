(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q'];

  function dataService($http, $q){

    /*function getGalleries() {
      return 2;
    }*/

    var apiUrl = 'https://api.flickr.com/services/rest';
    var apiKey = '36862b3eb779f31ad749a8b561b730b6';
	var galleriesMethod = 'flickr.photosets.getList';
	var userId = '19632847@N00';

    function getGalleries() {
      var deferred = $q.defer();
      $http.get(apiUrl, {
        params: {
          method: galleriesMethod,
          api_key: apiKey,
          user_id: userId,
          format: 'json',
          nojsoncallback: '1',
          primary_photo_extras: 'url_sq, url_q, url_t, url_m, url_c, url_b, url_o'
        }
      })
        .success(getGalleriesComplete)
        .error(getGalleriesFailed);

      function getGalleriesComplete(data) {
        deferred.resolve(data);
      }

      function getGalleriesFailed(data, code) {
        //alert(code);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    var service = {
      getGalleries: getGalleries
    };

    return service;
  }
})();
