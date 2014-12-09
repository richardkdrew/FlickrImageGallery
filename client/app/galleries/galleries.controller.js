(function() {
  'use strict';

  angular
    .module('app.galleries')
    .controller('Galleries', Galleries);

      Galleries.$inject = ['dataService', 'logger'];

      function Galleries(dataService, logger) {
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
          return dataService.getGalleries().then(function (data) {
              vm.galleries = data;
              return vm.galleries;
            })
        }
      }
})();
