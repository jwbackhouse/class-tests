const path = require('path');
const express = require('express');
require('dotenv').config();
const router = require('./router.js');

const port = process.env.PORT || 8080;

// const publicPath = path.join(__dirname, '../client');
// const viewsPath = path.join(__dirname, '../templates');

// Configure Express
const app = express();
// app.set('view engine', 'pug');
// app.set('views', viewsPath);
// app.use(express.static(publicPath));
// app.use(express.urlencoded({
//   extended: true
// }));
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
