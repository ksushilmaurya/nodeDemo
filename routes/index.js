var express = require('express');
var router = express.Router();
var grettings = require('./greetings');
var dummy=require('../dummyDatabase');
var messages = require("./messages");


var commonFunction = require("./commonFunction");

console.log("greeting import - ",grettings);

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.send({"info": "i am listening"});
});


router.get('/userList', function(req, res, next) {
	console.log("front end data is - ",req.query)
	var name = req.query.name;
	console.log("name is - ",name);
	var msg = grettings.helloName(name);
	console.log("msg is - ",msg);

  res.send({"info": "i am listening user list", message : msg});


});

router.post('/GetUserInfo', function(req, res, next) {
	console.log("Get user info")
	var name=req.query.name
	var msg=dummy.info(name);
	console.log("user is- ",msg);
	res.send({"info":"user information",message : msg})

});


router.post('/userList1', function(req, res, next) {
	console.log()

  res.send({"info": "i am "});
});

var MongoClient = require('mongodb').MongoClient,format=require('util').format;
//var express = require('express');
//var router = express.Router;
//var assert = require ('assert');
var url = 'mongodb://localhost:27017/masterDb';

router.get('/getdata', function(req, res, next) {
	console.log("req.query is - ",req.query);
	console.log("name:req.query.name - ",req.query.name);
	console.log("phone:req.query.phone - ",req.query.phone);
	console.log("phone:req.query.req.query.email - ",req.query.email);
	var resultArray = [];
	MongoClient.connect(url,function(err,db){
		var cur = db.collection('teacher').find(req.query);
		console.log(req.query);
		cur.forEach(function(result,err){
			resultArray.push(result);
		}, function (){
			db.close();
			return res.send({"info":"user information",message : resultArray})
			// res.render('index',{item: resultArray});
});

	});
});
// router.get('/delete',function(req,res,next){
// 	console.log('delete route')
// 	MongoClient.connect(url,function(err,db){
// 		db.collection('teacher').deleteOne(name:req.query.name,function(err,result){
// 			console.log('Item deleted');
// 			db.close();
// 		});

	
// });
// });

// router.get('/update',function(req,res,next){
// 	console.log('update route')
// 	MongoClient.connect(url,function(err,db){
// 		db.collection('teacher').updateOne(name:req.query.name,function(err,result){
// 			console.log('Item updated');
// 			db.close();
// 		});

	
// });
// });
 
 ////////////////Get Studentdata/////////////////

 


 /////////////////////////////////////////

router.get('/insert',function(req,res,next) {
	var item ={
		name 	: req.query.name,
		phone	: req.query.phone,
		email	: req.query.email
	};

	MongoClient.connect(url,function(err,db){
		console.log('db connectionn done')
		console.log("error is-",err);
		console.log("db is-",db);
		
		db.collection('teacher').insertOne(item,function(err,result){
			console.log('insert done');
			db.close();
		});
	});
});


// router.post('/insert',function(req,res,next) {
// 	console.log("request data is - ",req.body);

// 	var name = req.body.name;
// 	var phone = req.body.phone;
// 	var email = req.body.email;


// 	var item = {
// 		name 	: name,
// 		phone	: phone,
// 		email	: email
// 	};

// 	try {
// 		MongoClient.connect(url,function(err,db){
// 			console.log("item going to insert - ",item);
// 			db.collection('teacher').insert(item,function(err,result){
// 				console.log('insert done', result);
// 				db.close();
// 				if(err) {
// 					res.send({status: 201, msg: "Some thing went wrong"})
// 				} else {
// 					res.send({status:200, msg : "Data insert successfully"});
// 				}
// 			});
// 		});
// 	} catch(e) {
// 		console.log("there is an error - ",e);
// 		res.send({status: 201, msg: "Some thing went wrong"})
// 	}
	
// });


//++++++++++++++++++++++++++++++++++Teacher Insert Using function +++++++++++++++++++++++++++++++++++++++++

router.post('/insertcondition',function(req,res,next){
	console.log("request data is - ",req.body);

	var name = req.body.name;
	var phone = req.body.phone;
	var email = req.body.email;


	var item = {
		name 	: name,
		phone	: phone,
		email	: email
	};

	checkTeacherExist(name, function(isTeacherFound) {
		console.log("teaccher is - ",isTeacherFound)
		// teacher found
		if(isTeacherFound) {
			return res.send({status: 200, msg: "Teacher already exist"})
		} else { // tacher not found
			InsertTeacher(item, function(b) {
				console.log("b is - ",b)
				if(b) {
					return res.send({status: 200, msg: messages.teacherInserted})
				} else {
					return res.send({status: 201, msg: "Some thing went wrong"})
				}
				
			});
		}
	})
	
});



var InsertTeacher =function(item,cb){
	console.log('insertion start')
	MongoClient.connect(url,function(err,db){
		 console.log("item going to insert - ",item);
		 db.collection('teacher').insert(item,function(err,result){
			console.log('insert done', result);
			db.close();
			if(err) {
				cb(0) // {success: false}
			} else {
				cb(1)
			}
		});
	});
}


var checkTeacherExist =function(name,cb){
	console.log('find start')
	MongoClient.connect(url,function(err,db){
		 console.log("item going to find - ",name);
		 db.collection('teacher').find({name: name}).toArray(function(err,result){
			console.log('result of find is - ', result);
			db.close();
			if(result.length) {
				cb(1) // {success: false}
			} else {
				cb(0)
			}
		});
	});
}

//+++++++++++++++++++++++++Student insert using POST and function++++++++++++++++++
 router.post('/InsertStudentCheck',function(req,res,next){
 	 console.log('Student going to insert is -',req.body);

 	var name = req.body.name;
	var phone = req.body.phone;
	var email = req.body.email;
	var teacherId = req.body.teacherId;


	var item = {
		name 	: name,
		phone	: phone,
		email	: email,
		teacherId : teacherId
	};

	checkStudentExist(name, function(isStudentFound) {
		console.log("student is - ",isStudentFound)
		// teacher found
		if(isStudentFound) {
			return res.send({status: 200, msg: "Student already exist"})
		} else { // tacher not found
			InsertStudent(item, function(b) {
				console.log("b is - ",b)
				if(b) {
					return res.send({status: 200, msg: "Inserted"})
				} else {
					return res.send({status: 201, msg: "Some thing went wrong"})
				}
				
			});
		}
	})
	
});

var InsertStudent =function(item,cb){
	console.log('insertion start')
	MongoClient.connect(url,function(err,db){
		 console.log("item going to insert - ",item);
		 db.collection('Student').insert(item,function(err,result){
			console.log('insert done', result);
			db.close();
			if(err) {
				cb(0) // {success: false}
			} else {
				cb(1)
			}
		});
	});
}


var checkStudentExist =function(name,cb){
	console.log('find start')
	MongoClient.connect(url,function(err,db){
		 console.log("item going to find - ",name);
		 db.collection('student').find({name: name}).toArray(function(err,result){
			console.log('result of find is - ', result);
			db.close();
			if(result.length) {
				cb(1) // {success: false}
			} else {
				cb(0)
			}
		});
	});
}

//++++++++++++++++++++End++++++++++++++++++++++++++++++++++++++++

router.post('/Insertdetails',function(req,res,next){
    var teacherId = req.body.teacherId;
    var studentId = req.body.studentId;
    var Address = req.body.Address
var item = {
      teacherId : teacherId,
      studentId : studentId,
      Address : {
      	 city : req.body.city,
      	 location :req.body.location
      }
  }
  console.log("item going too insert" ,item);
  if(teacherId)
  	  {
  	  	InsertTeacherdetails(item,function(cb){
  	  		if(cb) {
					return res.send({status: 200, msg: "Inserted"})
				} else {
					return res.send({status: 201, msg: "Some thing went wrong"})
				}
      });
  	}  	
   else
   {
   	InsertStudentdetails(item,function(cb){
   		if(cb) {
					return res.send({status: 200, msg: "Inserted"})
				} else {
					return res.send({status: 201, msg: "Some thing went wrong"})
				}
    });
   }
});

var InsertStudentdetails =function(item,cb){
	console.log('insertion start')
	MongoClient.connect(url,function(err,db){
		 console.log("item going to insert - ",item);
		 db.collection('details').insert(item,function(err,result){
			console.log('insert done', result);
			db.close();
			if(err) {
				cb(0) 
			} else {
				cb(1)
			}
		});
	});
}

var InsertTeacherdetails =function(item,cb){
	console.log('insertion start')
	MongoClient.connect(url,function(err,db){
		 console.log("item going to insert - ",item);
		 db.collection('details').insert(item,function(err,result){
			console.log('insert done', result);
			db.close();
			if(err) {
				cb(0) 
			} else {
				cb(1)
			}
		});
	});
}



//+++++++++++++++++++++++++++find details+++++++++++++++++++++++++
router.post('/finddetails',function(req,res,next){
	console.log("data to be find",req.body);
	

	console.log("name to be find",name)
	MongoClient.connect(url,function(err,db){
	console.log("item going to find - ",name);
	db.collection('teacher').find({name : name}).toArray(function(err,result){
		console.log("user found",result);
		teacherId = result[0]._id;
		
		console.log("tecaher id",teacherId);
		teacherId = teacherId.toString();
		console.log("teacherId is -",teacherId, typeof teacherId)
		if(teacherId)//return teacherId ;
		 {
		 	console.log("details");
		  db.collection('details').find({teacherId : teacherId}).toArray(function(err,result){
		  console.log("user found",result);
		  db.close()
		});
	}

	});

});

});
///////////////////////$in/////////////////
router.post('/checkingin',function(req,res,next){
	var name = req.body.name;
	MongoClient.connect(url,function(err,db){
	console.log("item going to find - ",name);
		db.collection('teacher').find( { name: { $in: name } } ).toArray(function(err,result){
		console.log("name",result);
	      db.close()
		});
	
});

});



//++++++++++++++++++++++++++++++++++++++

router.post('/insertteacher',function(req,res,next) {
	console.log("request data is - ",req.body);

	var name = req.body.name;
	var phone = req.body.phone;
	var email = req.body.email;
	


	var item = {
		name 	: name,
		phone	: phone,
		email	: email,
		
	};



	console.log("request data is - ",req.body);

	var bulkData = req.body.data;
	try {
		MongoClient.connect(url,function(err,db){
			console.log("item going to insert - ",bulkData);
			db.collection('teacher').insert(bulkData,function(err,result){
				console.log('insert done', result);
				db.close();
				if(err) {
					res.send({status: 201, msg: "Some thing went wrong"})
				} else {
					res.send({status:200, msg : "Data insert successfully"});
				}
			});
		});
	} catch(e) {
		console.log("there is an error - ",e);
		res.send({status: 201, msg: "Some thing went wrong"})
	}
});
router.post('/updateTeacher',function(req,res,next) {
	console.log("request data is - ",req.body);

	var name = req.body.name;
	var updateKeys = req.body.updateKeys;

	try {
		MongoClient.connect(url,function(err,db){
			console.log("name - ",name);
			console.log("updateKeys - ",updateKeys);
			db.collection('teacher').update({name:name}, {$set:updateKeys} ,function(err,result){
				console.log('update done', result.result);
				db.close();
				if(err) {
					res.send({status: 201, msg: "Some thing went wrong"})
				} else {
					res.send({status:200, msg : "Data updated successfully"});
				}
			});
		});
	} catch(e) {
		console.log("there is an error - ",e);
		res.send({status: 201, msg: "Some thing went wrong"})
	}
	
});


router.post('/insertStudent',function(req,res,next) {
	console.log("request data is - ",req.body);

	var name = req.body.name;
	var phone = req.body.phone;
	var email = req.body.email;
	var teacherId = req.body.teacherId;


	var item = {
		name 	: name,
		phone	: phone,
		email	: email,
		teacherId : teacherId
	};

	try {
		MongoClient.connect(url,function(err,db){
			console.log("item going to insert - ",item);
			db.collection('student').insert(item,function(err,result){
				console.log('insert done', result);
				db.close();
				if(err) {
					res.send({status: 201, msg: "Some thing went wrong"})
				} else {
					res.send({status:200, msg : "Data insert successfully"});
				}
			});
		});
	} catch(e) {
		console.log("there is an error - ",e);
		res.send({status: 201, msg: "Some thing went wrong"})
	}
	
});





// router.post('/getStudentsList',function(req,res,next) {
// 	console.log("request data is - ",req.body);

// 	var teacherName = req.body.teacherName;
// 	console.log("teachername is - ",teacherName)
// 	try {
// 		MongoClient.connect(url,function(err,db){

// 			var teacherId;

// 			db.collection('teacher').find({name : teacherName}).toArray(function(err,result){
// 				console.log('result of teacher is - ', result);
// 				teacherId = result[0]._id;
// 				console.log("teacherId is in teacher function- line no.211",teacherId);
// 				// db.close();
// 				// if(err) {
// 				// 	res.send({status: 201, msg: "Some thing went wrong"})
// 				// } else {
// 				// 	res.send({status:200, msg : "Data fetch successfully"});
// 				// }
// 				teacherId = teacherId.toString();

// 				console.log("teacherId is -",teacherId, typeof teacherId)
			
// 				db.collection('student').find({teacherId : teacherId},{name:1}).toArray(function(err,result){
// 					console.log('result of students is - ', result);
// 					db.close();
// 					if(err) {
// 						res.send({status: 201, msg: "Some thing went wrong"})
// 					} else {
// 						res.send({status:200, msg : "Data fetch successfully", data : result});
// 					}
// 				});
// 			});
// 		});
// 	} catch(e) {
// 		console.log("there is an error - ",e);
// 		res.send({status: 201, msg: "Some thing went wrong"})
// 	}
	
// });


router.post('/getStudentsList1',function(req,res,next) {
	console.log("request data is - ",req.body);

	var teacherName = req.body.teacherName;
	console.log("teachername is - ",teacherName);
	
	getTeacher(teacherName, function(teacherIdResp) {
		console.log("teacherId resp is - ",teacherIdResp);
		getStudentByTeacherId(teacherIdResp,function(studentResponse){
			console.log("student are - ",studentResponse);	
			res.send({status:200, msg : "Data fetch successfully", data : studentResponse});
	  	});
		

	});
})


var getTeacher = function(teacherName, cb) {
	console.log('teacherName is in getTeacher- ',teacherName);
	MongoClient.connect(url,function(err,db){

		db.collection('teacher').find({name : teacherName}).toArray(function(err,result){
			console.log('result of teacher is - ', result);
			teacherId = result[0]._id;
			db.close();
			return cb(teacherId);
			
		});

	});
}

var getStudentByTeacherId = function(teacherId,cb) {
	console.log('teacherId is - ',teacherId);
	MongoClient.connect(url,function(err,db){

		teacherId = teacherId.toString();
		console.log("teacherId is -",teacherId, typeof teacherId)

		db.collection('student').find({teacherId : teacherId}).toArray(function(err,result){
			console.log('result of teacher is - ', result);
			 db.close();
			return cb(result);
		});

	});
}



router.get('/getStudentInfo', function(req, res, next) {
	console.log("req.query is - ",req.query);

	var studentName = req.query.name;
	var finalRespose = {};
	commonFunction.getStudentInfo(studentName, function(studentResponse) {
		console.log("student response is - ",studentResponse);
		if(studentResponse.success) {
			if(studentResponse.data.length > 0) {
				var student = studentResponse.data[0];
				console.log("student found going for furture operation",student);
				var studentId = student._id;
				var teacherId = student.teacherId;
				finalRespose.studentName = student.name;
				finalRespose.email = student.email;
				console.log("student id is -",studentId);
				commonFunction.getTeacherDetailsForStudent(teacherId,function(teacherResponse) {
					console.log("teacher details-",teacherResponse);
					if(teacherResponse.success) {
						if(teacherResponse.data.length > 0) {
							var teacher = teacherResponse.data[0];
							finalRespose.teacherName = teacher.name;
							return res.send({status: 200, data: finalRespose});
						} else {
							return res.send({status: 200, msg: "Teacher does not exist"});
						}
					} else {
						return res.send({status : 201 ,msg : teacherResponse.msg})
					}
				});
			} else {
				return res.send({status: 200, msg: "Student does not exist"});
			}
		} else {
			return res.send({status: 201, msg: studentResponse.msg})
		}
	})
});




module.exports = router;
