angular.module('adService', [])
        .factory('lookApi', function ($http) {
            var factory = {};
            factory.getAll = function () {
                return $http.get('/api/look/getAllLooks');
            };
            factory.update = function (lookId, editLook) {
                return $http.put('/api/look/' + lookId, editLook);
            };
            factory.delete = function (lookId) {
                return $http.delete('/api/look/' + lookId);
            };
            return factory;
        })
        .factory('userApi', function ($http) {
            var factory = {};
            factory.getAll = function () {
                return $http.get('/api/users/getAll');
            };
            factory.update = function (userId, editUser) {
                return $http.put('/api/users/' + userId, editUser);
            };
            factory.delete = function (lookId) {
                return $http.delete('api/users/' + lookId);
            };
            return factory;
        })
        .factory('commentApi', function ($http) {
            var factory = {};
            factory.getAll = function(){
                return $http.get('/api/comments/all');
            };
            factory.update = function(comment){
                return $http.put('/api/comments/'+comment._id, comment);
            };
            factory.delete = function(commentId){
                return $http.delete('/api/comments/'+commentId);
            };
            return factory;
        });

