import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOgmqQe_dezAV10RxnbrG1xhbbOPNQ0bo",
  authDomain: "coder-pf-react.firebaseapp.com",
  projectId: "coder-pf-react",
  storageBucket: "coder-pf-react.appspot.com",
  messagingSenderId: "858274109776",
  appId: "1:858274109776:web:48d0e3084ac9088ebbb455",
};

const app = firebase.initializeApp(firebaseConfig);

export function getFirebase() {
  return firebase.firestore(app);
}
