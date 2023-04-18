

const handleSignin = (req, res,mydb,bcrypt) => {
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
}

module.exports = {
    handleSignin: handleSignin
};
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