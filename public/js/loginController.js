"use strict;"

angular.module('appName')
.controller('loginController', function($scope,authService,$state,$auth) {
	$scope.currentState = $state.current.name;

	//  handles both login and register
	$scope.submit = () => {
		if($scope.currentState === 'login'){
			authService.login($scope.user)
			.then(res => {
				$state.go('user');
			})
			.catch(err => {
				alert('NOPE');
				console.log(err);
			});
		} else {
			if ($scope.user.password !== $scope.user.password2){
				$scope.user.password = null;
				$scope.user.password2 = null;
				alert('Passwords do not match');
			} else {
				authService.register($scope.user)
				.then(res => {
					$state.go('user');
				})
				.catch(err => {
					alert('NOPE');
					console.log(err);
				});
			}
		}
	}


	$scope.authenticate = provider=>{
		$auth.authenticate(provider);
	}








});

