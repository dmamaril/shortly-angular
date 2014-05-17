var app = angular.module('shortly', []);

app.controller('linksController', function($scope, downloadLinks) {
  downloadLinks.get()
    .then(function(data) {
      console.log(data.data);
      $scope.links = data.data;
    });
});

app.factory('downloadLinks', function($http) {
  console.log("INside factory");
  return {
    get: function () {
      console.log("INSIDE get function");
      return $http.get('/links')
        .success(function (data) {
          console.log("IN SUCCESS");
          // console.dir(data);
          return data;
        })
        .error(function (err) {
          console.log("IN ERROR");
          console.log(err);
        });
    }
  };
});

app.controller('createController', function($scope) {
  // need to manage spinner (on/off)
});
