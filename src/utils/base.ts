import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const isProduction = process.env.NODE_ENV === 'production';

let fbConfig;

if (isProduction) {
  fbConfig = {
    apiKey: 'AIzaSyB0FMVEOyYmWoB675jsbEkxYKigtwFgABE',
    authDomain: 'mapa-covid19-mexico.firebaseapp.com',
    databaseURL: 'https://mapa-covid19-mexico.firebaseio.com',
    projectId: 'mapa-covid19-mexico',
    storageBucket: 'mapa-covid19-mexico.appspot.com',
    messagingSenderId: '38826686757',
    appId: '1:38826686757:web:d7ccf9302ac34d88fc82cc',
    measurementId: 'G-DWJLWKP237',
  };
} else {
  fbConfig = require('./baseDev').default;
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(fbConfig);
firebaseApp.analytics();
export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
