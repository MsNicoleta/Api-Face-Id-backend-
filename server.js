const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
 
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

app.post('/signin', (req, res) => {
  mydb.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return mydb.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})


/* .insert({
  If using Knex.js version 1.0.0 or higher this 
  now returns an array of objects. Therefore, the code goes from:
  loginEmail[0] --> this used to return the email
  TO
  loginEmail[0].email --> this now returns the email
     email: loginEmail[0].email, // <-- this is the only change!
     name: name,
     joined: new Date()
}) */


//below we have the registration form with all the information from the user

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);// in this examole we will use a synchronous hash by storing the passords as they will be requested and the next login. for this we will have to use code blocks named transactions so if one system fails they both fail or proseed .
    mydb.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')//trx = transaction
          .returning('*')
          .insert({
        
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
})
    


// The get profile id below will return the profile object of the user.
    app.get('/profile/:id',(req, res) => {
      const { id } = req.params;
      mydb.select('*').from('users').where({id})
        .then(user => {
          // console.log(user)
          if (user.length) {
            res.json(user[0]);
          } else {
             res.status(400).json('Not found');
          }
        })
      .catch(err => res.status(400).json('error getting user'))
      //   if (!found) {
      //     res.status(404).json('not found');
      // }  
    })

app.put('/image/', (req, res) => { 
  const { id } = req.body;
  mydb('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get the entries'))
})

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