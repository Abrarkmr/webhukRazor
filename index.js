const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect();
})();

const port = 3002;
const payments = require('./routes/razor-payment');

app.post('/', function (req, res) {
    res.send('Hello World')
})



app.use('/payments',payments);



  
app.listen(port , (err) =>{
  if(err){
    console.log(err)
  }
  else{
    console.log("backend is listening on port " + port)
  }
})