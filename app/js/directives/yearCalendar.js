'use strict';

angular.module('tempoAdminApp')
  .directive('yearcalendar', [function() {
    return {
      link: function (scope) {
        function getCalendar(inputMomentDate) {
          var calendarFirstDate = moment(inputMomentDate).startOf('year');
          var date = calendarFirstDate.clone();

          var calendar = [];
          for (var i = 0; i < 12; i++) {
            calendar[i] = {
              'format': date.format('MMM'),
              'days': []
            };

            var firstDayOfMonth = date.clone();
            var lastDayOfMonth = date.clone().endOf('month');
            var nbOfDayInMonth = lastDayOfMonth.diff(firstDayOfMonth, 'days') + 1;

            for (var j = 0; j < nbOfDayInMonth; j++) {
              var data = '';
              if (scope.events[date.format('YYYY-MM-DD')]) {
                data = scope.events[date.format('YYYY-MM-DD')].raw;
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

        scope.$watch('date', function() {
          scope.calendar = getCalendar(scope.date);
        });

        scope.$watch('events', function() {
          scope.calendar = getCalendar(scope.date);
        });
      },
      restrict: 'E',
      scope: {
        date: '=date',
        events:'=ngModel',
        onDayClick: '=ngClick'
      },
      templateUrl: '/js/directives/yearCalendar.html',
      transclude: true
    };
  }]);
