import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCdRtKIrmRoqIR0ePf94kLrXmy3ojMh8-Q",
    authDomain: "nwitter-67ce0.firebaseapp.com",
    projectId: "nwitter-67ce0",
    storageBucket: "nwitter-67ce0.appspot.com",
    messagingSenderId: "232331614331",
    appId: "1:232331614331:web:cefe001cd96df4f2fb2ade"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);