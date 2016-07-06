"use strict";
require('dotenv').config();
const PORT = process.env.PORT || 8000;

const express = require('express');
const morgan = require('morgan');

let app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/', (err) => {
	console.log(err||'Mongoose connected!');
});

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/api', require('./routes/api'));

app.get('/', function(req,res){
	res.render('index');
});

app.listen(PORT, function(err){
	console.log(err || `server started port ${PORT}`);
});
