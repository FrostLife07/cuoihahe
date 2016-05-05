(function () {
    'use strict';

    angular
            .module('app')
            .controller('LookCtrl', LookCtrl);

    LookCtrl.$inject = ['$scope', '$stateParams', 'looksAPI', 'commentAPI', 'Auth', '$sce'];

    function LookCtrl($scope, $stateParams, looksAPI, commentAPI, Auth, $sce) {

        $scope.user = Auth.getCurrentUser();
        $scope.id = $stateParams.lookId;
        $scope.popLooks = [];

        looksAPI.findOneLook($scope.id)
                .then(function (data) {
                    //vanlam
                    if(data.data.type === 'youtube'){
                        data.data.embedUrl = $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+looksAPI.getYoutubeId(data.data.linkURL));
                    }
                    $scope.look = data.data;
                    // Add view to a look when page begins load
                    addView();
                })
                .catch(function (error) {
                    console.log('Failed to get look ', error);
                });

        looksAPI.popLooks($scope.id)
                .then(function (data) {
                    console.log(data);
                    $scope.popLooks = data.data;
                })
                .catch(function (error) {
                    console.log('Failed to get pop look ', error);
                });

        // Get all comments
        commentAPI.getComments($scope.id)
                .then(function (data) {
                    console.log(data);
                    $scope.comments = data.data;
                })
                .catch(function (error) {
                    console.log('Failed to get comments ' + error);
                });


        // Add vote in look view
        $scope.addVote = function (look) {
            looksAPI.upVoteLook(look)
                    .then(function (data) {
                        console.log(data);
                        look.upVotes++;
                    })
                    .catch(function (error) {
                        console.log('Failed adding upvote');
                    });
        };

        // Post a comment to specific look
        $scope.postComment = function () {
            var comment = {
                authorId: $scope.user._id,
                authorName: $scope.user.name,
                authorEmail: $scope.user.email,
                gravatar: $scope.user.gravatar,
                comment: $scope.comment.body,
                lookId: $scope.id
            };

            // Use commentAPI to send request to server
            commentAPI.addComment(comment)
                    .then(function (data) {
                        console.log(data);
                        $scope.comment.body = '';
                        $scope.comments.splice(0, 0, data.data);
                    })
                    .catch(function (error) {
                        console.log('Failed to add a new comment: ' + error);
                    });

        };

        function addView() {
            looksAPI.addView($scope.id)
                    .then(function (res) {
                        console.log('View added to Look');
                        console.log(res);
                    })
                    .catch(function (error) {
                        console.log('Failed to increment views ', error);
                    });
        }

    }

}());
