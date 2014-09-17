'use strict';

/**
 * @ngdoc function
 * @name tempoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tempoApp
 */
angular.module('tempoApp')
  .controller('MainCtrl', ['$scope', 'Forecast', 'Tempo', 'EJP', function ($scope, Forecast, Tempo, EJP) {
    $scope.onCalendarTypeClick = function () {
      $scope.showCalendarType = !$scope.showCalendarType;
    };
    $scope.onCalendarTypeChange = function () {
      $scope.showCalendarType = false;
      $scope.calendarLoadData();
    };
    $scope.calendarTypeFormat = function (type) {
      switch (type) {
        case 'tempo':
          return 'Tempo';

        case 'ejp-north':
          return 'EJP Nord';

        case 'ejp-paca':
          return 'EJP PACA';

        case 'ejp-west':
          return 'EJP Ouest';

        case 'ejp-south':
          return 'EJP Sud';
      }
    };

    $scope.calendarLoadData = function () {
      switch ($scope.calendarType) {
        case 'tempo':
          Tempo.getYear($scope.calendarDate).then(function (data) {
            $scope.calendarEvents = data;
          });
          break;

        case 'ejp-north':
          EJP.getYear('north', $scope.calendarDate).then(function (data) {
            $scope.calendarEvents = data;
          });
          break;

        case 'ejp-paca':
          EJP.getYear('paca', $scope.calendarDate).then(function (data) {
            $scope.calendarEvents = data;
          });
          break;

        case 'ejp-west':
          EJP.getYear('west', $scope.calendarDate).then(function (data) {
            $scope.calendarEvents = data;
          });
          break;

        case 'ejp-south':
          EJP.getYear('south', $scope.calendarDate).then(function (data) {
            $scope.calendarEvents = data;
          });
          break;
      }
    };

    $scope.changeYear = function (momentDate) {
      $scope.calendarDate   = momentDate;
      $scope.previousYear   = moment(momentDate).subtract(1, 'year');
      $scope.nextYear       = moment(momentDate).add(1, 'year');
      $scope.today          = moment();

      $scope.calendarLoadData();
    };

    function onDayClickTempo (day) {
      var newColor = day.data;
      switch (day.data) {
        case 'blue':
          newColor = 'white';
          break;

        case 'white':
          newColor = 'red';
          break;

        case 'red':
          newColor = '';
          break;

        default:
          newColor = 'blue';
          break;
      }

      if (newColor) {
        Tempo.save('APIKEY', day.date, newColor).then(function (data) {
          day.data = newColor;
        }, function (reason) {
          alert(reason);
        });
      }
    }

    function onDayClickEJP (day) {
      var newColor = day.data;
      /*switch (day.data) {
        case 'blue':
          newColor = 'white';
          break;

        case 'white':
          newColor = 'red';
          break;

        case 'red':
          newColor = '';
          break;

        default:
          newColor = 'blue';
          break;
      }

      if (newColor) {
        Tempo.save('APIKEY', day.date, newColor).then(function (data) {
          day.data = newColor;
        }, function (reason) {
          alert(reason);
        });
      }
      */
    }

    $scope.onDayClick = function (day) {
      switch ($scope.calendarType) {
        case 'tempo':
          onDayClickTempo(day);
          break;

        case 'ejp-north':
        case 'ejp-paca':
        case 'ejp-west':
        case 'ejp-south':
          onDayClickEJP(day);
          break;
      }
    };

    $scope.showCalendarType = false;
    $scope.calendarType     = 'tempo';
    $scope.changeYear(moment());
    $scope.calendarEvents   = [];

    $scope.todayDate        = moment();
    $scope.tomorrowDate     = moment().add(1, 'days');
    if (moment().hours > 0 && moment.hours < 6) {
      $scope.todayDate.subtract(1, 'days');
      $scope.tomorrowDate.subtract(1, 'days');
    }
  }]);
