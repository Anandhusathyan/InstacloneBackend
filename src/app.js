const express = require("express");
const app = express()
// Parse JSON bodies (as sent by API clients)
//  We are using express.json() middleware to handle JSON data.
app.use(express.json());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
//        next();
//  });
// const cors = require("cors");
// app.use(cors());
//Import all routes present in routes folder
const Route = require('./routes/postDataRoute')

app.use('/', Route)




// app.get()
// app.post()
module.exports = app;

