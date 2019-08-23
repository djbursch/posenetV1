const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://jax:pass@100.25.75.187/pictures', {useMongoClient: true });
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static('public'));
app.use('/upload', express.static('upload'));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// initialize posenet
app.use('/posebrain', require('./posenet/posebrain'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('now listening for requests');
});

