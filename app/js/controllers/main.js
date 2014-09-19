'use strict';

/**
 * @ngdoc function
 * @name tempoAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tempoAdminApp
 */
angular.module('tempoAdminApp')
  .controller('MainCtrl', ['$scope', 'Utils', function ($scope, Utils) {
    $scope.utils = Utils;
  }]);
