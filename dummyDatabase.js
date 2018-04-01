var und = require('underscore');

var users = [{
	"name" : "dolly",
	"mobile" : "12345",
	"email"  : "dolly@gmail.com"	
},
{
	"name" : "mona",
	"mobile" : "1357",
	"email"  : "mona@gmail.com"	
},
{
	"name" : "mona",
	"mobile" : "123",
	"email"  : "mona1@gmail.com"	
},
{
	"name" : "sushil",
	"mobile" : "2468",
	"email"  : "sushil@gmail.com"
}]

exports.info = function(name) {
	var search = und.findWhere(users, {name: name});
	if(search) {
		return search;
	} else {
		return "No user found";
	}

}




/*
	console.log("abcd", name);
	var found = 0;
	var info;
	for(var i=0; i<users.length;i++)
	{
		if(users[i].name == name) {
			found=1;
			info=users[i];
		}
	}
	if(found==1)
	  {
	  return info;
	  }
	  else
	  {
	  return "No user found"
	  }
	  */