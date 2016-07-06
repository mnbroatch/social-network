'use strict';

const JWT_SECRET = process.env.JWT_SECRET;

let mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


let userSchema = new mongoose.Schema({
	username: {type:String},
	password: {type:String},
	firstName: {type:String},
	lastName: {type:String},
	bio: {type:String},
	email: {type:String},
	displayName: {type:String},
	profileImage: {type:String},
	facebook: {type:String},
	picture: {type:String},
	messages: [{type: mongoose.Schema.Types.ObjectId}]
});


userSchema.statics.authMiddleware = function(req,res,next){

let tokenHeader = req.cookies.authtoken || req.headers.authorization.split(' ')[1];

	jwt.verify(tokenHeader, JWT_SECRET, (err, payload)=>{
		this.findById(payload._id, (err, user)=>{
			if(err||!user) res.status(400).send(err||{err:"User not found."});
			req.user = user;
			next();
		}).select('-password');
	});
}

userSchema.methods.generateToken = function(){
	let payload = {
		_id: this._id,
	}
	let token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1 day"});
	return token;
}

userSchema.statics.login = function(userObj,cb){
	this.findOne({username: userObj.username}, (err, user) => {
		if (err || !user) return cb(err||{err:"Invalid User/Pass"});
		bcrypt.compare(userObj.password,user.password, (err,res)=>{
			if (err || !res) send(err || "Invalid User/Pass");
			user.password = null;
			cb(null,user);
		});
	});
}

userSchema.statics.register = function(userObj,cb){
	this.findOne({username: userObj.username}, (err, user) => {
		if (err || user) return cb(err||{err:"Username Taken"});
		bcrypt.hash(userObj.password,10,(err,hash)=>{
			userObj.password = hash;
			this.create(userObj, err=>{
				return cb(err);
			});
		});
	});
}

let User = mongoose.model('User', userSchema);

module.exports = User;

