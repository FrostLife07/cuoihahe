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
            var pin = {};
            var $url = url;

            // Get data from pinterest link
            var $img = $('.content-detail .badge-item-img').attr('src');
            if($img.indexOf('http') === -1){
                $img = 'http:'+$img;
            }
            var $desc = $('.content-detail .badge-item-img').attr('alt');

//            console.log($img + '  pint url');

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
