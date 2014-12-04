(function() {
  'use strict';

  angular.module('app').config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/galleries', {
        templateUrl: 'app/galleries/galleries.html',
        controller: 'Galleries',
        controllerAs: 'vm',
        resolve: {
          galleries : function(dataService) {
            return dataService.getGalleries();
          }
        }
      }).otherwise({redirectTo: '/galleries'});
  }
})();

