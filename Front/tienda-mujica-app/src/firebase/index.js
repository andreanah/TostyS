import firebase from 'firebase/app';
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC3CGkyDxBxAWeHxqMksngWwL1xbMtaO4c",
    authDomain: "tiendademujica.firebaseapp.com",
    projectId: "tiendademujica",
    storageBucket: "tiendademujica.appspot.com",
    messagingSenderId: "795828017143",
    appId: "1:795828017143:web:54a066be690bf2178940f2",
    measurementId: "G-7Y2F91PRBE"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage,firebase as default};