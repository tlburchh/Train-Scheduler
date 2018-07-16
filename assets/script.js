var config = {
    apiKey: "AIzaSyCCCnCJ6aApLdTJ925Sv7cxU4ov0i-ZUPg",
    authDomain: "test-5e880.firebaseapp.com",
    databaseURL: "https://test-5e880.firebaseio.com",
    projectId: "test-5e880",
    storageBucket: "test-5e880.appspot.com",
    messagingSenderId: "899929819636"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();
    var trainDatabase = database.ref(trainDatabase)

    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency ="";
    $("#add-train").on("click", function(event){
        event.preventDefault();
        trainName = $("#train").val().trim();
        destination = $("#destination").val().trim();
        firstTrainTime = $("#firstTT").val().trim();
        frequency = $("#frequency").val().trim();

        trainDatabase.set({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });
    });
trainDatabase.on("value", function(snapshot){
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);

    $("#cTrain").text(snapshot.val().trainName);
    $("#cDestination").text(snapshot.val().destination);
    $("#cFrequency").text(snapshot.val().frequency);
    $("#cArrival").text(snapshot.val().firstTrainTime);
}, function(errorObjects) {
    console.log("Errors handled: " + errorObject.code)
});