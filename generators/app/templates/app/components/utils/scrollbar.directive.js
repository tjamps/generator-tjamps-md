(function() {
  'use strict';

  angular
    .module('app.utils')
    .directive('appScrollbar', ['$window', '$log', '$rootScope', '$timeout', function appScrollbarDirective($window, $log, $rootScope, $timeout) {
      var appScrollbar = {};

      appScrollbar.restrict = 'A';

      appScrollbar.scope = {
        scrollbarOptions: '=',
        scrollbarWatch: '=?',
        scrollbarWatchCollection: '=?'
      };

      appScrollbar.link = function(scope, element, attrs) {
        if (!$window.Ps) {
          $log.error('Cannot initialize Perfect scrollbar : plugin not found.');
        }

        var container = element[0];

        /**
         * Update scrollbar on next digest cycle.
         */
        var delayedUpdate = function() {
          $timeout(function() {
            $log.debug('Updating app scrollbar');
            $window.Ps.update(container);
          });
        };

        // https://github.com/noraesae/perfect-scrollbar#optional-parameters
        var defaultOptions = {
          wheelSpeed: 1,
          wheelPropagation: true
        };
        var options = angular.extend({}, defaultOptions, scope.scrollbarOptions);

        $window.Ps.initialize(container, options);

        // Update scrollbar when the browser is resized
        angular.element($window).on('resize', function() {
          delayedUpdate();
        });

        // Isolated scope means we need to listen on $rootScope
        $rootScope.$on('$viewContentLoaded', function() {
          if (attrs.appScrollbar === 'autoscroll') {
            element.scrollTop(0);
          }
          delayedUpdate();
        });

        // Set watcher to update scrollbar when content changes
        scope.$watch('scrollbarWatch', function(newValue, oldValue) {
          console.log('watch');
          if (newValue !== oldValue) {
            delayedUpdate();
          }
        });

        // Set watcher to update scrollbar when content changes
        scope.$watchCollection('scrollbarWatchCollection', function(newValue, oldValue) {
          console.log('watchCollection');
          if (newValue !== oldValue) {
            delayedUpdate();
          }
        });

        // Free resources
        scope.$on('$destroy', function() {
          $log.debug('Destroying app scrollbar');
          $window.Ps.destroy(container);
        });
      };

      return appScrollbar;
    }]);
})();
