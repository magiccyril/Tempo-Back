'use strict';

/**
 * @ngdoc function
 * @name tempoAdminApp.controller:TempoCtrl
 * @description
 * # TempoCtrl
 * Controller of the tempoAdminApp
 */
angular.module('tempoAdminApp')
  .controller('TempoCtrl', ['$scope', 'Tempo', function ($scope, Tempo) {
    $scope.date = moment();

    Tempo.getYear($scope.date).then(function (data) {
      $scope.data = data;
    });
  }]);
