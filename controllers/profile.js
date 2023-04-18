
const handleProfileGet = (req, res,mydb) =>{
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
}
    module.exports = {
    handleProfileGet
};