// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBbTWt0dpw7w6mFJB2yF0olTCh2mBDwbn8",
  authDomain: "collabspace-6d0af.firebaseapp.com",
  projectId: "collabspace-6d0af",
  storageBucket: "collabspace-6d0af.appspot.com",
  messagingSenderId: "19918134739",
  appId: "1:19918134739:web:3c3e2046024466dd2ea326"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Signup function
function signupUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.sendEmailVerification().then(() => {
        alert("✅ Verification email sent. Please check your inbox.");
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        window.location.href = "login.html";
      });
    })
    .catch((error) => {
      alert("❌ " + error.message);
    });
}

// Login function
function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        alert("✅ Login successful!");
        localStorage.setItem("email", user.email);
        localStorage.setItem("username", user.displayName || "User");
        window.location.href = "index.html";
      } else {
        alert("⚠️ Please verify your email first.");
        auth.signOut();
      }
    })
    .catch((error) => {
      alert("❌ " + error.message);
    });
}
