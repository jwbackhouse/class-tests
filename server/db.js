const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
});

const db = firebase.firestore();

module.exports = db;
