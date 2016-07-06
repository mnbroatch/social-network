"use strict;"

angular.module('appName')
.service('messageService', function($http){


	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/messages'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (message) => {
		return $http({
			method:'POST',
			url: '/api/messages',
			data: message
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (message) => {
		return $http({
			method:'DELETE',
			url: '/api/messages/' + message._id
		});
	}

	this.editOne = (message) => {
		return $http({
			method:'PUT',
			url: '/api/messages/' + message._id,
			data: message
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});

