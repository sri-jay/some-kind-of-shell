var angular = require('angular');
var path: string = process.cwd();


angular.module('shell', [])
.config(['$controllerProvider', ($controllerProvider) => {
  $controllerProvider.allowGlobals();
}])
.run(['$rootScope', ($rootScope) => {
  path = path.split('\\').join('/');
  $rootScope.cwd = path;
}])
.controller('MainController', ['$scope', ($scope) => {
  $scope.runner = new QueuedProcessRunner();
  $scope.addTaskToQueue = () => {
    $scope.runner.queueProcess($scope.args);
  };
}]);
