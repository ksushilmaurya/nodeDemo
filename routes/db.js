/*var MongoClient = require('mongodb').MongoClient,format=require('util').format;
var express = require('express');
var router = express.Router;
//var assert = require ('assert');
var url = 'mongodb://localhost:27017/mydb;'

router.post('/insert',function(req,res,next){
	var item ={
	name:req.body.name,
	phone:req.body.phone,
	email:req.body.email
	
};
mongo.connect(url,function(err,db){
assert.equal(null,err);
	db.collection('contactdetails').insertOne(item,function(err,result){
		//assert.equal(null.error);
		console.log('insert done');

	db.close();
});
		});
}
*/