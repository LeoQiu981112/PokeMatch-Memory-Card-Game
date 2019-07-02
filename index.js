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


// app.get('/display',function(req,res){
//   pool.query("select * from students;", function(error, result){
//   if(error) {
//     //return console.error(error);
//     console.log("no work1!");
//   }
//   else{
//     var results= result.rows;
//     res.render('pages/db',{results: results});
//   }
//   })
// });

app.post('/login', function(req, res){
  var user=req.body.Lid;
  var pwd=req.body.Lpassword;
  console.log("result id is" + user);

  //gm
  if(user=='GM1' && pwd=='123'){
    res.redirect('https://stark-spire-21434.herokuapp.com/GM.html');
  }
  //query
  var match = "select * from players where id in " + "('" + user + "')" + ";"; 
  console.log(match);

  pool.query(match, function(error, result){
    
	  if(result.rows.id != user) {
      console.log("UseID dose not exist!");
      res.redirect('https://stark-spire-21434.herokuapp.com/wrongID.html');
	  }
	  else if(result.rows.password != pwd){
      console.log("Wrong password!");
      res.redirect('https://stark-spire-21434.herokuapp.com/wrongPassword.html');
    } 	  
    else{
      res.redirect('https://stark-spire-21434.herokuapp.com/homepage.html');
    } 
  });

  // //query
  // var match="select * from players where id = " + "'" + user + "'" + 
  //           "and password                   = " + "'" + pwd  + "'" + ";";
  // console.log("query: " + match );

  //   pool.query(match, function(error, result){
	//   	if(error) {
	//       console.log("query fail!");
	//     } 

	//     else{
	// 	    //res.redirect('https://stark-spire-21434.herokuapp.com/homepage.html');
	// 	    console.log("match? success");
	// 	    if(result!=[]){
	// 		    var results = result.rows;
	// 		    console.log(result);
	// 		    res.redirect('https://stark-spire-21434.herokuapp.com/homepage.html');
	// 	    }


	// 	    //create identical login page, cept onload create alert 
	// 	  	else{
	// 		    res.send("username or password incorrect");
	// 		    //console.log("insesrt success!");
	// 	    }
	//    	}
  //   });
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
 
  pool.query(insert, function(error, result){

    if(error) {
      console.log("Insert failed!");
      res.redirect('https://stark-spire-21434.herokuapp.com/signupFailed.html');
    }
    else{
        console.log("Insert succeeded!");
        var results = result.rows;
        console.log(results);
        res.redirect('https://stark-spire-21434.herokuapp.com/login.html');
    }
  });    
})

app.post('/gmmessage', function(req, res){
  var mes=req.body.gmessage;
  var insert = "insert into gm_msg values ('"+mes+"');" 
  console.log(insert);
  pool.query(insert, function(error, result){
    if(error) {
      console.log("Insert failed!");
    }
    else{
      console.log("Insert succeeded!");
      var results = result.rows;
      console.log(results);
    } 
  });
  res.redirect('https://stark-spire-21434.herokuapp.com/GM.html');
}); // end of gm msg


app.post('/remove', function(req, res){
	var id3=req.body.Gdelete;
	var remove = "delete from players where id =" +    "'" + id3 + "'"  
                                                 + ";" ;   
  console.log(remove);

  pool.query(remove, function(error, result){
    //console.log(result);

	  if(result.rowCount) {
      console.log("Remove succeeded!");
      res.redirect('https://stark-spire-21434.herokuapp.com/deleteSucceeded.html');
	  }
	  else{
      //return console.error(error);
      console.log("Remove failed!");
      res.redirect('https://stark-spire-21434.herokuapp.com/deleteFailed.html');
	  } 	  
  });


// res.redirect('http://localhost:5000/main.html');
});



app.post('/search', function(req, res){
	var sid=req.body.gsearch;
	var search = "select * from players where id in " + "('" + sid + "')" + ";"; 
                                                   
  console.log(search);

  pool.query(search, function(error, result){
    //console.log(result);

	  if(result.rowCount) {
      console.log("Search succeeded!");
      //var results = result.rows;
      res.redirect('https://stark-spire-21434.herokuapp.com/searchSucceeded.html');
	  }
	  else{
      console.log("Search failed!");
      res.redirect('https://stark-spire-21434.herokuapp.com/searchFailed.html');
	  } 	   
  }); 	  

  //res.redirect('https://stark-spire-21434.herokuapp.com/GM.html');
// res.redirect('http://localhost:5000/main.html');
});


app.post('/modify', function(req, res){
  //var mid=req.body.mid;

  var mid=   "'" + "xyz" + "'" ;

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

// modify security question, get question from db?????
//security question 从heroku db 里的sec_q table 里取
//根据players 里sqnum，每个问题有个对应的数字
//Heroku pg:psql 登录

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




// app.delete('/user/:id', (req, res) => {
//   console.log(req.params.id)
//   // delete the user with id
// });
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
// app.get('/', (req, res) => res.render('pages/index'))



// app.get('/users/:id', function(req, res){
//   console.log(req.params.id);
// })

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


