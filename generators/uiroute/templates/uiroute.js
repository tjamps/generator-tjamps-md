(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .config(['$stateProvider', function <%= closureName %>($stateProvider) {
      $stateProvider
        .state('', {
          url: '',
          templateUrl: '',
          controller: '',
          controllerAs: '',
          resolve: {}
        })
        ;
    }]);
})();
