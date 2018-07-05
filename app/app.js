// module

let jokeApp = angular.module('jokesApp',['ngRoute','ngResource']);


jokeApp.config(function ($routeProvider) {

    $routeProvider.when('/',{

        templateUrl:'pages/home.htm',
        controller:'homeController'
    })
    .when('/jokes',{

        templateUrl:'pages/jokes.htm',
        controller:'jokesController'
    })

});

// Services

jokeApp.service('searchService',function () {

    this.searchTerm = '';
    this.limit = 5;

});


// controller

jokeApp.controller('homeController',['$scope','$resource','$http','searchService',function ($scope, $resource, $http, searchService) {

$scope.searchTerm = searchService.searchTerm;
$scope.limit = searchService.limit;
// scope daki city degeri degiştigi anda city service in de degerini degiştir
$scope.$watch('searchTerm',function () {
    searchService.searchTerm = $scope.searchTerm;

});

$scope.$watch('limit',function () {

    searchService.limit = $scope.limit;
    console.log($scope.limit);
})




}]);

jokeApp.controller('jokesController',['$scope','$http','searchService',function ($scope, $http, searchService) {


$scope.searchTerm = searchService.searchTerm;
$scope.limit = String(searchService.limit);

    $scope.jokes = [];
// Simple GET request example:
    $http({
        method: 'GET',
        url: `https://icanhazdadjoke.com/search?term=${$scope.searchTerm}&limit=${$scope.limit}`,
        headers:{'Accept':'application/json'}
    }).then(function successCallback(response) {

        $scope.jokes = response.data.results;

        console.log($scope.jokes);

    }, function errorCallback(response) {


    });

}]);