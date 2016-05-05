'use strict';

var scrapers = {};

scrapers['pinterest'] = require('./scrapers/pinterest');

scrapers['facebook'] = require('./scrapers/facebook');
scrapers['youtube'] = require('./scrapers/youtube');
scrapers['haivn'] = require('./scrapers/haivn');
scrapers['giphy'] = require('./scrapers/giphy');

exports.scrape = function (req, res) {
    var url = req.body.url;
    var scraperToUse;

    if (url.indexOf('pinterest') > -1) {
        scraperToUse = 'pinterest';
    } else if (url.indexOf('facebook') > -1) {
        scraperToUse = 'facebook';
    } else if (url.indexOf('youtube') > -1){
        scraperToUse = 'youtube';
    }else if(url.indexOf('haivn') > -1){
        scraperToUse = 'haivn';
    }else if(url.indexOf('giphy') > -1){
        scraperToUse = 'giphy';
    }else{
        console.log('Cannot locate scraper');
    }

    scrapers[scraperToUse].list(url, function (data) {
        console.log('Data from scraper: ', data);
        res.json(data);
    });

};
