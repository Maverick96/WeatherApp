const weatherApp = angular.module("weatherApp", ['ngRoute','ngResource'])

weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl : '/navbar/home.html',
        controller : 'homePage'
    })
    
    .when('/forecast/:days',{
        templateUrl : '/navbar/forecast.html',
        controller : 'forecast'
    })
})

weatherApp.service("getForecast", function($http){
    var self = this
    self.cityName =  "Kolkata"
    self.getWeatherReport = function(days){
        const apiKey = "8fffe798ceb442e197c143450182804"
        let url = "http://api.apixu.com/v1/forecast.json?key=" +apiKey+"&q=" + self.cityName +"&days=" +days 
            return $http({
                method : 'GET',
                url : url
            })
    }
})

weatherApp.controller("homePage", ["$scope", "getForecast", "$location", function($scope, getForecast, $location){
    $scope.city = getForecast.cityName
    
    $scope.$watch('city', function(newCity){
        getForecast.cityName = newCity;
    })
    
    $scope.submit = function(){
        $location.path("/forecast/2")
    }
}])

weatherApp.controller("forecast",["$scope", "getForecast", "$http", "$routeParams",function($scope, getForecast, $http, $routeParams){
    $scope.city = getForecast.cityName
    $scope.days = $routeParams.days || '2'
    $scope.data
    getForecast.getWeatherReport($scope.days)
    .then((data) => {
            console.log(data)
            $scope.data = data.data.forecast.forecastday          
        },function error(err){
                    console.log(err)
            })


    
    
}])

weatherApp.directive('weatherReport', function(){
    return {
        restrict : 'E',
        templateUrl : "/directives/weatherDetail.html",
        replace : true,
        scope : {
            weatherDetail : "=detail",
            test : "=city"
        }
    }
})
