
const handleImage = (req, res,mydb) => { 
  const { id } = req.body;
  mydb('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get the entries'))
}

   module.exports = {
    handleImage: handleImage
};