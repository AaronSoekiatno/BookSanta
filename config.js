import * as firebase from "firebase"
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyCZ4ec1c75GEWMilf4i_OrwtAfqnJxyAWY",
    authDomain: "book-santa-app-d4351.firebaseapp.com",
    projectId: "book-santa-app-d4351",
    storageBucket: "book-santa-app-d4351.appspot.com",
    messagingSenderId: "621090655124",
    appId: "1:621090655124:web:9e4bdd00b07700a699dd81",
    databaseURL:'https://book-santa-app-d4351-default-rtdb.firebaseio.com/'
  };

  
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();