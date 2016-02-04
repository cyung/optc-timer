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
      var dropTable = ['Loguetown, Jaya', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island, Water 7', 'Orange Town, Little Garden, Long Ring Long Land', 'Shell Town, Whiskey Peak, Ark Maxim', 'Alvida\'s Hideout, Twin Cape, Angel Island'];
      var staminaTable = ['Orange Town, Drum Island, Water 7', 'Shell Town, Little Garden, Long Ring Long Land', 'Alvida\'s Hideout, Whiskey Peak, Ark Maxim', 'Fuschia Village, Twin Cape, Angel Island', 'Loguetown, Jaya', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase'];
      var beliTable = ['Baratie, Whiskey Peak, Ark Maxim', 'Syrup Village, Twin Cape, Angel Island', 'Loguetown, Jaya', 'Arlong Park, Alubarna', 'Baratie, Nanohana Rainbase', 'Syrup Village, Drum Island, Water 7', 'Orange Town, Little Garden, Long Ring Long Land'];

      if (version === 'japan') {
        dropTable = ['Loguetown, Jaya, Thriller Bark 1', 'Arlong Park, Alubarna, Enies Lobby 2', 'Baratie, Nanohana Rainbase, Enies Lobby 1', 'Syrup Village, Drum Island, Water 7', 'Orange Town, Little Garden, Long Ring Long Land', 'Shell Town, Whiskey Peak, Ark Maxim', 'Alvida\'s Hideout, Twin Cape, Angel Island'];
        staminaTable = ['Orange Town, Drum Island, Water 7', 'Shell Town, Little Garden, Long Ring Long Land', 'Alvida\'s Hideout, Whiskey Peak, Ark Maxim', 'Fuschia Village, Twin Cape, Angel Island', 'Loguetown, Jaya, Thriller Bark 1', 'Arlong Park, Alubarna, Enies Lobby 2', 'Baratie, Nanohana Rainbase, Enies Lobby 1'];
        beliTable = ['Baratie, Whiskey Peak, Ark Maxim', 'Syrup Village, Twin Cape, Angel Island, Thriller Bark 2', 'Loguetown, Jaya, Thriller Bark 1', 'Arlong Park, Alubarna, Enies Lobby 2', 'Baratie, Nanohana Rainbase, Enies Lobby 1', 'Syrup Village, Drum Island, Water 7', 'Orange Town, Little Garden, Long Ring Long Land'];
      }
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

        var hourOffset = (version === 'global') ? 23 : 11;
        var end = startDate.clone().add(hourOffset, 'hours').add(59, 'minutes');
        var date = startDate.format('YYYY-MM-DD');
        var hourString = startDate.format('HH:mm') + '-' + end.format('HH:mm');

        return {
          date: date,
          hourDisplay: hourString,
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
