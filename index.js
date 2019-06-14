const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();

const { Pool } = require('pg');
// var pool = new Pool({
//   user: 'postgres',
//   password: 'root',
//   host: 'localhost',
//   database: 'postgres'
// });

var pool = new Pool({
  connectionString : process.env.DATABASE_URL
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.post('/loginnn', function(req, res){
  // request body info
  console.log(req.body);
  // validate user
  // respond
})
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
app.get('/users', function(req, res){
  pool.query("select * from users", function(error, result){
    var results = { 'results': (result.rows[0].id) ? result.rows : [] };
    res.render('pages/db', results);
  });
});
app.get('/users/:id', function(req, res){
  console.log(req.params.id);
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
