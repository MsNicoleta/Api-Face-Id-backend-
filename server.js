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
    connectionString: process.env.DATABASE_URL,
    ss1: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB

  }
});
// mydb.select('*').from('users').then(data => {
//   console.log(data);
// });

const app = express();


app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('it is working')  //here we will see the information the user insert at the registration point.

  // eslint-disable-next-line no-undef
})

//below we have the signin form

app.post('/signin', signin.handleSignin(mydb, bcrypt))

app.post('/register', (req, res) => { register.handleRegister(req, res, mydb, bcrypt) }) // this is so called dipendencies injections

// The get profile id below will return the profile object of the user.
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, mydb) })

app.put('/image/', (req, res) => { image.handleImage(req, res, mydb) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })




//below we have the server cnnection
app.listen(process.env.PORT || 29504, () => {
  console.log(`app is listening on port ${process.env.PORT}`);
})
