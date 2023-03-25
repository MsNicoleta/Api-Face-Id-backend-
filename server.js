const express = require('express');

const app = express();

app.use(express.json());

const database = {
    users:[
        {
            id: "123",
            name: "John",
            email: "john@example.com",
            password: "password",
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
    ]
}

app.get('/', (req, res) => {
        res.send(database.users);  //here we will see the information the user insert at the registration point.

})

//below we have the signin form 
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('sucsess');
        }else{
            res.status(400).json('error logging in')
        }
    res.json('signin')
});

//below we have the registration form with all the information from the user
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '126',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
    })

    //below we have the server commection
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