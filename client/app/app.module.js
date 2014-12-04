(function() {
  'use strict';

  angular.module('app', ['ngRoute',
      /*
       * Application core modules
       */
      'app.core',

      /*
       * Feature areas
       */
      'app.galleries'

  ]);
})();
