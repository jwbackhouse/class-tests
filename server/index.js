// All variables now available under process.env.<NAME>
const dotenv = require('dotenv').config();
const express = require('express');
const router = require('./router.js');

const port = process.env.PORT || 8080;

const app = express();

// Handle CORS issues
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(router);

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

module.exports = app;
