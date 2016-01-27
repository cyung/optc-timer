(function() {
  'use strict';

  angular.module('app')
  .factory('calendarFactory', calendarFactory);

  calendarFactory.$inject = ['userFactory'];

  function calendarFactory(userFactory) {
    var services = {
      getCalendar: getCalendar,
    };

    return services;

    function getCalendar() {
      var now = moment();

      var turtleTimes = userFactory.getTurtleTimes().filter(function(turtleTime) {
        return now.isBefore(turtleTime);
      });

      var cal = ics();
      var subject = 'OPTC Turtle Time';
      var description = 'One Piece Treasure Cruise Turtle Time';
      var location = 'OPTC';

      var begin, end;

      for (var i = 0; i < 4; i++) {
        begin = turtleTimes[i].format();
        end = turtleTimes[i].clone().add(30, 'minutes').format();
        cal.addEvent(subject, description, location, begin, end);
      }

      cal.download('turtle_times', '.ics');
    }
  }

})();