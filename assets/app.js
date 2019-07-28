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

//Create variables to store data and push to firebase
var trainName;
var destination;
var firstTrainTime;
var frequency;
var nextArrival;
var minutesAway;

//When a child is added, display train info on the table
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val())
    child = snapshot.val();

    $("<tr><th>" + child.trainName + "</th><td>" + child.destination + "</td><td>" +
        child.frequency + "</td><td>" + child.nextArrival + "</td><td>" + child.minutesAway +
        "</td><tr>").appendTo("tbody");

});
//When the submit button is clicked, extract value and trim down data from variables
$("#submit").on("click", function (event) {
    event.preventDefault();
    //Get value from elements and trim them down
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();



    console.log(formattedTrainTime);
    console.log(now);
    console.log(minuteDiff);
    console.log(tRemainder);
    console.log(tMinutesTillTrain);
    console.log(nextArrival);

    // Initial train time
    var formattedTrainTime = moment(firstTrainTime, "HH:mm");

    // Current Time
    var now = moment();


    // Difference between current time and first train time
    var minuteDiff = moment().diff(moment(formattedTrainTime), "minutes");


    // The remainder of current time and initial train time
    var tRemainder = minuteDiff % frequency;


    // Remainding time untill next train arrives
    var tMinutesTillTrain = frequency - tRemainder;


    // Arrival time
    var nextArrival = moment().add(tMinutesTillTrain, "minutes");
    var formattedTime = moment(nextArrival).format("HH:mm");

    //Push the data to firebase.
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        nextArrival: formattedTime,
        minutesAway: tMinutesTillTrain
    })
});


