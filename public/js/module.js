"use strict;"

var app = angular.module('appName', ['ui.bootstrap','ui.router','xeditable','ngCookies','satellizer']); 

app.constant('TOKENNAME', 'authtoken');

app.run(function(authService){
	authService.readToken();
})

app.config(function($authProvider){
	$authProvider.facebook({
		clientId:'304302099958732',	
		url:'api/users/facebook'
	});
});

app.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('login', {url: '/login', templateUrl: 'html/login.html', controller: 'loginController'})
	.state('register', {url: '/register', templateUrl: 'html/login.html', controller: 'loginController'})
	.state('admin', {url: '/admin', templateUrl: 'html/admin.html'})
	.state('edit', {url: '/edit', templateUrl: 'html/edit.html', controller: 'userController'})
	.state('user', {url: '/user/:id', templateUrl: 'html/user.html', controller: 'userController'})

	$urlRouterProvider.otherwise('/');

});

