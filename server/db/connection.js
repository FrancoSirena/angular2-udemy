var firebase = require('firebase');
var firebaseConfig = require('./../config/firebase');
require('firebase/database');

var db = firebase.initializeApp(firebaseConfig.config);

module.exports = db;