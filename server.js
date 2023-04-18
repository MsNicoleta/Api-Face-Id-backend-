const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
 
const mydb = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'ng',
    password : 'postgres2023',
    database : 'mydb'
  }
  });
// mydb.select('*').from('users').then(data => {
//   console.log(data);
// });

const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (_req, res) => {
        // eslint-disable-next-line no-undef
        res.send(database.users);  //here we will see the information the user insert at the registration point.

})


//below we have the signin form 

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,mydb,bcrypt)} )


app.post('/register', (req, res) => { register.handleRegister(req,res,mydb,bcrypt) } ) // this is so called dipendencies injections


// The get profile id below will return the profile object of the user.
    app.get('/profile/:id',(req, res) =>{profile.handleProfileGet(req,res,mydb)} )

app.put('/image/',(req, res) =>{image.handleImage(req,res,mydb)} )

/* .then(entries => {
    If using knex.js version 1.0.0 or higher this now 
    returns an array of objects. Therefore, the code goes from:
    entries[0] --> this used to return the entries
    TO
    entries[0].entries --> this now returns the entries
    res.json(entries[0].entries);
  }) */

      //below we have the server cnnection
  app.listen(3000,() => {
      console.log ('app is listening on port 3000');
})


/*
/--> res => the response is working
/ -done- signin rout --> POST request = success/fail
/ -done- register = POST request as we want to add the data to a database in our case a variable to a server = User object that will return
/-to be done- profile/:userId - each user will have their ourn homescreen  --> GET = user
/image --> PUT --> user (image update rank number)


*/