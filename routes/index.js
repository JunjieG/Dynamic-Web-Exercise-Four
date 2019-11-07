const express = require('express');
const router = express.Router();

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
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
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();


// Getting all articles
router.get('/', function (req, res) {
  var blogs = []
  let blogRef = db.collection('blog-posts');
  let allBlogs = blogRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        blogs.push({
          id: doc.id,
          content: doc.data()
        })
      });
      res.send(blogs)
    })
    .catch(err => {
      console.log('Error', err)
      res.send('Article not found...');
    });
})

// Getting specific articles
router.get('/:id', function (req, res) {
  let blogRef = db.collection('blog-posts').doc(req.params.id);
  let getDoc = blogRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        res.send('No such document!');
      } else {
        console.log('Document data:', doc.data());
        res.send(doc.data());
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      res.send('Error getting document');
    });
})

module.exports = router;
