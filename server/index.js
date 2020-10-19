const express = require('express');
require('dotenv').config();
const router = require('./router.js');

const port = process.env.PORT || 8080;

const app = express();

app.use(express.json());
// Handle CORS issues
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
