(function() {
  'use strict';

  angular
    .module('app.galleries')
    .controller('Galleries', Galleries)
    .animation('.pageSlide-animation', GalleriesAnimation);

  Galleries.$inject = ['galleriesService', 'logger'];

  function Galleries(galleriesService, logger) {
    /* jshint validthis: true */
    var vm = this;
    vm.galleries = [];
    vm.title = 'Galleries';

    initialise();

    function initialise() {
      return getGalleries().then(function() {
        logger.info('Initialised Galleries View');
      })
    }

    function getGalleries() {
      return galleriesService.getGalleries().then(function (data) {
          vm.galleries = data;
          return vm.galleries;
        })
    }
  }

})();
