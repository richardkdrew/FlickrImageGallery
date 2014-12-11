(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', '$q', 'flickrApi', 'logger'];

  function dataService($http, $q, flickrApi, logger) {

    var service = {
      getGalleries: getGalleries,
      getGalleryPictures: getGalleryPictures
    };

    return service;

    function getGalleries() {
      var deferred = $q.defer();
      $http.get(flickrApi.url, {
        params: {
          method                : flickrApi.galleriesMethod,
          api_key               : flickrApi.key,
          user_id               : flickrApi.userId,
          format                : 'json',
          nojsoncallback        : '1',
          primary_photo_extras  : flickrApi.photoExtras
        }
      })
        .success(getGalleriesComplete)
        .error(getGalleriesFailed);

      function getGalleriesComplete(data) {
        deferred.resolve(data);
      }

      function getGalleriesFailed(data, code) {
        logger.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function getGalleryPictures(galleryId) {
      var deferred = $q.defer();
      $http.get(flickrApi.url, {
        params: {
          method                : flickrApi.galleryPicturesMethod,
          api_key               : flickrApi.key,
          photoset_id           : galleryId,
          format                : 'json',
          nojsoncallback        : '1',
          extras                : flickrApi.photoExtras
        }
      })
        .success(getGalleryPicturesComplete)
        .error(getGalleryPicturesFailed);

      function getGalleryPicturesComplete(data) {
        deferred.resolve(data);
      }

      function getGalleryPicturesFailed(data, code) {
        logger.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }
  }
})();
