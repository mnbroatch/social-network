"use strict;"


let express = require('express');
let Message = require('../models/message');

let router = express.Router();


router.route('/')
.get(function(req,res){
	Message.find({}, (err,messages) => {
		res.status(err? 400:200).send(err || messages);
	});
})
.post(function(req,res){
	let message = new Message(req.body);
	message.save((err,savedMessage) => {
		res.status(err? 400:200).send(err || savedMessage);
	});
});


router.route('/:id')
.get(function(req,res){
	Message.find({_id:req.params.id}, (err,message) => {
		res.status((err || !message)? 400:200).send(err || message[0]);
	});
})
.put(function(req,res){
	Message.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedMessage) => {
		res.status(err? 400:200).send(err || savedMessage);
	});
})
.delete(function(req,res){
	Message.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});


module.exports = router;

