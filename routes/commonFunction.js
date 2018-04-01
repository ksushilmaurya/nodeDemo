var MongoClient = require('mongodb').MongoClient,format=require('util').format;
var url = 'mongodb://localhost:27017/masterDb';
var objectId = require('objectid');


exports.getStudentInfo = function(studentName, cb) {
	console.log("studentName is - ",studentName);
	MongoClient.connect(url,function(err,db){ 
		if(err) {
			return cb({success: false, msg:"Something went wrong"});
		} else {
			console.log("db connection success going to get student data --");
			db.collection('student').find({name: studentName}).toArray(function(err,result){
				db.close();
				if(err) {
					return cb({success: false, msg:"Something went wrong"});
				} else {
					return cb({success: true , data: result});
				}
			});
		}
	})
}

exports.getTeacherDetailsForStudent = function(teacherId,cb) {
	console.log("teacherId is -",teacherId);
	MongoClient.connect(url,function(err,db){ 
		if(err) {
			return cb({success : false ,msg : "Something went wrong"});
		} else {
			console.log("db connection done");
			db.collection('teacher').find({_id : objectId(teacherId)}).toArray(function(err,result){
				db.close();
				if(err) {
					return cb({success : false ,msg : "Something went wrong"});
				} else {
					console.log("teacher found -",result);
					return cb({success : true ,data : result});
				}

			});
		}

	});

}