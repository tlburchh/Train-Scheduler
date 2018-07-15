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