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
