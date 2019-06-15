
const express = require('express')
const path = require('path')
const PORT = process.env.PORT 
const app = express();
const { Pool } = require('pg');
var bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({ extended: true })); 



app.post('/insert', function(req, res){

//   pool.query("select * from students", function(error, result){
//   if(error) {
//     //return console.error(error);
//     console.log("no work1!");
//   }
//     console.log("IT WORKED!!!");
//     var results=result.rows;
//     console.log(results);

// })
//test insert, the  entries can be replace by elements pointed to by html ids.   

var id1=req.body.id1;

var fn1=req.body.fn1;

var ln1=req.body.ln1;

var w1=req.body.w1;

var h1=req.body.h1;

var hc1=req.body.hc1;

var gpa1=req.body.gpa1;

  var insert = "insert into students values ( " +        id1          + "," 
                                                + "'" +  fn1    + "'" + "," 
                                                + "'" +  ln1    + "'" + "," 
                                                +        w1           + "," 
                                                +        h1           + "," 
                                                + "'" +  hc1    + "'" + "," 
                                                +        gpa1      
                                                + ")"     
                                                + ";"  ;
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
  })


   res.redirect('http://localhost:5000/main.html');

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

  res.redirect('http://localhost:5000/main.html');

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

  res.redirect('http://localhost:5000/main.html');

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









  // var  id_cond="";
  // var  fn_cond="";
  // var  ln_cond="";
  // var  ht_cond="";
  // var  wt_cond="";
  // var  hc_cond="";
  // var gpa_cond="";
  // var remove = "DELETE FROM students where"    + "id = " + ""
  //                                              + "'" + "lisa"   + "'" + "," 
  //                                              + "'" + "chen"   + "'" + "," 
  //                                              + "'" + "180"    + "'" + "," 
  //                                              + "'" + "36"     + "'" + "," 
  //                                              + "'" + "yellow" + "'" + "," 
  //                                              + "'" + "3.5"    + "'" 
  //                                              + ")"     
  //                                              + ";"  ;



  // var  id_cond1="";
  // var  fn_cond1="";
  // var  ln_cond1="";
  // var  ht_cond1="";
  // var  wt_cond1="";
  // var  hc_cond1="";
  // var gpa_cond1="";
  // var modify = "insesrt into students values (" + "'" + "4"      + "'" + "," 
  //                                                 + "'" + "lisa"   + "'" + "," 
  //                                                 + "'" + "chen"   + "'" + "," 
  //                                                 + "'" + "180"    + "'" + "," 
  //                                                 + "'" + "36"     + "'" + "," 
  //                                                 + "'" + "yellow" + "'" + "," 
  //                                                 + "'" + "3.5"    + "'" 
  //                                                 + ")"     
  //                                                 + ";"  ;

//UPDATE students SET weight =100,height=20 WHERE id=1;








app.get('/users/:id', function(req, res){
  console.log(req.params.id);
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))



// need a to string value for numbers