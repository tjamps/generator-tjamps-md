(function() {
  'use strict';

  angular
    .module('app')
    .run(['$rootScope', function appRun($rootScope) {
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error(error);
      });

      console.log('App live and running.');
    }]);
})();
