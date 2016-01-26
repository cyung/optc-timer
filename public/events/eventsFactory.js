(function() {
  'use strict';

  angular.module('app')
  .factory('eventsFactory', eventsFactory);

  eventsFactory.$inject = ['userFactory'];

  function eventsFactory(userFactory) {
    var services = {
      getEventTimes: getEventTimes
    };

    return services;

    function getEventTimes() {
      var version = userFactory.getVersion();
      var NUM_DAYS = 5;
      var dropTable = ['Loguetown', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island', 'Orange Town, Little Garden', 'Shell Town, Whiskey Peak', "Alvida's Hideout, Twin Cape"];
      var staminaTable = ['Orange Town, Drum Island', 'Shell Town, Little Garden', "Alvida's Hideout, Whiskey Peak", 'Fuschia Village, Twin Cape', 'Loguetown', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase'];
      var beliTable = ['Baratie, Whiskey Peak', 'Syrup Village, Twin Cape', 'Loguetown', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island', 'Little Garden'];
      var start = getStartTime(version);
      var dayOfYear = start.dayOfYear();

      var eventTimes = [];

      for (var i = 0; i < NUM_DAYS; i++) {
        eventTimes.push(getTime(i));
      }

      return eventTimes;

      function getTime(dayNum) {
        var offset = dayNum + dayOfYear + 3;
        offset = offset % 7;

        var drop = dropTable[offset].split(',');
        var stamina = staminaTable[offset].split(',');
        var beli = beliTable[offset].split(',');
        var startDate = start.clone().add(dayNum, 'days');

        var date;

        if (userFactory.getDetailedHourStatus()) {
          var end = startDate.clone().add(23, 'hours').add(59, 'minutes');
          date = startDate.format('YYYY-MM-DD') + ' ' 
                  + startDate.format('HH:mm') + '-' 
                  + end.format('HH:mm');
        } else {
          date = startDate.format('YYYY-MM-DD');
        }

        return {
          date: date,
          drop: drop,
          stamina: stamina,
          beli: beli,
        }
      }
    }

    function getStartTime(version) {
      var hourOffset = (version === 'global') ? 8 : 2;
      var start = moment.utc().startOf('day').add(hourOffset, 'hours');
      var now = moment();

      if (now.isAfter(start))
        start.subtract(1, 'day');

      return start;
    }
  }

})();