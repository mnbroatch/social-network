"use strict;"

angular.module('appName')
.service('userService', function($http,$rootScope){

	this.profile = ()=> {

	}

	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/users'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (user) => {
		return $http({
			method:'POST',
			url: '/api/users',
			data: user
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (user) => {
		return $http({
			method:'DELETE',
			url: '/api/users/' + user._id
		});
	}

	this.editOne = (user) => {
		return $http({
			method:'PUT',
			url: '/api/users/' + user._id,
			data: user
		})
		.then( res => {
			if (res.data){
				$rootScope.currentUser = res.data;
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});

