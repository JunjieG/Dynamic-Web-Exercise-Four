const express = require('express');
const router = express.Router();

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
router.use(express.urlencoded());
router.use(express.json()); 

 //Add the Firebase products that you want to use
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyC9tsUDt_k22FXcTRSETIYSR2uJoBOUC20",
  authDomain: "idm-exercise-four.firebaseapp.com",
  databaseURL: "https://idm-exercise-four.firebaseio.com",
  projectId: "idm-exercise-four",
  storageBucket: "idm-exercise-four.appspot.com",
  messagingSenderId: "286645803715",
  appId: "1:286645803715:web:6d93d7baf9166ed5cca076"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();


router.get('/', function (req, res) {
  res.sendFile(
    __dirname + '/post.html'
  )
})

router.post('/submitted', (req, res) => {
  console.log(req.body)
  let addDoc = db.collection('blog-posts').add({
    Author: req.body.author,
    Title: req.body.title,
    Content: req.body.content,
  }).then(ref => {
    response = "Added document with ID: " + ref.id;
    res.send(response);
    console.log(response);
  });
})
// Getting all articles

module.exports = router;
