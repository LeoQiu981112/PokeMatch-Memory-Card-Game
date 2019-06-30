const express = require('express')
const path = require('path')
const PORT = process.env.PORT 
const app = express();
const { Pool } = require('pg');
var bodyParser = require('body-parser');

var flash = require('connect-flash');
var session = require('express-session');

// var pool = new Pool({
//   user: 'postgres',
//   password: '123456',
//   host: 'localhost',
//   database: 'test'
// });
app.use(flash());

var pool = new Pool({
  connectionString : process.env.DATABASE_URL
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: true })); 



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
    res.redirect('https://stark-spire-21434.herokuapp.com/homepage.html');
  }

  else{
    res.send("username or password incorrect");
    // res.redirect('https://stark-spire-21434.herokuapp.com/login.html');
  }

});



app.post('/signup', function(req, res){
  try{
    var id=req.body.sid;
    var pass=req.body.spassword;
    var name=req.body.sname;
    var age=req.body.sage;
    var ques=req.body.squestion;
    var ans=req.body.sanswer;
    var insert = "insert into players values ( "  + "'" +  sid      + "'" + "," 
                                                + "'" +  spass    + "'" + "," 
                                                + "'" +  sname    + "'" + "," 
                                              +        sage           + "," 
                                                +        sques          + "," 
                                                + "'" +  sans     + "'"     
                                                + ")"     
                                                + ";"  ;
    console.log(insert);
  }
  catch (ex){
    console.log(`Duplicated User ${ex}`);
  }
  

  pool.query(insert, function(error, result){
  if(error) {
    //return console.error(error);
    console.log("insert fail!");
  }
  console.log("insert success");
  var results = result.rows;
  console.log(results);
  //console.log("insesrt success!");
  })


  // res.redirect('http://localhost:5000/main.html');
res.redirect('https://stark-spire-21434.herokuapp.com/login.html');
});



app.post('/remove', function(req, res){

  var id3=req.body.id3;

  var remove = "delete from students where id =" +        id3  
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

})

res.redirect('https://stark-spire-21434.herokuapp.com/main.html');
// res.redirect('http://localhost:5000/main.html');
});




app.post('/modify', function(req, res){
var id2=req.body.id2;

var fn2=req.body.fn2;

var ln2=req.body.ln2;

var w2=req.body.w2;

var h2=req.body.h2;

var hc2=req.body.hc2;

var gpa2=req.body.gpa2;

var fp="update students set ";

var sp= " where id = " + id2 + ";";

var tmp;
if(fn2){
  tmp= fp + "firstname = " + "'" + fn2 + "'" + sp;
  pool.query(tmp, function(error, result){
  if(error) {
    console.log("mod fail!");
  }
  })
}

if(ln2){

  tmp= fp + "lastname = " + "'" + ln2 + "'" + sp;
  pool.query(tmp, function(error, result){
  if(error) {
    console.log("mod fail!");
  }
  })
}

if(w2){
  tmp= fp + "weight = " + w2 + sp;
  pool.query(tmp, function(error, result){
  if(error) {
    console.log("mod fail!");
  }
  })
}

if(h2){
  tmp= fp + "height = " + h2 + sp;
  pool.query(tmp, function(error, result){
  if(error) {
    console.log("mod fail!");
  }
  })
}

if(hc2){

  tmp= fp + "hair_colour = " + "'"+ hc2 + "'" + sp;
  pool.query(tmp, function(error, result){
  if(error) {
    console.log("mod fail!");
  }
  })
}

if(gpa2){
  tmp= fp + "gpa = " + gpa2 + sp;
  pool.query(tmp, function(error, result){
  if(error) {
    console.log("mod fail!");
  }
  })
}

res.redirect('https://stark-spire-21434.herokuapp.com/main.html');
// res.redirect('http://localhost:5000/main.html');
});
//-----
  







 //  });

//--------











app.post('/deleteUser', (req, res) => {
  // req.body.uid
  // delete the user with uid
  res.redirect('http://localhost:5000/main.html');
});


app.delete('/user/:id', (req, res) => {
  console.log(req.params.id)
  // delete the user with id
});
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))












app.get('/users/:id', function(req, res){
  console.log(req.params.id);
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))



// need a to string value for numbers