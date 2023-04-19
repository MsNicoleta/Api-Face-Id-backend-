const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const Clarifai = require("clarifai");
console.log(Clarifai)

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key ebcdf5e3de5249c5b10551e3c9759066");


const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
      model_id: 'face-detection',
      // model_id: "aaa03c23b3724a16a56b629203edc62c",
      inputs: [{ data: { image: { url: req.body.input } } }]
      
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
        return;
      }

      console.log("Predicted concepts, with confidence values:")
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ": " + c.value);
      }
      res.json(response);

    }
  );
  // app.models
  // .then(data => {
  //   res.json(data);
  // })
  
}
  

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
/* .then(entries => {
    If using knex.js version 1.0.0 or higher this now 
    returns an array of objects. Therefore, the code goes from:
    entries[0] --> this used to return the entries
    TO
    entries[0].entries --> this now returns the entries
    res.json(entries[0].entries);
  }) */
   module.exports = {
     handleImage,
      handleApiCall
};