(function() {
  'use strict';

  angular
    .module('app')
    .config(['$mdThemingProvider', 'APP_PARAMS', function($mdThemingProvider, APP_PARAMS) {
      $mdThemingProvider
        .theme('default')
        .primaryPalette(APP_PARAMS.theme.primaryPalette)
        .accentPalette(APP_PARAMS.theme.accentPalette)
        .warnPalette(APP_PARAMS.theme.warnPalette)
        .backgroundPalette(APP_PARAMS.theme.backgroundPalette);
    }]);
})();
