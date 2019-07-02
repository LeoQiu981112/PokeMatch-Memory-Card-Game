const express = require('express')
const path = require('path')
const PORT = process.env.PORT 
const app = express();
const { Pool } = require('pg');
var bodyParser = require('body-parser');


//var pool = new Pool({
//  user: 'postgres',
//  password: 'postgres',
//  host: 'localhost',
//  database: 'test',
//  port: 5432,
//});


var pool = new Pool({
  connectionString : process.env.DATABASE_URL
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static(path.join(__dirname, 'views')))
app.set('view engine', 'ejs')


app.get('/display',function(req,res){
  pool.query("select * from students;", function(error, result){
  if(error) {
    //return console.error(error);
    console.log("no work1!");
  }
  else{
    var results= result.rows;
    res.render('pages/db',{results: results});
  }
  })
});

app.post('/login', function(req, res){
var user=req.body.Lid;
var pwd=req.body.Lpassword;
console.log("result id is" + user );

  // swap for 1 combined query once db is working
  if(user == "1234" && pwd == "6666"){
    res.redirect('https://stark-spire-21434.herokuapp.com/homepage.html');
  }

  else if(user=='GM1' && pwd=='123'){
    res.redirect('https://stark-spire-21434.herokuapp.com/GM.html');
  }

  else{
    res.send("username or password incorrect");
    // res.redirect('https://stark-spire-21434.herokuapp.com/login.html');
  }

});

app.post('/signup', function(req, res){
  
  var sid=req.body.sid;
  var spass=req.body.spassword;
  var sname=req.body.sname;
  var sage=req.body.sage;
  var sques=req.body.squestion;
  var sans=req.body.sanswer;
  var insert = "insert into players values ("   + "'" +  sid      + "'" + "," 
                                                + "'" +  spass    + "'" + "," 
                                                + "'" +  sname    + "'" + "," 
                                                +        sage           + "," 
                                                +        sques          + "," 
                                                + "'" +  sans     + "'"     
                                                + ")"     
                                                + ";"  ;
  console.log(insert);

  //var flag = 0;
  //pool.query("select id from players;", () => {
  //  var results = result.rows;
  //  for(var i = 0,len = results.length; i < len; i++){
  //    if (id ==results[i]){
  //      console.alert("Duplicated Users!");
  //      break;
  //    }
  //  }
  //  flag = 1;
  //  res.redirect('https://stark-spire-21434.herokuapp.com/signup.html');
  //});

  //if (flag == 0){
    pool.query(insert, function(error, result){
      if(error) {
        //return console.error(error);
        console.log("insert failed!");
      }
      else{
        console.log("insert succeeded!");
        var results = result.rows;
        console.log(results);
        //console.log("insesrt success!");
      }
    });
    // res.redirect('http://localhost:5000/main.html');
    res.redirect('https://stark-spire-21434.herokuapp.com/login.html');
  //}
  
}); // end of signup

app.post('/gmmessage', function(req, res){
  var mes=req.body.gmessage;
  var insert = "insert into gm_msg values ('"+mes+"');" 
  console.log(insert);
  pool.query(insert, function(error, result){
    if(error) {
    //return console.error(error);
    console.log("insert fail!");
    }
    console.log("insert success");
    var results = result.rows;
    console.log(results);
    //console.log("insesrt success!");
  });
  res.redirect('https://stark-spire-21434.herokuapp.com/GM.html');
}); // end of gm msg

app.post('/remove', function(req, res){

  var id3=req.body.Gdelete;

  var remove = "delete from players where id =" +    "'" + id3 + "'"  
                                                 + ";" ;   
  console.log(remove);

  pool.query(remove, function(error, result){
    if(error) {
      //return console.error(error);
      console.log("remove failed!");
    }
    else{
      var results=result.rows;
    } 
    console.log(results);
  });

res.redirect('https://stark-spire-21434.herokuapp.com/GM.html');
// res.redirect('http://localhost:5000/main.html');
});




app.post('/modify', function(req, res){
  //var mid=req.body.mid;
  var mid=   "'" + "xyz" + "'" 
  var mpassword=req.body.mpassword;
  var mname=req.body.mname;
  var mage=req.body.mage;
  var mquestion=req.body.mquestion;
  var manswer=req.body.manswer;

  var fp="update players set ";
  var sp= " where id = " + mid + ";";
  var tmp;

  if(mpassword){
    tmp= fp + "password = " + "'" + mpassword + "'" + sp;
    pool.query(tmp, function(error, result){
      if(error) {
        console.log("mod fail!");
      }
    });
  }

  if(mname){
    tmp= fp + "name = " + "'" + mname + "'" + sp;
    pool.query(tmp, function(error, result){
      if(error) {
        console.log("mod fail!");
      }
    });
  }

  if(mage){
    tmp= fp + "age = " + mage + sp;
    pool.query(tmp, function(error, result){
      if(error) {
        console.log("mod fail!");
      }
    });
  }

  if(mquestion){
    tmp= fp + "sqnum = " + mquestion + sp;
    pool.query(tmp, function(error, result){
      if(error) {
        console.log("mod fail!");
      }
    });
  }

  if(manswer){
    tmp= fp + "ans = " + "'"+ manswer + "'" + sp;
    pool.query(tmp, function(error, result){
      if(error) {
        console.log("mod fail!");
      }
    });
  }

  res.redirect('https://stark-spire-21434.herokuapp.com/homepage.html');
// res.redirect('http://localhost:5000/main.html');
});


// app.get('/users/:id', function(req, res){
//   console.log(req.params.id);
// })


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));