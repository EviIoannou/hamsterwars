//javaScript file to upload data about all hamsters

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  //apiKey here
  authDomain: "hamsterwars-64a0f.firebaseapp.com",
  databaseURL: "https://hamsterwars-64a0f.firebaseio.com",
  projectId: "hamsterwars-64a0f",
  storageBucket: "hamsterwars-64a0f.appspot.com",
  messagingSenderId: "27450678364",
  appId: "1:27450678364:web:529314dab302620d465a99",
});

var db = firebase.firestore();
var data = require("./data.json");

data.forEach(function (obj) {
  db.collection("hamsters").add({
      id: obj.id,
      name: obj.name,
      age: obj.age,
      favFood: obj.favFood,
      loves: obj.loves,
      imgName: obj.imgName,
      wins: obj.wins,
      defeats: obj.defeats,
      games: obj.games
    }).then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});