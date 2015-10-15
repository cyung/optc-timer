(function() {
  'use strict';

  angular.module('app')
  .factory('timeFactory', timeFactory);

  function timeFactory(userFactory) {
    var services = {
      getTurtleTimes: getTurtleTimes,
    };

    var globalHotfix = false;
    var globalHotfixDate = '2015-09-17';
    var japanHotfix = false;
    var japanHotfixDate = '2015-09-17';

    return services;

    function getTurtleTimes() {
      var digit = userFactory.getDigit();
      var timeFormat = userFactory.getTimeFormat();
      var version = userFactory.getVersion();

      var turtleTimes;

      if (version === 'global')
        turtleTimes = getGlobalTimes(digit);
      else if (version === 'japan')
        turtleTimes = getJapanTimes(digit);

      return getFormattedTimes(turtleTimes, timeFormat);
    }

    function getGlobalTimes(digit) {
      // get monday of current week
      var turtleTimes = [];
      var NUM_WEEKS = 2;
      var start = getStartTime('global').start;

      var i=0;
      var secondTime = false;

      while (i<NUM_WEEKS) {
        turtleTimes.push(getTime(i));
        if (secondTime)
          i++;
        secondTime = !secondTime;
      }

      return turtleTimes;

      function getTime(weekNum) {
        var digitOrder = [0,1,2,3,4];
        var turtleTime = start.clone();
        var offset = weekNum + start.isoWeek() + 2;

        offset = offset % 5;

        for (var i = 0; i < offset; i++) 
          digitOrder.unshift(digitOrder.pop());

        for (i = 0; i < weekNum; i++)
          turtleTime.add(1, 'week');

        turtleTime.add(digitOrder[digit]*2, 'hours');

        if (secondTime)
          turtleTime.add(10, 'hours');

        return turtleTime;
      }
    }

    function getJapanTimes(digit) {
      var turtleTimes = [];
      var NUM_DAYS = 4;
      var data = getStartTime('japan');
      var start = data.start;
      var isMonday = data.isMonday;

      for (var i = 0; i < NUM_DAYS; i++) {
        turtleTimes.push(getTime(i, isMonday));
      }


      return turtleTimes;

      function getTime(dayNum, isMonday) {
        var digitOrder = [0,1,2,3,4];
        var turtleTime = start.clone();
        var offset = dayNum + start.isoWeek()*2 + 1;

        if (!isMonday)
          offset += 1;

        offset = offset % 5;
        for (var i = 0; i < offset; i++)
          digitOrder.unshift(digitOrder.pop());

        for (i = 0; i < dayNum; i++) {
          if (isMonday)
            turtleTime.add(4, 'days');
          else
            turtleTime.add(3, 'days');
          isMonday = !isMonday;
        }

        turtleTime.add(digitOrder[digit]*3, 'hours');

        return turtleTime;
      }
    }

    function getStartTime(version) {
      if (version === 'global') {
        var start = moment.utc().startOf('isoWeek').add(13, 'hours');
        var endOfDay = start.clone().add(18, 'hours');
        if (moment().isAfter(endOfDay))
          start.add(1, 'week');

        return {
          start: start,
        };
      }
      else if (version === 'japan') {
        var start = moment.utc().startOf('isoWeek');
        var endOfDay = start.clone().add(18, 'hours');
        var now = moment();
        var isMonday = true;

        if (now.isAfter(endOfDay)) {
          start.add(4, 'days');
          endOfDay.add(4, 'days');
          isMonday = false;
        }

        if (now.isAfter(endOfDay)) {
          start.add(3, 'days');
          isMonday = true;
        }

        return {
          start: start,
          isMonday: isMonday,
        };
      }
    }

    function getFormattedTimes(turtleTimes, timeFormat) {
      return turtleTimes.map(function(turtleTime) {
        var time, date;
        if (timeFormat === 'standard')
          time = turtleTime.local().format('h:mm a');
        else if (timeFormat === 'military')
          time = turtleTime.local().format('HH:mm');

        date = turtleTime.local().format('LL');

        return {
          time: time,
          date: date,
        }
      });
    }
  }

})();