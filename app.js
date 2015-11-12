var app = angular.module('launchPage', ["ui.router","firebase"]);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'FirstCtrl'
    })
  .state('year', {
  url: '/year/{year}',
  templateUrl: 'music.html',
  controller: 'FirstCtrl'
});

  $urlRouterProvider.otherwise('home');
}]);

app.factory('years', [function(){
var o = {

years:  ['1999'] 

}
return o; 

}]); 

// app.factory('request', ['$scope', '$http',function($scope,$http){
// 	// example https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
// 	var domain = 'https://www.googleapis.com/youtube/v3/videos?id=';
// 	var query = '7lCDEYXw3mM';
// 	var token = '&key=AIzaSyCyaXDHzfz0nLHIaXlaBGhJO1E_UQH1qyA'; 
// 	var url = domain + query + token 
// 	var o = {
// 		query: $http.get(url).success(function(response){
// 			$scope.example = response; 
// 			console.log("This is response ", response);
// 		})
// 	}
// 	return o; 
// }]); 

app.controller('FirstCtrl', [
'$scope',
'years',
'$firebaseObject',
'$stateParams',
function($scope, years, $firebaseObject, $stateParams){

var ref = new Firebase("https://musicapp11.firebaseio.com/");
  
  $scope.test = 'Music App';
  $scope.years = years.years;
  $scope.data = $firebaseObject(ref);

  var syncObject = $firebaseObject(ref);

  syncObject.$bindTo($scope, "data");
  
  $scope.addYear = function (){
  	$scope.years.push($scope.year); 
  	$scope.year = ""; 

	}
}

]);