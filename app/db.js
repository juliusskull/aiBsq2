'user strict';
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");


var admin = require("firebase-admin");

var serviceAccount = require("../vtfirebaseproject-6dc86-firebase-adminsdk-ue6c2-a8fc8f2fab.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vtfirebaseproject-6dc86.firebaseio.com"
});
module.exports = admin;