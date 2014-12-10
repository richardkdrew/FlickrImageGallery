(function() {
  'use strict';

  angular
    .module('app.galleries')
    .factory('galleriesService', galleriesService);

  galleriesService.$inject = ['$q', 'dataService', 'logger'];

  function galleriesService($q, dataService, logger) {
    var self = this;
    self.galleries = null;

    var service = {
      getGalleries: getGalleries
    };

    return service;

    function getGalleries() {
      var deferred = $q.defer();

      dataService.getGalleries().then(getGalleriesComplete, getGalleriesFailed);

      function getGalleriesComplete(data) {
        self.galleries = mapGalleries(data);
        deferred.resolve(self.galleries);
      }

      function getGalleriesFailed(data, code) {
        logger.error(code, data);
        deferred.reject(data);
      }

      return deferred.promise;
    }

    function mapGalleries(galleriesData) {
      return galleriesData;
    }
  }
})();
