"use strict;"

angular.module('appName')
.service('authService', function($http,$cookies,$rootScope,TOKENNAME){

	this.readToken = () => {
		let token =$cookies.get(TOKENNAME);

		if (typeof token == 'string'){
			let payload = JSON.parse(atob(token.split('.')[1]));
			$rootScope.currentUser = payload;
		}
	}

	this.register = userObj => {
		return $http.post('/api/users/register',userObj);
	}

	this.login = userObj => {
		return $http.post('/api/users/login',userObj)
		.then(res => {
			$rootScope.currentUser = res.data;
			return res;
		});
	}

	this.logout = ()=>{
		$cookies.remove(TOKENNAME);
		$rootScope.currentUser = null;
	}

});
