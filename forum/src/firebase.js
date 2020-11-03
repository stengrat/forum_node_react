import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA7iwYa-kqc2T1bj8gtvTtPBsU1Z6L_5tc",
    authDomain: "reactblog-90abe.firebaseapp.com",
    databaseURL: "https://reactblog-90abe.firebaseio.com",
    projectId: "reactblog-90abe",
    storageBucket: "reactblog-90abe.appspot.com",
    messagingSenderId: "117323009639",
    appId: "1:117323009639:web:07844d0ead090128730ec2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);

export {db, auth};