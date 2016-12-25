(function() {
  'use strict';

  angular
    .module('<%= params.moduleName %>')
    .controller('<%= params.name %>Controller', [<% if (! params.controllerAs) { %>'$scope', <% } %>function <%= params.name %>Controller(<% if (! params.controllerAs) { %>$scope<% } %>) {
      <% if (params.controllerAs) { %>var vm = this;
      console.log(vm); // Make jshint happy, remove it when you start coding.<% } %>
    }]);
})();
