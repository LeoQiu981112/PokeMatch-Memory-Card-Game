
const express = require('express')
const path = require('path')
const PORT = process.env.PORT 
const app = express();
const { Pool } = require('pg');
// var pool = new Pool({
//   user: 'postgres',
//   password: '123456',
//   host: 'localhost',
//   database: 'test'
// });

var pool = new Pool({
  connectionString : process.env.DATABASE_URL
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/hi', function(req, res){

  pool.query("select * from students", function(error, result){
  if(error) {
    //return console.error(error);
    console.log("no work1!");
  }
    console.log("IT WORKED!!!");
    var results=result.rows;
    // for(var i=0;i<result.length;i++){
    //   var row=results.item(i);
    //   console.log(row);
    // }
    //console.log(result.rows);
 	console.log(results);
//-----
  //test insert, the  entries can be replace by elements pointed to by html ids.   
  // var insert = "insert into students values ( " +        "10"           + "," 
  //                                               + "'" + "dog"   + "'" + "," 
  //                                               + "'" + "cat"   + "'" + "," 
  //                                               +       "100"          + "," 
  //                                               +       "10"           + "," 
  //                                               + "'" + "blue" + "'" + "," 
  //                                               +       "3.7"      
  //                                               + ")"     
  //                                               + ";"  ;
  // console.log(insert);

  // pool.query(insert, function(error, result){
  // if(error) {
  //   //return console.error(error);
  //   console.log("insert fail!");
  // }

  // var results = result.rows;
  // console.log(results);
  // //console.log("insesrt success!");
  // });





  });

//--------


function myFunction(){
	// var MAX,AU;

	// MAX =Number(document.getElementById('C1').value);
	// AU  =Number(document.getElementById('C2').value);

	// var n1="",n2="",results="";

	//   pool.query("select * from students", function(error, result){
	//   if(error) {
	//     console.log("no work1!");
	//   }
	//     results=result.rows;
	//   });

	//     //console.log(results);
	//     n1=results[0];
	//     n2="hi";
	//     console.log("n1:");
	//     console.log(n1);
	// 	document.getElementById("R1").innerHTML="1234";
	// 	document.getElementById("R2").innerHTML=n2;
}
