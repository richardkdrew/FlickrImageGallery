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
    vm.getGallery = getGallery;

    initialise();

    function initialise() {
      //logger.log($routeParams);
      return getGallery($routeParams.id).then(function() {
        logger.info('Initialised Gallery Detail View');
      })
    }

    function getGallery(galleryId) {
      //'72157628060674071'
      return dataService.getGalleryPictures(galleryId).then(function (data) {
        vm.gallery = data;
        //vm.title = vm.gallery.title;
        return vm.gallery;
      })
    }
  }
})();
