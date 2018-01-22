 import firebase from 'firebase';
 


// firebase information 
  var config = {
    apiKey: "AIzaSyD9C3z_T6oJ6-MsZN4Dtnp5RjTa8woS3jk",
    authDomain: "geotogether-405ad.firebaseapp.com",
    databaseURL: "https://geotogether-405ad.firebaseio.com",
    projectId: "geotogether-405ad",
    storageBucket: "geotogether-405ad.appspot.com",
    messagingSenderId: "271294585129"
  }
try {
  // ingialize firebase
  firebase.initializeApp(config);

} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

const fire = firebase;
export default fire