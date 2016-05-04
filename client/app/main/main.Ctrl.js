(function () {
    'use strict';

    var ngApp = angular.module('app');
    ngApp.controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'looksAPI', 'scrapeAPI', '$alert', 'Upload'];

    function MainCtrl($scope, $state, Auth, $modal, looksAPI, scrapeAPI, $alert, Upload) {
        $scope.user = Auth.getCurrentUser();
        $scope.look = {};
        $scope.looks = [];
        $scope.scrapePostForm = true;
        $scope.gotScrapeResults = false;
        $scope.loading = false;

        $scope.title = true;
        $scope.picPreview = true;
        $scope.uploadLookTitle = true;
        $scope.uploadLookForm = false;

        $scope.busy = true;
        $scope.allData = [];
        var step = 3;


        var alertSuccess = $alert({
            title: 'Success',
            content: 'New Look added',
            placement: 'top-right',
            container: '#alertContainer',
            type: 'success',
            duration: 8
        });

        var alertFail = $alert({
            title: 'Not Saved',
            content: 'New look failed to save',
            placement: 'top-right',
            container: '#alertContainer',
            type: 'warning',
            duration: 8
        });

        var myModal = $modal({
            scope: $scope,
            show: false
        });

        $scope.showModal = function () {
            myModal.$promise.then(myModal.show);
        };

        $scope.showUploadForm = function () {
            $scope.uploadLookForm = true;
            $scope.scrapePostForm = false;
            $scope.uploadLookTitle = false;
        };

        looksAPI.getAllLooks()
                .then(function (data) {
                    console.log(data);
                    // $scope.looks = data.data;
                    $scope.allData = data.data;
                    $scope.nextPage();
                    $scope.busy = false;
                })
                .catch(function (error) {
                    console.log('Failed to get looks ' + error);
                });

        $scope.nextPage = function () {
            var lookLength = $scope.looks.length;
            if ($scope.busy) {
                return;
            }
            $scope.busy = true;
            $scope.looks = $scope.looks.concat($scope.allData.splice(0, step));
            $scope.busy = false;
            if ($scope.allData.length === 0) {
                $scope.noMoreData = true;
            }

        };

        // Watch for changes to URL, Scrape and Display Results
        $scope.$watch('look.link', function (newVal, oldVal) {
            newVal = newVal || '';
            if (newVal.length > 5) {
                $scope.loading = true;
                // }

                var link = {
                    url: $scope.look.link
                };

                scrapeAPI.getScrapeDetails(link)
                        .then(function (data) {
                            console.log(data);
                            $scope.showScrapeDetails = true;
                            $scope.gotScrapeResults = true;
                            $scope.uploadLookTitle = false;
                            $scope.look.imgThumb = data.data.img;
                            $scope.look.description = data.data.desc;
                        })
                        .catch(function (data) {
                            console.log('Failed to return from scrape api');
                            $scope.loading = false;
                            $scope.look.link = '';
                            $scope.gotScrapeResults = false;
                        })
                        .finally(function () {
                            $scope.loading = false;
                            $scope.uploadLookForm = false;
                        });
            }

        });

        // Add vote in main view
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


        $scope.addScrapePost = function (type) {
            type = typeof type !== undefined ? type : 'image';
            var look = {
                description: $scope.look.description,
                title: $scope.look.title,
                image: $scope.look.imgThumb,
                linkURL: $scope.look.link,
                email: $scope.user.email,
                name: $scope.user.name,
                type: type,
                _creator: $scope.user._id
            };

            looksAPI.createScrapeLook(look)
                    .then(function (result) {
                        alertSuccess.show();
                        $scope.showScrapeDetails = false;
                        $scope.gotScrapeResults = false;
                        $scope.look.title = '';
                        $scope.look.link = '';
                        $scope.looks.splice(0, 0, result.data);
                        console.log(result);
                    })
                    .catch(function () {
                        alertFail.show();
                        console.log('Failed to post');
                        $scope.showScrapeDetails = false;
                    });

        };

        $scope.uploadPic = function (file) {
            Upload.upload({
                url: 'api/look/upload',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    file: file,
                    title: $scope.look.title,
                    description: $scope.look.description,
                    email: $scope.user.email,
                    name: $scope.user.name,
                    linkURL: $scope.look._id,
                    _creator: $scope.user._id
                }
            })
                    .then(function (res) {
                        console.log('Success upload');
                        $scope.looks.splice(0, 0, res.data);
                        $scope.look.title = '';
                        $scope.look.description = '';
                        $scope.picFile = '';
                        $scope.picPreview = false;
                        alertSuccess.show();
                    }, function (res) {
                        alertFail.show();
                    }, function (event) {
                        var progressPercentage = parseInt(100.0 * event.loaded / event.total);
                        console.log('Progress: ' + progressPercentage + '%'
                                + event.config.data.file.name);
                    });

        };

        //vanlam
        var tabUrl = 'app/main/addLookTabs/';
        $scope.tabLink = tabUrl + 'pinterest-link.html';
        $scope.lookTab = function (tabLink) {
            $scope.tabLink = tabUrl + tabLink;
        };
        $scope.isLtActive = function (currLink) {
            return (tabUrl + currLink) === $scope.tabLink;
        };
    }
})();
