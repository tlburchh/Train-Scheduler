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
    var trainDatabase = database.ref("trainDatabase");

    var trainName = "";
    var destination = "";
    var firstTrainTime = "00:00";
    var frequency = 0;
    // var minutes="";

    //setting variables for moment.js time manipulation

        // var tFrequency = 3;
    
    // // Time is 3:30 AM
    // var firstTime = "03:30";
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    // Time apart (remainder)
    console.log(typeof frequency);
    console.log('freq ', frequency);
    //click function that adds trains to list and adds info to Firebase
    $("#add-train").on("click", function(event){
        event.preventDefault();
        trainName = $("#train").val().trim();
        destination = $("#destination").val().trim();
        firstTrainTime = $("#firstTT").val().trim();
        frequency = $("#frequency").val().trim();
        frequency = parseInt(frequency, 10);
        // console.log(frequency);

        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
        trainDatabase.push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            tMinutesTillTrain: tMinutesTillTrain
        });
        $("#train").val("");
        $("#destination").val("");
        $("#firstTT").val("");
        $("#frequency").val(null);
    });

//concatenates information into table
trainDatabase.on("child_added", function(childSnapshot){
    $("tBody").append("<tr class='well'><td class='train-name'> " + childSnapshot.val().trainName +
    " </td><td class='train-destination'> " + childSnapshot.val().destination +
      " </td><td class='first-train-time'> " + childSnapshot.val().firstTrainTime +
      " </td><td class='train-frequency'> " + childSnapshot.val().frequency + 
      " </td><td class='train-minutes'> " +  childSnapshot.val().tMinutesTillTrain + " </td></tr>");
      
    });
        
        // function (errorObjects) {
            //     console.log("Errors handled: " + errorObject.code);
            
            // }
            

//adds new listing to table
trainDatabase.orderByChild("dataAdded").limitToLast(1).on("child_added", function(snapshot) {

});

