(function() {
  'use strict';

  angular
    .module('app')
    .config(['$compileProvider', '$logProvider', 'APP_PARAMS', function($compileProvider, $logProvider, APP_PARAMS) {
      $compileProvider.debugInfoEnabled(APP_PARAMS.debug === '1' ? true : false);
      $logProvider.debugEnabled(APP_PARAMS.debug === '1' ? true : false);
    }]);
})();
