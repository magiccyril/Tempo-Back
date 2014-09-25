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
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).
      when('/tempo', {
        templateUrl: 'views/tempo.html',
        controller: 'TempoCtrl'
      }).
      when('/ejp', {
        templateUrl: 'views/ejp.html',
        controller: 'EjpCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
