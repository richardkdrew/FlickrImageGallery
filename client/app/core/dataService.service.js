(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q', 'flickrApi'];

  function dataService($http, $q, flickrApi){

    function getGalleries() {
      var deferred = $q.defer();
      $http.get(flickrApi.url, {
        params: {
          method: flickrApi.galleriesMethod,
          api_key: flickrApi.key,
          user_id: flickrApi.userId,
          format: 'json',
          nojsoncallback: '1',
          primary_photo_extras: flickrApi.photoExtras
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
