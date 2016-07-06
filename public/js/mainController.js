"use strict;"

angular.module('appName')
.controller('mainController', function($scope,authService,$auth) {

	$scope.logout = ()=>{
		authService.logout();
		$auth.logout();
	}

	$scope.isAuthenticated = ()=> $auth.isAuthenticated();
		

});

