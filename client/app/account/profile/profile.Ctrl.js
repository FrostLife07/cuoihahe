(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope', 'Auth', 'adminAPI'];

  function ProfileCtrl($scope, Auth, adminAPI) {
    $scope.user = Auth.getCurrentUser();
    $scope.profileInfo = {};
    var id = $scope.user._id;

    adminAPI.getOneUser(id)
      .then(function(data) {
        console.log(data);
        $scope.profileInfo = data.data;
      })
      .catch(function(error) {
        console.log('Failed to get data');
        console.log(error);
      });

  }


}());
