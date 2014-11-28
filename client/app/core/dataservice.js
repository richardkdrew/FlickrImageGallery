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
    //var perPage = 12;

    function getGalleries() {
      var deferred = $q.defer();
      $http.get(apiUrl, {
        params: {
          method: 'flickr.photosets.getList',
          api_key: apiKey,
          user_id: '19632847@N00',
          format: 'json',
          nojsoncallback: '1',
          //per_page: perPage,
          primary_photo_extras: 'url_sq, url_s, url_m, url_l'
        }
      })
        .success(getGalleriesComplete)
        .error(getGalleriesFailed);

      function getGalleriesComplete(data) {
        deferred.resolve(data.photosets.photoset);
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
