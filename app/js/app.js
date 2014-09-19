'use strict';

/**
 * @ngdoc overview
 * @name tempoAdminApp
 * @description
 * # tempoAdminApp
 *
 * Main module of the application.
 */
angular
  .module('tempoAdminApp', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'divonaEjp',
    'divonaForecast',
    'divonaTempo'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/tempo', {
        templateUrl: 'partials/tempo.html',
        controller: 'TempoCtrl'
      }).
      when('/ejp', {
        templateUrl: 'partials/ejp.html',
        controller: 'EjpCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
