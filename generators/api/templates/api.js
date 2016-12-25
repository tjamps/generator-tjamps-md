(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .factory('<%= serviceName %>', ['$resource', function <%= serviceName %>Factory($resource) {
      var url = '';
      var defaultParams = {
        id: '@id'
      };
      var actions = {};

      var <%= serviceName %> = $resource(url, defaultParams, actions);

      return <%= serviceName %>;
    }]);
})();
