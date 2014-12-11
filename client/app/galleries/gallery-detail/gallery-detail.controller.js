(function() {
  'use strict';

  angular
    .module('app.galleries')
    .controller('GalleryDetail', GalleryDetail);

  GalleryDetail.$inject = ['$routeParams', 'dataService', 'logger'];

  function GalleryDetail($routeParams, dataService, logger)
  {
    var vm = this;
    vm.gallery = null;
    vm.title = 'Gallery Detail';

    initialise();

    function initialise() {
      //logger.log($routeParams);
      return getGallery($routeParams.id).then(function() {
        logger.info('Initialised Gallery Detail View');
      })
    }

    function getGallery(galleryId) {
      return dataService.getGalleryPictures(galleryId).then(function (data) {
        vm.gallery = data;
        //vm.title = vm.gallery.title;
        return vm.gallery;
      })
    }
  }
})();
