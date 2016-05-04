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
            
            var ytid = '';
                var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
                if (match && match[2].length === 11){
                    ytid = match[2];
                }
            // Get data from facebook link
            var elimg = $('#eow-title');
            var $img = 'http://img.youtube.com/vi/'+ytid+'/0.jpg';
            var $desc = elimg.attr('title');

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



