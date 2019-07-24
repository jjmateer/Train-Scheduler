var firebaseConfig = {
    apiKey: "AIzaSyBag6D60KOgbUX5mwebz8QzFe6EWKWuRRo",
    authDomain: "trainscheduler-9e1d5.firebaseapp.com",
    databaseURL: "https://trainscheduler-9e1d5.firebaseio.com",
    projectId: "trainscheduler-9e1d5",
    storageBucket: "trainscheduler-9e1d5.appspot.com",
    messagingSenderId: "322192537019",
    appId: "1:322192537019:web:3fc8a8a4e4081b64"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
// Train Name
// Destination 
// First Train Time -- in military time
// Frequency -- in minutes
// Code this app to calculate when the next train will arrive; this should be relative to the current time.
// Users from many different machines must be able to view same train times.
// Styling and theme are completely up to you. Get Creative!

var trainName;
var destination;
var firstTrainTime;
var frequency;
var nextArrival;
var minutesAway;


database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val())
    child = snapshot.val();

    $("<tr><th>" + child.trainName + "</th><td>" + child.destination + "</td><td>" + 
    child.firstTrainTime + "</td><td>" + child.frequency + "</td><td>"+ child.nextArrival + 
    "</td><tr>" + child.minutesAway).appendTo("tbody");


// , function (errorObject) {
//     console.log("error " + errorObject.code);
// 
});
$("#submit").on("click", function (event) {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(trainName.valueOf());
    var now = moment();
    var start = moment().startOf('day');  
    var hours = moment().date(1).hours(0).minutes(0).seconds(0)
    console.log(start);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
});


