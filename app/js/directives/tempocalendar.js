'use strict';

angular.module('tempoAdminApp')
  .directive('tempocalendar', [function() {
    return {
      link: function (scope) {
        function getCalendar(inputMomentDate) {
          var calendarFirstDate = moment(inputMomentDate).startOf('month');
          var date = calendarFirstDate.clone();

          var calendar = [];
          for (var i = 0; i < 12; i++) {
            calendar[i] = {
              'format': date.format('MMM YY'),
              'days': []
            };

            var firstDayOfMonth = date.clone();
            var lastDayOfMonth = date.clone().endOf('month');
            var nbOfDayInMonth = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;

            for (var j = 0; j < nbOfDayInMonth; j++) {
              var data = {
                raw: 'undefined',
                formated: '-'
              };
              if (scope.events[date.format('YYYY-MM-DD')]) {
                data = scope.events[date.format('YYYY-MM-DD')];
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
        onDayClick: '=ngClick'
      },
      templateUrl: '/js/directives/tempocalendar.html',
      transclude: true
    };
  }]);
