'use strict';

/**
 * @ngdoc overview
 * @name tempoApp
 * @description
 * # tempoApp
 *
 * Main module of the application.
 */
angular
  .module('tempoApp', [
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  }]);
