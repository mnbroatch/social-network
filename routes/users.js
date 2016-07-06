"use strict;"


let express = require('express');
let request = require('request');
let User = require('../models/user');

let router = express.Router();

router.route('/')
.get(function(req,res){
	User.find({}, (err,users) => {
		res.status(err? 400:200).send(err || users);
	});
})

router.post('/login',function(req,res){
	User.login(req.body, (err,user) => {
		if (err) res.status(400).send(err);
		let token = user.generateToken();
		res.cookie('authtoken', token).send(user)
	});
});

router.post('/register',function(req,res){
	User.register(req.body, (err) => {
		res.status(err? 400:200).send(err);
	});
});

router.post('/logout',function(req,res){
	res.clearCookie('authtoken').send();
});

router.route('/:id')
.get(function(req,res){
	User.find({_id:req.params.id}, (err,user) => {
		res.status((err || !user)? 400:200).send(err || user[0]);
	});
})
.put(function(req,res){
	User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedUser) => {
		res.status(err? 400:200).send(err || savedUser);
	});
})
.delete(function(req,res){
	User.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});

router.post('/facebook',function(req,res){
	var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
	var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
	var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
	var params = {
		code: req.body.code,
		client_id: req.body.clientId,
		client_secret: process.env.FACEBOOK_SECRET,
		redirect_uri: req.body.redirectUri
	};
	console.log('sec',params);

	request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
		if (response.statusCode !== 200) {
			return res.status(400).send({ message: accessToken.error.message });
		}
		request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
			if (response.statusCode !== 200) {
				return res.status(400).send({ message: profile.error.message });
			}
			User.findOne({facebook: profile.id}, (err,user)=>{
				if(err) return res.status(400).send(err);
				if(user){
					let token = user.generateToken();
					res.send({token: token});
				}
				else {
					let newUser = new User({
						email: profile.email,
						displayName: profile.name,
						facebook: profile.id
					});
					newUser.save((err,savedUser)=>{
						if(err) return res.status(400).send(err);
						let token = savedUser.generateToken();
						res.send({token: token});
					});
				}
			});
		});
	});
});











module.exports = router;

