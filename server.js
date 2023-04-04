const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();





const database = {
    users:[
        {
            id: "123",
            name: "John",
            email: "jon@ex.com",
            password: "lolly",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Sally",
            email: "sally@example.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }
  ],
  // login: [
  //   {
  //     id: "987",
  //     has: '',
  //     email: "john@example.com",
  //   }
  // ]
}
app.use(express.json());
app.use(cors())

app.get('/', (_req, res) => {
        res.send(database.users);  //here we will see the information the user insert at the registration point.

})


//below we have the signin form 
app.post('/signin', (req, res) => {
const { email, name, password } = req.body;
   bcrypt.hash(password, null, null, function(_err, hash) {
    console.log(hash);
  });
    bcrypt.compare("lolly", '$2a$10$eBE6Ni9Qnr4edXAnAZ.RAuqndpn2pFdMr1OMyRWh5s06ru1vKmyAu', function(_err, res) {
     console.log('first guess', res)
});
bcrypt.compare("veggies", '$2a$10$0fBKrStki3UH5wlWKw7Z.OldQ6LYBgtFDv9pky9qXj2NTPclRMWQ', function(_err, res) {
    console.log('second guess', res)
});

    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        }else{
            res.status(400).json('error logging in')
        }
    // res.json('signin')
});

//below we have the registration form with all the information from the user
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  // bcrypt.hash(password, null, null, function(_err, hash) {
  //   console.log(hash);
  // });
  

    database.users.push({
        id: '126',
        name: name,
        email: email,
        entries: 0,
        password: password,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]); // length-1 will sjow us the last user added
    })
// The get profile id below will return the profile object of the user.
    app.get('/profile/:id',(req, res) => {
      const { id } = req.params;
      let found = false;
      database.users.forEach(user => {
        if (user.id === id) {
          found = true;
          return res.json(user);
        }
      })
        if (!found) {
          res.status(404).json('not found');
      }  
    })

//     app.put('/image', (req, res) => {
//   const { id } = req.body;
//   database('users').where('id', '=', id)
//   .increment('entries', 1)
//   .returning('entries')
//   .then(entries => {
//     // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
//     // entries[0] --> this used to return the entries
//     // TO
//     // entries[0].entries --> this now returns the entries
//     res.json(entries[0].entries);
//   })
//   .catch(err => res.status(400).json('unable to get entries'))
// })
app.put('/image/', (req, res) => { 
  const { id } = req.body;
      let found = false;
      database.users.forEach(user => {
        if (user.id === id) {
           found = true;
          user.entries++
          return res.json(user.entries);
    }
      })
     if (!found) {
          res.status(400).json('not found');
      } 
})



/* // Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
}); */


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