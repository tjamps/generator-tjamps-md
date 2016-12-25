(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .factory('<%= serviceName %>', [function <%= serviceName %>Factory() {
      var <%= serviceName %> = {};

      return <%= serviceName %>;
    }]);
})();
