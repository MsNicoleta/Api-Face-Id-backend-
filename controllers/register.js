

 const handleRegister = (req,res,mydb,bcrypt) => {
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
}

module.exports = {
    handleRegister: handleRegister
};


