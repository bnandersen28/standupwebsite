import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { firebaseConfig } from "./public/firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("event-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const event = {
    title: document.getElementById("title").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    type: document.getElementById("type").value,
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "events"), event);
    alert("Event added!");
    e.target.reset();
  } catch (err) {
    console.error("Error adding event:", err);
    alert("Failed to add event");
  }
});

onAuthStateChanged(auth, (user) => {
    if(user) {
        console.log("User is signed in", user.email);
    } else {
        console.log("No user is signed in");
    }
    if (window.location.pathname.endsWith("admin.html")) {
        if (!user) {
            window.location.href = "login.html"; // Redirect to login if not authenticated
        }
    }
});
