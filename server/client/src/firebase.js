import firebase from 'firebase';

const fireBaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDoyMN1O-R8dlWPblpRuQX3KbkO84COQrI",
    authDomain: "netflix-chat-d9c3b.firebaseapp.com",
    projectId: "netflix-chat-d9c3b",
    storageBucket: "netflix-chat-d9c3b.appspot.com",
    messagingSenderId: "569851388651",
    appId: "1:569851388651:web:8d6591c4dce07ce8b054ae",
    measurementId: "G-92Y3JETWZ7"
})


const db = fireBaseApp.firestore();
const auth = firebase.auth();

export { db, auth }