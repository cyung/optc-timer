(function() {
  'use strict';

  angular.module('app')
  .factory('barrelFactory', barrelFactory);

  function barrelFactory(userFactory) {
    var services = {
      getBarrelTimes: getBarrelTimes
    };


    return services;

    function getBarrelTimes() {
      var digit = userFactory.getDigit();
      var version = userFactory.getVersion();

      var barrelTimes;

      if (version === 'global')
        barrelTimes = getGlobalTimes(digit);
      else if (version === 'japan')
        barrelTimes = getJapanTimes(digit);

      return barrelTimes;
    }

    function getGlobalTimes(digit) {
      var NUM_DAYS = 5;
      var barrelTimes = [];
      var data = getStartEndTimes('global');
      var start = data.start;
      var end = data.end;
      var hourDisplay = start.clone().local().format('HH:mm') + '-'
        + end.clone().local().format('HH:mm');
      var dayOfYear = start.dayOfYear();
      for (var i = 0; i < NUM_DAYS; i++) {
        barrelTimes.push(getTime(i));
      }

      return barrelTimes;

      function getTime(dayNum) {
        var startOfDay = start.clone().add(dayNum, 'days');
        var wood = [0,5,4,9,3,8,4,9,2,7,3,8,1,6,2,7,0,5,1,6];
        var silver = [1,6,2,7,0,5,1,6,0,5,4,9,3,8,4,9,2,7,3,8];
        var gold   = [3,8,2,7,1,6,0,5,4,9];

        var offset = dayNum + dayOfYear + 4;

        var index1 = (offset*4) % 20;
        var index2 = (offset*2) % 10;

        var woodDigits = wood.slice(index1, index1+4);
        var silverDigits = silver.slice(index1, index1+4);
        var goldDigits = gold.slice(index2, index2+2);
        var date = startOfDay.format('YYYY-MM-DD');
        console.log('date =', date);

        return {
          date: date,
          woodDigits: woodDigits,
          silverDigits: silverDigits,
          goldDigits: goldDigits,
          hourDisplay: hourDisplay,
        };
      }
    }

    function getJapanTimes() {

    }

    function getStartEndTimes(version) {
      var now = moment();
      if (version === 'global') {
        var start = moment.utc().startOf('day').add(12, 'hours');
        var end = start.clone().add(23, 'hours').add(59, 'minutes');;

        if (now.isAfter(end)) {
          start.add(1, 'day');
          end.add(1, 'day');
        }

        return {
          start: start,
          end: end,
        };
      } else if (version === 'japan') {

      }
    }

  }

})();