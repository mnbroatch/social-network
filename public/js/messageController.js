"use strict;"

angular.module('appName')
.controller('messageController', function($scope,$http,messageService) {

	$scope.messageArray =[];

	messageService.getAll()
	.then( function(messages){
		if(messages) $scope.messageArray.push(...messages);
	})
	.catch( err => {
		console.log(err);
	});



	$scope.addOneMessage = function(message){
		messageService.addOne(message)
		.then( function(newMessage){
			if(newMessage) $scope.messageArray.push(newMessage);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeOneMessage = function(message){
		let index = $scope.messageArray.indexOf(message);
		messageService.removeOne(message)
		.then( function(){
			$scope.messageArray.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

	//  assumes uuid that doesn't change on edit
	$scope.editOneMessage = function(editedMessage){
	console.log(editedMessage);
		messageService.editOne(editedMessage)
		.then( function(updatedMessage){
			console.log('edited');
		})
		.catch( err => {
			console.log(err);
		});
	}


});



