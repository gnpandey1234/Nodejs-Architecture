// Import packages
const express = require('express')
const morgan = require('morgan')
const userroutes = require('./routes/users')
var bodyParser = require('body-parser')

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//User Routes
app.use('/users/', userroutes);

// Morgan
app.use(morgan('tiny'))

// Home Page
app.get('/', (req, res) => {
    res.send('E2E Home Page');
});

// Starting server
app.listen('1337')
