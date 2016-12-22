(function() {
  'use strict';

  angular
    .module('app')
    .config(['$compileProvider', 'APP_PARAMS', function($compileProvider, APP_PARAMS) {
      $compileProvider.debugInfoEnabled(APP_PARAMS.debug === '1' ? true : false);
    }]);
})();
