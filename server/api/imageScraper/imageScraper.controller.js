'use strict';

var scrapers = {};

scrapers['pinterest'] = require('./scrapers/pinterest');

exports.scrape = function(req, res) {
  var url = req.body.url;
  var scraperToUse;

  if(url.indexOf('pinterest') > -1) {
    scraperToUse = 'pinterest';
  } else {
    console.log('Cannot locate scraper');
  }

  scrapers[scraperToUse].list(url, function(data) {
    console.log('Data from scraper: ', data);
    res.json(data);
  });

};
