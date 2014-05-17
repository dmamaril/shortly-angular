var app = angular.module('shortly', []);

app.controller('linksController', function($scope, downloadLinks) {
  downloadLinks.get()
    .then(function(data) {
      console.log(data.data);
      $scope.links = data.data;
    });
});

app.factory('downloadLinks', function($http) {
  console.log("inside factory");
  return {
    get: function () {
      return $http.get('/links')
        .success(function (data) {
          return data;
        })
        .error(function (err) {
          console.log(err);
        });
    },
    post: function (data) {
      return $http.post('/links', data)
        .success(function (data) {
          console.log(data);
        })
        .error(function (err) {
          console.log('POST ERROR');
          console.log(err);
        });
    }
  };
});

app.controller('createController', function($scope, downloadLinks) {
  $scope.spinnerVisible = false;
  $scope.linkVisible = false;
  $scope.isError = false;
  // $scope.url;
  $scope.post = function() {
    $scope.spinnerVisible = true;
    $scope.message = '';
    $scope.linkVisible = false;
    $scope.isError = false;
    downloadLinks.post({url : $scope.url})
      .success(function(msg){
        $scope.spinnerVisible = false;
        $scope.link = msg;
        $scope.linkVisible = true;
        console.log("in success after post");
      })
      .error(function (msg) {
        $scope.spinnerVisible = false;
        $scope.message = msg;
        $scope.isError = true;
        console.log('in ERROR after post');
      });
  };

});
