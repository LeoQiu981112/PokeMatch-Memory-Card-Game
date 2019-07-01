// ------ Objects ---- //

// var user = { "fname":"bobby", "age":25 }
//
// user.fname
// "bobby"
// var user = { "fname":"bobby", "age":25, "array":[1,2,3,4], "userObj":{"a":3} }
// undefined
// user.array[0]
// 1
// user.userObj.a
// 3

// constructor

function User(fname,age){
  this.firstname = fname;
  this.age = age;
  this.description = function(){
    return this.firstname + " is " + this.age + " years old";
  }
}

var u1 = new User('steve', 34);
u1.description();
u1.email = "bobbyc@sfu.ca";

// ---------- JSON --------------- //

var myObj = { "name": "Bobby", "paswrd": "1234"};
var str = JSON.stringify(myObj);
// send to server
var obj = JSON.parse(str);
// server works data
