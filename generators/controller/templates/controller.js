(function() {
  'use strict';

  angular
    .module('<%= params.moduleName %>')
    .controller('<%= params.name %>', [<% if (! params.controllerAs) { %>'$scope', <% } %>function <%= params.name %>(<% if (! params.controllerAs) { %>$scope<% } %>) {
      <% if (params.controllerAs) { %>var vm = this;<% } %>

    }]);
})();
