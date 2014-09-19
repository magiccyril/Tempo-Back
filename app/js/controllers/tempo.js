'use strict';

/**
 * @ngdoc function
 * @name tempoAdminApp.controller:TempoCtrl
 * @description
 * # TempoCtrl
 * Controller of the tempoAdminApp
 */
angular.module('tempoAdminApp')
  .controller('TempoCtrl', [
    '$scope',
    '$timeout',
    'Utils',
    'Tempo',
    function ($scope, $timeout, Utils, Tempo) {
      $scope.utils = Utils;
      $scope.date = Tempo.getStartDate();
      $scope.$watch('date', function() {
        $scope.loadData();
      });

      $scope.loadData = function () {
        Tempo.getYear($scope.date, true).then(function (dataFirstPart) {
          Tempo.getYear($scope.date.clone().add(1, 'year'), true).then(function (dataSecondPart) {
            $scope.data = angular.extend(dataFirstPart, dataSecondPart);
          });
        });
      }

      $scope.changeYear = function (date) {
        $scope.date = date;
      };

      var sendToApiDelay = {};
      $scope.onCalendarDayClick = function (day) {
        $timeout.cancel(sendToApiDelay[day.date.unix()]);

        var nextColor = day.data.raw;
        switch (day.data.raw) {
          case 'blue':
            nextColor = 'white';
            break;

          case 'white':
            nextColor = 'red';
            break;

          case 'red':
            nextColor = 'undefined';
            break;

          default:
            nextColor = 'blue';
        }

        if (!$scope.utils.apikey) {
          return;
        }

        day.data.raw = nextColor;

        sendToApiDelay[day.date.unix()] = $timeout(function() {
          if ('undefined' !== nextColor) {
            Tempo.save($scope.utils.apikey, day.date, nextColor).then(function (data) {
              day.data.raw      = nextColor;
              day.data.formated = Tempo.formatColor(day.data.raw);
            });
          }
          else {
            Tempo.delete($scope.utils.apikey, day.date).then(function (data) {
              day.data.raw      = 'undefined';
              day.data.formated = '-';
            });
          }
        }, 1500);
      };
    }
  ]);
