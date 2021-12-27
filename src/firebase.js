import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTP-JVHLtQ_D0gKwJm08ucx1sBl-7iexc",
    authDomain: "fb-crud-react-1f708.firebaseapp.com",
    projectId: "fb-crud-react-1f708",
    storageBucket: "fb-crud-react-1f708.appspot.com",
    messagingSenderId: "765996714941",
    appId: "1:765996714941:web:410ae9deb5c6ee9c71a0d4"
  };

  const app = initializeApp(firebaseConfig);
  export default getFirestore();
