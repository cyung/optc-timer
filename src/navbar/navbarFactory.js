(function() {
  'use strict';

  angular.module('app')
  .factory('navbarFactory', navbarFactory);

  navbarFactory.$inject = [];

  function navbarFactory() {
    var services = {
      getSeo: getSeo,
      setSeo: setSeo,
    };

    var seo = {
      pageTitle: 'OPTC Timer',
      description: 'Supplement app for One Piece Treasure Cruise to help calculate your turtle times and set notifications.',
    };


    return services;

    function getSeo() {
      return seo;
    }

    function setSeo(title, description) {
      seo.pageTitle = title;
      seo.description = description;

      return seo;
    }
  }

})();