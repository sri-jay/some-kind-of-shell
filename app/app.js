var angular = require('angular');
var path = process.cwd();
angular.module('shell', [])
    .config(['$controllerProvider', function ($controllerProvider) {
        $controllerProvider.allowGlobals();
    }])
    .run(['$rootScope', function ($rootScope) {
        path = path.split('\\').join('/');
        $rootScope.cwd = path;
    }])
    .controller('MainController', ['$scope', function ($scope) {
        $scope.runner = new QueuedProcessRunner();
        $scope.addTaskToQueue = function () {
            $scope.runner.queueProcess($scope.args);
        };
    }]);
