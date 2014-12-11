(function() {
  'use strict';

  angular.module('app').config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/galleries', {
        templateUrl: 'app/galleries/galleries.html',
        controller: 'Galleries',
        controllerAs: 'vm'//,
        /*resolve: {
          galleries : function(galleriesService) {
            return galleriesService.getGalleries();
          }
        }*/
      })
      .when('/gallery/:id', {
        templateUrl: 'app/galleries/gallery-detail/gallery-detail.html',
        controller: 'GalleryDetail',
        controllerAs: 'vm'
      }).otherwise({redirectTo: '/galleries'});
  }
})();

