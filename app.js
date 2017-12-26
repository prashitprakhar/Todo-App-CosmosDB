'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controllertodo = require('./controller/controllertodo');
const app = express();

//Setting View Engine as EJS
app.set('view engine', 'ejs');

//Using Body Parser for JSON Data Parsing
app.use(bodyParser.json());

//Using router for APIs
//app.use('/api', require('./routes/api'));

//Setting Ststic File
app.use(express.static('./public'));

//Injecting app.js to controller
controllertodo(app);

//Listening to port
app.listen(process.env.port || 3000);
console.log("Listening to Port 3000");

