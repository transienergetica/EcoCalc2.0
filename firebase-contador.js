import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsqt08F85c90YysIRFqL-lcueZTPfJZtI",
  authDomain: "ecocalc-f4551.firebaseapp.com",
  projectId: "ecocalc-f4551",
  storageBucket: "ecocalc-f4551.firebasestorage.app",
  messagingSenderId: "795619195529",
  appId: "1:795619195529:web:ead575e505045a3e7ea458",
  measurementId: "G-9WZL7PVBYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


window.registrarUso = async function(){

  const contadorRef = doc(db, "contador", "usuarios");

  await updateDoc(contadorRef,{
    acessos: increment(1)
  });

};


window.mostrarContador = async function(){

  const numero = document.getElementById("numero");

  if(numero){

    const contadorRef = doc(db, "contador", "usuarios");

    const dados = await getDoc(contadorRef);

    numero.innerHTML = dados.data().acessos;

  }

};