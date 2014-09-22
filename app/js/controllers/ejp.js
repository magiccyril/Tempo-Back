'use strict';

/**
 * @ngdoc function
 * @name tempoAdminApp.controller:EjpCtrl
 * @description
 * # EjpCtrl
 * Controller of the tempoAdminApp
 */
angular.module('tempoAdminApp')
  .controller('EjpCtrl', [
    '$scope',
    '$timeout',
    'Utils',
    'EJP',
    function ($scope, $timeout, Utils, EJP) {
      $scope.utils = Utils;
      $scope.date = EJP.getStartDate();
      $scope.$watch('date', function() {
        $scope.loadData();
      });

      $scope.loadData = function () {
        EJP.getYearByDate($scope.date, true).then(function (dataFirstPart) {
          EJP.getYearByDate($scope.date.clone().add(1, 'year'), true).then(function (dataSecondPart) {
            $scope.data = angular.extend(dataFirstPart, dataSecondPart);
          });
        });
      };

      $scope.changeYear = function (date) {
        $scope.date = date;
      };

      var sendToApiDelay = {};
      $scope.onCalendarDayZoneClick = function (day, zone) {
        $timeout.cancel(sendToApiDelay[day.date.unix()]);

        var nextVal = undefined;
        if (false === day.data[zone]) {
          nextVal = true;
        }
        if (true === day.data[zone]) {
          nextVal = undefined;
        }
        if (undefined === day.data[zone]) {
          nextVal = false;
        }

        var apikey = $scope.utils.apikey;
        if (!apikey) {
          alert('Please enter APIKEY');
          return;
        }

        day.data[zone] = nextVal;

        var zones = {};
        for (var zoneName in day.data) {
          zones[zoneName] = day.data[zoneName];
        }

        var allZonesDefined = 'boolean' === typeof zones.north && 'boolean' === typeof zones.paca && 'boolean' === typeof zones.west && 'boolean' === typeof zones.south;
        var allZonesUndefined = undefined === zones.north && undefined === zones.paca && undefined === zones.west && undefined === zones.south;

        sendToApiDelay[day.date.unix()] = $timeout(function() {
          if (allZonesDefined) {
            EJP.save(apikey, day.date, zones).then(function () {
              day.data = zones;
            }, function () {
              day.data = {
                north: undefined,
                paca: undefined,
                west: undefined,
                south: undefined
              };
            });
          }

          if (allZonesUndefined) {
            EJP.delete(apikey, day.date).then(function () {
              day.data = {
                north: undefined,
                paca: undefined,
                west: undefined,
                south: undefined
              };
            });
          }
        }, 1500);
      };

      $scope.onCalendarDayDblClick = function (day) {
        var apikey = $scope.utils.apikey;
        if (!apikey) {
          alert('Please enter APIKEY');
          return;
        }

        var zones = {
          north: false,
          paca: false,
          west: false,
          south: false
        };

        EJP.save(apikey, day.date, zones).then(function () {
          day.data = zones;
        }, function () {
          day.data = {
            north: undefined,
            paca: undefined,
            west: undefined,
            south: undefined
          };
        });
      };
  }]);
