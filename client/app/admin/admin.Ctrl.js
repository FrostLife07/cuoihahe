(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', 'Auth', '$modal', 'adminAPI', 'looksAPI', '$alert'];

  function AdminCtrl($scope, Auth, $modal, adminAPI, looksAPI, $alert) {

    $scope.looks = [];
    $scope.users = [];
    $scope.user = {};
    $scope.editLook = {};
    $scope.deleteBtn = true;

    var alertSuccess = $alert({
      title: 'Saved',
      content: 'Look has been edited',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'Not saved',
      content: 'Look has failed to edit',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    };

    // Get all users from admin page
    adminAPI.getAllUsers()
      .then(function(data) {
        // console.log(data);
        $scope.users = data.data;
      })
      .catch(function(error) {
        console.log('Error when geting users');
        console.log(error);
      });

    // Delete user
    $scope.deleteUser = function(user) {
      adminAPI.deleteUser(user)
        .then(function(data) {
          console.log('Deleted user');
          var index = $scope.users.indexOf(user);
          $scope.users.splice(index, 1);
        })
        .catch(function(error) {
          console.log('Failed to delete user');
          console.log(error);
        });
    };


    // Get all looks
    looksAPI.getAllLooks()
      .then(function(data) {
        console.log(data);
        $scope.looks = data.data;
      })
      .catch(function(error) {
        console.log('Failed to get all looks');
      });

    $scope.editLook = function(look) {
      looksAPI.getUpdateLook(look)
        .then(function(data) {
          console.log(data);
          $scope.editLook = data.data;
        })
        .catch(function(error) {
          console.log('Failed to edit look' + error);
        });
    };

    $scope.saveLook = function() {
      var look = $scope.editLook;
      looksAPI.updateLook(look)
        .then(function(data) {
          console.log('Look updated');
          console.log(data);
          $scope.editLook.title = '';
          $scope.editLook.description = '';
          alertSuccess.show();
        })
        .catch(function(error) {
          console.log('Failed to update ' + error);
          alertFail.show();
        });
    };

    $scope.deleteLook = function(look) {
      var index = $scope.looks.indexOf(look);
      looksAPI.deleteLook(look)
        .then(function(data) {
          console.log('Success, look deleted');
          $scope.looks.splice(index, 1);
        })
        .catch(function(error) {
          console.log('Failed to delete look' + error);
        });
    };


  }
})();
