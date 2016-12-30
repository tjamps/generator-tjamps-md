(function() {
  'use strict';

  angular
    .module('app')
    .run(['$rootScope', '$log', function appRun($rootScope, $log) {
      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        $log.error(error);
      });

      $log.log('App live and running.');
    }]);
})();
