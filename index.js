
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



app.get('/users', function(req, res){

  // pool.query("select * from students", function(error, result){
  // if(error) {
  //   //return console.error(error);
  //   console.log("no work1!");
  // }
  //   console.log("IT WORKED!!!");
  //   var results=result.rows;
  //   // for(var i=0;i<result.length;i++){
  //   //   var row=results.item(i);
  //   //   console.log(row);
  //   // }
  //   //console.log(result.rows);
  // for(var row in results){
  //   //type string
  //   console.log(results[row]);
  // }
//-----
  //test insert, the  entries can be replace by elements pointed to by html ids.   
  var insert = "insert into students values ( " +        "4"           + "," 
                                                + "'" + "lisa"   + "'" + "," 
                                                + "'" + "chen"   + "'" + "," 
                                                +       "180"          + "," 
                                                +       "36"           + "," 
                                                + "'" + "yellow" + "'" + "," 
                                                +       "3.5"      
                                                + ")"     
                                                + ";"  ;
  console.log(insert);

  pool.query(insert, function(error, result){
  if(error) {
    //return console.error(error);
    console.log("insert fail!");
  }

  var results = result.rows;
  console.log(results);
  //console.log("insesrt success!");
  });







  });

//--------











app.post('/deleteUser', (req, res) => {
  // req.body.uid
  // delete the user with uid
  res.redirect('/');
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