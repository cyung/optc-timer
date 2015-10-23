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
      var digit = userFactory.getDigit();
      var version = userFactory.getVersion();

      var eventTimes;
      if (version === 'global')
        eventTimes = getGlobalTimes();
      else
        eventTimes = getJapanTimes();

      return eventTimes;
    }

    function getGlobalTimes() {
      var NUM_DAYS = 5;
      var dropTable = ['Loguetown', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island', 'Orange Town, Little Garden', 'Shell Town, Whiskey Peak', "Alvida's Hideout, Twin Cape"];
      var staminaTable = ['Orange Town, Drum Island', 'Shell Town, Little Garden', "Alvida's Hideout, Whiskey Peak", 'Fuschia Village, Twin Cape', 'Loguetown', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase'];
      var beliTable = ['Baratie, Whiskey Peak', 'Syrup Village, Twin Cape', 'Loguetown', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island', 'Little Garden'];
      var start = getStartTime();
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
        var date = start.clone().add(dayNum, 'days').format('YYYY-MM-DD');

        return {
          date: date,
          drop: drop,
          stamina: stamina,
          beli: beli,
        }
      }
    }

    function getJapanTimes() {
      var drop_jpn = ['Loguetown, Jaya', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island', 'Orange Town, Little Garden', 'Shell Town, Whiskey Peak, Ark Maxim', "Alvida's Hideout, Twin Cape"];
      var stamina_jpn = ['Orange Town, Drum Island', 'Shell Town, Little Garden', "Alvida's Hideout, Whiskey Peak", 'Fuschia Village, Twin Cape, Skypia', 'Loguetown, Jaya', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase'];
      var beli_jpn = ['Baratie, Whiskey Peak, Ark Maxim', 'Syrup Village, Twin Cape, Skypia', 'Loguetown, Jaya', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island', 'Little Garden'];
    }

    function getStartTime() {
      var start = moment.utc().startOf('day').add(8, 'hours');
      var now = moment();

      if (now.isAfter(start))
        start.subtract(1, 'day');

      return start;
    }
  }

})();