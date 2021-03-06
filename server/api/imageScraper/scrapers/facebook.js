'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list = function (url, cb) {
    request(url, function (error, res, body) {
        if (error) {
            cb({
                error: error
            });
        } else {
            var $ = cheerio.load(body);
            setTimeout(function(){
                var pin = {};
                var $url = url;
                // Get data from facebook link
                var elimg = $('.mtm .img');
                var $img = elimg.attr('src');
                var $desc = elimg.attr('alt');

                console.log($img + '  pint url');

                pin = {
                    img: $img,
                    url: $url,
                    desc: $desc
                };

                // Response with the final JSON object
                cb(pin);
            }, 3000);
        }
    });

};
