'use strict';

angular.module('tempoAdminApp')
  .directive('ejpcalendar', [function() {
    return {
      link: function (scope) {
        function getCalendar(inputMomentDate) {
          var calendarFirstDate = moment(inputMomentDate).startOf('month');
          var date = calendarFirstDate.clone();

          var calendar = [];
          for (var i = 0; i < 12; i++) {
            calendar[i] = {
              'format': date.format('MMM<br/>YY'),
              'days': []
            };

            var firstDayOfMonth = date.clone();
            var lastDayOfMonth = date.clone().endOf('month');
            var nbOfDayInMonth = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;

            for (var j = 0; j < nbOfDayInMonth; j++) {
              var data = {
                north: undefined,
                paca: undefined,
                west: undefined,
                south: undefined
              };

              if (scope.events && scope.events[date.format('YYYY-MM-DD')]) {
                data.north = scope.events[date.format('YYYY-MM-DD')].north.raw;
                data.paca = scope.events[date.format('YYYY-MM-DD')].paca.raw;
                data.west = scope.events[date.format('YYYY-MM-DD')].west.raw;
                data.south = scope.events[date.format('YYYY-MM-DD')].south.raw;
              }

              calendar[i].days.push({
                date: date.clone(),
                data: data
              });
              date = date.add(1, 'days');
            }
          }

          return calendar;
        }

        scope.days = [];
        for (var i = 0; i < 31; i++) {
          scope.days.push(i + 1);
        }

        scope.$watch('date', function() {
          scope.calendar = getCalendar(scope.date);
        });

        scope.$watch('events', function() {
          scope.calendar = getCalendar(scope.date);
        });
      },
      restrict: 'E',
      scope: {
        date: '=divonaDate',
        events:'=ngModel',
        onDayDblClick: '=ngDblclick',
        onDayZoneClick: '=ngClick'
      },
      templateUrl: 'views/directives/ejpcalendar.html',
      transclude: true
    };
  }]);
