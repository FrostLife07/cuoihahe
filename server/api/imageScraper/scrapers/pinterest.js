'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb) {
  request(url, function(error, res, body) {
    if (error) {
      cb({
        error: error
      });
    } else {
      var $ = cheerio.load(body);
      var pin = {};
      var $url = url;

      // Get data from pinterest link
      var $img = $('.heightContainer img').attr('src');
      var $desc = $('.heightContainer img').attr('alt');

      console.log($img + '  pint url');

      pin = {
        img: $img,
        url: $url,
        desc: $desc
      };

      // Response with the final JSON object
      cb(pin);

    }

  });
  
};
