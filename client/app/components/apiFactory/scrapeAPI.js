(function() {
  'use strict';

  angular
    .module('app')
    .factory('scrapeAPI', scrapeAPI);

  scrapeAPI.$inject = ['$http'];

  function scrapeAPI($http) {
    function getScrapeDetails(link) {
      return $http.post('/api/links/scrape', link);
    }

    return {
      getScrapeDetails: getScrapeDetails
    };

  }

}());
