var firebaseConfig = {
    apiKey: "AIzaSyBag6D60KOgbUX5mwebz8QzFe6EWKWuRRo",
    authDomain: "trainscheduler-9e1d5.firebaseapp.com",
    databaseURL: "https://trainscheduler-9e1d5.firebaseio.com",
    projectId: "trainscheduler-9e1d5",
    storageBucket: "",
    messagingSenderId: "322192537019",
    appId: "1:322192537019:web:3fc8a8a4e4081b64"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var trainName;
  var destination;
  var frequency;
  var nextArrival;
  var minutesAway;

  