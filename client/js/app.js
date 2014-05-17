var app = angular.module('shortly', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'linksController',
      templateUrl: '/templates/home.html'
    })
    .when('/create', {
      controller: 'createController',
      templateUrl: '/templates/shorten.html'
    });
}]);

app.controller('linksController', function($scope, downloadLinks) {
  console.log('linksController top');
  downloadLinks.get()
    .then(function(data) {
      $scope.links = data.data;
    });
});

app.factory('downloadLinks', function($http) {
  console.log('downloadLinks');
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
          console.log(err);
        });
    }
  };
});

app.controller('createController', function($scope, downloadLinks) {
  console.log('createController top');
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
      })
      .error(function (msg) {
        $scope.spinnerVisible = false;
        $scope.message = msg;
        $scope.isError = true;
      });
  };

});
