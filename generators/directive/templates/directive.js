(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .directive('<%= params.name %>', [function <%= params.name %>Directive() {
      var <%= params.name %> = {};

      <% if (restrict) { %><%= params.name %>.restrict = '<%= restrict %>'; <% } %>
      <% if (params.template) { %><%= params.name %>.templateUrl = '<%= params.templateUrl %>';<% } %>
      <% if (params.link) { %><%= params.name %>.link = function(scope, element, attrs) {
        console.log(scope, element, attrs); // Make jshint happy, remove it when you start coding.
      };<% } %>

      return <%= params.name %>;
    }]);
})();
