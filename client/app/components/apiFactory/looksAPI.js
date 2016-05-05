(function () {
    'use strict';

    angular
            .module('app')
            .factory('looksAPI', looksAPI);


    looksAPI.$inject = ['$http'];

    function looksAPI($http) {
        return {
            createScrapeLook: createScrapeLook,
            getAllLooks: getAllLooks,
            getUserLooks: getUserLooks,
            findOneLook: findOneLook,
            getUpdateLook: getUpdateLook,
            popLooks: popLooks,
            updateLook: updateLook,
            deleteLook: deleteLook,
            upVoteLook: upVoteLook,
            addView: addView,
            getYoutubeId: getYoutubeId
        };

        function createScrapeLook(look) {
            return $http.post('/api/look/scrapeUpload', look);
        }

        function getAllLooks() {
            return $http.get('/api/look/getAllLooks', {
                cache: true
            });
        }

        function getUserLooks(id) {
            return $http.get('/api/look/getUserLooks/?email=' + id, {
                cache: true
            });
        }

        function findOneLook(look) {
            return $http.get('/api/look/' + look);
        }

        function popLooks(look) {
            return $http.get('/api/look/popLooks/' + look);
        }

        function getUpdateLook(look) {
            return $http.get('/api/look/' + look._id);
        }

        function updateLook(look) {
            return $http.put('/api/look/' + look._id, look);
        }

        function deleteLook(look) {
            return $http.delete('/api/look/' + look._id);
        }

        function upVoteLook(look) {
            return $http.put('/api/look/upvote/' + look._id);
        }

        function addView(look) {
            return $http.put('/api/look/view/' + look);
        }

        function getYoutubeId(url) {
            var ytid = '';
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length === 11) {
                ytid = match[2];
            }
            return ytid;
        }
    }




}());
