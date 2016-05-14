
var ngAd = angular.module('ngAd', [
    'ui.router',
    'adService'
])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                url: '/',
                templateUrl: 'parts/home.html',
                controller: 'homeCtrl'
            }).state('looks', {
                url: '/look',
                templateUrl: 'parts/look/index.html',
                controller: 'lookCtrl'
            }).state('users', {
                url: '/users',
                templateUrl: 'parts/user/index.html',
                controller: 'userCtrl'
            }).state('comments', {
                url: '/comments',
                templateUrl: 'parts/comment/index.html',
                controller: 'commentCtrl'
            });
            $urlRouterProvider.otherwise('/');
        });

ngAd
        .controller('homeCtrl', function ($rootScope) {
            
        })
        .controller('lookCtrl', function ($scope, lookApi, $window) {
            $scope.looks = [];
            lookApi.getAll().success(function (data) {
                $scope.looks = data;
            });

            $scope.editLook = '';
            $scope.editModalLink = 'parts/look/editModal.html';
            $scope.editLookModal = function (look) {
                $scope.editLook = look;
            };

            $scope.updateLook = function () {
                lookApi.update($scope.editLook._id, $scope.editLook).success(function () {
                    $scope.editLook = '';
                    $scope.successMess = 'Update successfully!';
                }).error(function (err) {
                    console.log(err);
                    $scope.errorMess = 'Not update!';
                });
            };

            $scope.delLook = function (look) {
                lookApi.delete(look._id).success(function () {
                    $window.location.reload();
                }).error(function (err) {
                    console.log(err);
                });
            };
        })
        .controller('userCtrl', function ($scope, userApi) {
            $scope.users = [];
            $scope.users.push({
                "_id": "57288491a9154764248ac123",
                "provider": "local",
                "gravatar": "//www.gravatar.com/avatar/582a2be215f1266bb5d8b51e45533e54?s=40&d=retro",
                "name": "vanlam",
                "email": "vanlam0705@gmail.com",
                "hashedPassword": "qxdtVU9gVGxUSP9sNySSMQI38FWv5fB/DwfCTu8P5YK8jGIX8mVxpJV3eccvkSlM6N7fPaBDodoIf4WAjV5M8g==",
                "salt": "lcD1g2hNy3i6Gn/3MdBQAg==",
                "role": "user",
                "__v": 0
            });

//            userApi.getAll().success(function (data) {
//                $scope.users = data;
//                console.log($scope.users);
//            });

            $scope.editUser = '';
            $scope.editModalLink = 'parts/user/editModal.html';
            $scope.editLookModal = function (user) {
                $scope.editUser = user;
            };

            $scope.delUser = function (user) {

            };
        })
        .controller('commentCtrl', function ($scope, commentApi, $window) {
            $scope.comments = [];
            commentApi.getAll().success(function (data) {
                $scope.comments = data;
                console.log(data);
            });
            $scope.editComment = '';
            $scope.editModalLink = 'parts/comment/editModal.html';
            $scope.editLookModal = function (comment) {
                $scope.editComment = comment;
            };

            $scope.updateComment = function () {
                commentApi.update($scope.editComment).success(function (data) {
                    $scope.editComment = data.comment;
                    $scope.successMess = data.message;
                }).error(function (err) {
                    console.log(err);
                    $scope.errorMess = err.message;
                });
            };

            $scope.delComment = function (comment) {
                commentApi.delete(comment._id).success(function (data) {
                    $scope.successMess = data.message;
                    $window.location.reload();
                }).error(function (err) {
                    console.log(err);
                });
            };
        });

ngAd
        .directive('ngConfirmClick', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    element.bind('click', function (e) {
                        var message = attrs.ngConfirmClick;
                        if (message && !confirm(message)) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                        }
                    });
                }
            };
        });




