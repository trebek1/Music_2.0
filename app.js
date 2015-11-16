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

}])

.factory('NewFactory', ['$http',function($http){
	// example https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
	var domain = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
	var query = 'breathe+faith+hill';
	var token = '&key=AIzaSyCyaXDHzfz0nLHIaXlaBGhJO1E_UQH1qyA'; 
	var url = domain + query + token; 
	
	var p = {
		query: function(){
			return $http.get(url);
		}
	};
	return p; 
}]); 

app.controller('FirstCtrl', [
'$http',
'$scope',
'years',
'$firebaseObject',
'$stateParams',
function($http, $scope, years, $firebaseObject, $stateParams){

	var domain = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
	var query = 'breathe+faith+hill';
	var token = '&key=AIzaSyCyaXDHzfz0nLHIaXlaBGhJO1E_UQH1qyA'; 
	var url = domain + query + token; 

	$http.get(url).success(function(response){
		console.log("this is the response ", response.items[0].id.videoId); 
	}); 





var ref = new Firebase("https://musicapp11.firebaseio.com/");
   
  $scope.test = 'Music App';
  $scope.years = years.years;
  $scope.data = $firebaseObject(ref);
  $scope.isCollapsed = true; 

  var syncObject = $firebaseObject(ref);

  syncObject.$bindTo($scope, "data");
  
  $scope.addYear = function (){
  	if($scope.year != ""){
  		$scope.years.push($scope.year); 
  		$scope.year = ""; 
  	};
  
  }
}

]);