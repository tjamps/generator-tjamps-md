(function() {
  'use strict';

  angular
    .module('app.api')
    .provider('apiService', ['$httpProvider', '$resourceProvider',
      function apiServiceProvider($httpProvider, $resourceProvider) {
        // Init provider
        (function initApiServiceProvider() {
          var defaultTransformResponse = function() {
            return $httpProvider.defaults.transformResponse.concat(function(data, headers) {
              return {
                data: data,
                headers: headers()
              };
            });
          };

          var defaultTransformRequest = function() {
            return [function(data) {
              var clonedData = angular.copy(data);

              delete clonedData.id;

              return clonedData;
            }].concat($httpProvider.defaults.transformRequest);
          };

          // Augment and override default $resource actions, using more
          // meaningful names.
          $resourceProvider.defaults.actions = {
            create: {
              method: 'POST',
              transformResponse: defaultTransformResponse(),
              transformRequest: defaultTransformRequest()
            },
            update: {
              method: 'PUT',
              transformResponse: defaultTransformResponse(),
              transformRequest: defaultTransformRequest()
            },
            get: {
              method: 'GET',
              transformResponse: defaultTransformResponse()
            },
            getList: {
              method: 'GET',
              transformResponse: defaultTransformResponse()
            },
            delete: {
              method: 'DELETE',
              transformResponse: defaultTransformResponse(),
              transformRequest: defaultTransformRequest()
            },
            patch: {
              method: 'PATCH',
              transformResponse: defaultTransformResponse(),
              transformRequest: defaultTransformRequest()
            }
          };
        })();

        // Factory method
        this.$get = ['$http', function apiServiceFactory($http) {
          var apiService = {};

          /**
           * @param function|Array<function> tranform
           */
          apiService.appendTransformResponse = function(transform) {
            return $http.defaults.transformResponse.concat(transform);
          };

          /**
           * @param function|Array<function> tranform
           */
          apiService.prependTransformRequest = function(transform) {
            if (!angular.isArray(transform)) {
              transform = [transform];
            }

            return transform.concat($http.defaults.transformResponse);
          };

          return apiService;
        }];
      }]);
})();
