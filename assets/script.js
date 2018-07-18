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
    var firstTrainTime = "";
    var frequency ="";
    var minutes=0;
    $("#add-train").on("click", function(event){
        event.preventDefault();
        trainName = $("#train").val().trim();
        destination = $("#destination").val().trim();
        firstTrainTime = $("#firstTT").val().trim();
        frequency = $("#frequency").val().trim();

        trainDatabase.push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });
        $("#train").val("")
        $("#destination").val("")
        $("#firstTT").val("")
        $("#frequency").val("")
    });
// trainDatabase.on("value", function(snapshot){
//     console.log(snapshot.val());
//     console.log(snapshot.val().trainName);
//     console.log(snapshot.val().destination);
//     console.log(snapshot.val().firstTrainTime);
//     console.log(snapshot.val().frequency);

trainDatabase.on("child_added", function(childSnapshot){
    $("tBody").append("<tr class='well'><td class='train-name'> " + childSnapshot.val().trainName +
    " </td><td class='train-destination'> " + childSnapshot.val().destination +
      " </td><td class='first-train-time'> " + childSnapshot.val().firstTrainTime +
        " </td><td class='train-frequency'> " + childSnapshot.val().frequency + 
        " </td><td class='train-minutes'> " +  childSnapshot.val().minutes + " </td></tr>");
    // $("#tBody").append(createTrainRow(childSnapshot.val()));
    
    
    // console.log("Error handled: " + errorObject.code);
}),
    // function createTrainRow(schedule){
    // const trow = $('<tr>');
    //     trow.append(`<td>${schedule.trainName}</td>`)
    //         .append(`<td>${schedule.destination}</td>`)
    //         .append(`<td>${schedule.firstTrainTime}</td>`)
    //         .append(`<td>${schedule.frequency}</td>`)
    //         .append(`<td>${schedule.minutes}</td>`);
    // return trow;
    // }


// function (errorObjects) {
//     console.log("Errors handled: " + errorObject.code);

// }
trainDatabase.orderByChild("dataAdded").limitToLast(1).on("child_added", function(snapshot) {

});

