
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDegqxl9-p0bUV2B8KBcYQoI5b6yqu7CTg",
  authDomain: "book-history-f9bb9.firebaseapp.com",
  projectId: "book-history-f9bb9",
  storageBucket: "book-history-f9bb9.firebasestorage.app",
  messagingSenderId: "444180003157",
  appId: "1:444180003157:web:a2cd22dfb6c2257b0017dc",
  measurementId: "G-K2QJ0NB58K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const submit = document.getElementById("submit");

submit.addEventListener("click", function(event) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    window.location.href = "./homepage.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); 
})