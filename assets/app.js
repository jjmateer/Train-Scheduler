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
    child.frequency + "</td><td>" + child.nextArrival + "</td><td>"+ child.minutesAway + 
    "</td><tr>").appendTo("tbody");


// , function (errorObject) {
//     console.log("error " + errorObject.code);
// 
});
$("#submit").on("click", function (event) {
    event.preventDefault();
    //Get value from elements and trim them down
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    console.log(trainName.valueOf());
    //Variable for the current time
    var now = moment();
    // Start the clock at 00:00 
    // var start = moment().startOf('day');  
    // var hours = moment().date(1).hours(0).minutes(0).seconds(0)
    //Format train time as a moment.js object
    var formattedTrainTime = moment(firstTrainTime, "hh:mm");
    var timeArr = firstTrainTime.split(":")
    var hr = timeArr[0];
    var min = timeArr[1];
    var trainTime = moment().hours(hr).minutes(min);
    console.log(trainTime);
    //Calculate the minutes between the train start time and the current time
    var diff = moment(formattedTrainTime).diff(moment(now), 'minutes' );
    // var tRemain = diff % frequency;
    console.log(diff);
    //Add the difference in minutes to the current time to get the arrival time.
    
    var newArrival = moment(formattedTrainTime).add(frequency, "m").format("HH:mm: A");
    //Push the data to firebase.
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextArrival: newArrival,
        minutesAway: diff
    })
});


