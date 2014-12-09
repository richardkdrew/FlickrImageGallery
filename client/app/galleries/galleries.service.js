(function() {
  'use strict';

  angular.module('app.galleries').factory('galleriesService', galleriesService);

  galleriesService.$inject = ['$q', 'dataservice', 'galleryMappingService'];

  function galleriesService($q, dataservice, galleryMappingService) {
    var self = this;
    self.galleries = null;
    self.currentGalleryIndex = null;

    var service = {
      getGalleries: getGalleries,
      getGallery: getGallery
    };

    return service;

    function getGalleries() {
      var deferred = $q.defer();

      if (self.galleries !== null) {
        //alert('Getting cached galleries...');
        deferred.resolve(self.galleries);
      } else {
        //alert('Getting galleries...');
        dataservice.getGalleriesData().then(getGalleriesDataComplete, getGalleriesDataFailed);
      }

      function getGalleriesDataComplete(data) {
        self.galleries = mapGalleriesData(data);
        deferred.resolve(self.galleries);
      }

      function getGalleriesDataFailed(data, code) {
        alert(code);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function getGallery(galleryId) {
      var deferred = $q.defer();

      if (self.galleries === null) {
        //alert('Getting galleries...')
        getGalleries();//.then(getGalleryPictures);
      }

      self.currentGalleryIndex = getCurrentGalleryIndex(galleryId);
      //alert(self.currentGalleryIndex);
      if(self.galleries[self.currentGalleryIndex].pictures.length > 0)
      {
        //alert('getting cached gallery...');
        deferred.resolve(self.galleries[self.currentGalleryIndex]);
      }
      else {
        //alert('getting gallery...');
        dataservice.getGalleryPictures(galleryId).then(getGalleryPicturesDataComplete, getGalleryPicturesDataFailed);
      }

      function getGalleryPicturesDataComplete(data) {
        self.galleries[self.currentGalleryIndex].pictures = mapPicturesData(data);
        deferred.resolve(self.galleries[self.currentGalleryIndex]);
      }

      function getGalleryPicturesDataFailed(data, code) {
        alert(code);
        deferred.reject(data);
      }

      /*function getGalleriesComplete(data) {
       deferred.resolve(getGalleryPictures(galleryId));
       }

       function getGalleriesFailed(data, code) {
       alert(code);
       deferred.reject(data);
       }*/

      return deferred.promise;
    }

    /*function getGalleryPictures(galleryId) {
     var deferred = $q.defer();

     self.currentGalleryIndex = getCurrentGalleryIndex(galleryId);
     alert(self.currentGalleryIndex);
     if(self.galleries[self.currentGalleryIndex].pictures.length > 0)
     {
     alert('getting cached gallery...');
     deferred.resolve(self.galleries[self.currentGalleryIndex]);
     }
     else {
     alert('getting gallery...');
     dataservice.getGalleryPicturesData(galleryId).then(getGalleryPicturesDataComplete, getGalleryPicturesDataFailed);
     }

     function getGalleryPicturesDataComplete(data) {
     self.galleries[self.currentGalleryIndex].pictures = mapPicturesData(data);
     deferred.resolve(self.galleries[self.currentGalleryIndex]);
     }

     function getGalleryPicturesDataFailed(data, code) {
     alert(code);
     deferred.reject(data);
     }

     return deferred.promise;
     }*/

    function getCurrentGalleryIndex(id) {
      for (var i = 0; i < self.galleries.length; i++) {
        if(self.galleries[i].id === id) return i;
      }
    }

    function mapGalleryData(galleryData) {
      return galleryMappingService.mapGalleryData(galleryData);
    }

    function mapGalleriesData(galleriesData) {
      return galleryMappingService.mapGalleriesData(galleriesData);
    }

    function mapPicturesData(picturesData) {
      return galleryMappingService.mapPicturesData(picturesData);
    }

    /*function getCurrentGallery {
     return self.galleries[self.currentGalleryIndex];
     }*/
  }
})();
