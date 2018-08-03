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
    var trainDatabase = database.ref("trainDatabase")

    var trainName = "";
    var destination = "";
    var firstTrainTime = "00:00";
    var frequency = 0;
   

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

   

    //click function that adds trains to list and adds info to Firebase
    $("#add-train").on("click", function(event){
        event.preventDefault();
        trainName = $("#train").val().trim();
        destination = $("#destination").val().trim();
        firstTrainTime = $("#firstTT").val().trim();
        frequency = $("#frequency").val().trim();
        frequency = parseInt(frequency, 10);
        // nextTrainTime = $("nextTrain").val().trim();
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // return nextTrain;
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        var nextTrainTime = moment(nextTrain).format("hh:mm");
        console.log(nextTrainTime);


        trainDatabase.push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            tMinutesTillTrain: tMinutesTillTrain,
            nextTrainTime: nextTrainTime
            
        });
       
console.log(nextTrain);
// console.log(frequency);
// console.log(typeof frequency)
        $("#train").val("")
        $("#destination").val("")
        $("#firstTT").val("")
        $("#frequency").val(0)
        
        //concatenates information into table
    });
trainDatabase.on("child_added", function(childSnapshot){
  console.log('CHILD SNAPSHOT ', childSnapshot.val());
    $("tBody").append("<tr class='well'><td class='train-name'> " + childSnapshot.val().trainName +
    " </td><td class='train-destination'> " + childSnapshot.val().destination +
    " </td><td class='train-frequency'> " + childSnapshot.val().frequency +
      " </td><td class='first-train-time'> " + childSnapshot.val().nextTrainTime +
      " </td><td class='train-minutes'> " +  childSnapshot.val().tMinutesTillTrain + " </td></tr>");

    });

    

//adds new listing to table
trainDatabase.orderByChild("dataAdded").limitToLast(1).on("child_added", function(snapshot) {

});
