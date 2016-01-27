(function() {
  'use strict';

  angular.module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['adminFactory'];

  function AdminCtrl(adminFactory) {
    var self = this;
    self.globalDates = [];
    self.japanDates = [];
    self.globalSelected = [];
    self.japanSelected = [];

    activate();

    self.addBoth = function() {
      self.addDate('global');
      self.addDate('japan');
    };

    self.addDate = function(version) {
      var date = self.turtleDate.toISOString().slice(0, 10);
      adminFactory.addTurtleDate(date, version, function(err) {
        if (err) {
          console.log('err =', err);
          return;
        }

        // TO-DO: add toast notification
        console.log('Added turtle date');
        activate();
      });
    }

    self.removeSelectedDates = function() {
      var dates = self.globalSelected.map(function(date) {
        return {
          turtleDate: date,
          version: 'global',
        };
      }).concat(self.japanSelected.map(function(date) {
        return {
          turtleDate: date,
          version: 'japan',
        };
      }));

      adminFactory.removeTurtleDates(dates, function(err) {
        if (err) {
          console.log('err =', err);
          return;
        }

        activate();
      });
    };

    self.removePastDates = function() {
      var oldDates = getPastDates('global').concat(getPastDates('japan'));

      console.log('oldDates =', oldDates);
      adminFactory.removeTurtleDates(oldDates, function(err) {
        if (err) {
          console.log('err =', err);
          return;
        }

        console.log('removed old dates');

        activate();
      });

      function getPastDates(version) {
        var oldDates = (version === 'global') ? 
          self.globalDates.slice().reverse() : self.japanDates.slice().reverse();

        var oldDates = oldDates.filter(function(date) {
          return moment.utc(date).add(1, 'days').isBefore(moment.utc())
        }).map(function(date) {
          return {
            turtleDate: date,
            version: version,
          };
        });

        // remove past dates in multiples of 5
        oldDates = oldDates.slice(0, Math.floor(oldDates.length/5)*5);

        return oldDates;
      }
    }

    self.addQuarter = function() {
      adminFactory.addQuarter(function(err) {
        if (err) {
          console.log('err =', err);
        }

        activate();
      })
    };

    function activate() {
      adminFactory.getTurtleDates(function(err, globalDates, japanDates) {
        if (err) {
          console.log('err =', err);
          return;
        }

        self.globalDates = globalDates;
        self.japanDates = japanDates;
      });
    }

  }

})();
