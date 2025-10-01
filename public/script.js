
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//Login function
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!", userCredential.user);
            window.location.href = "admin.html"; // Redirect to admin page after login  
        } catch (error) {
            alert("Login failed: " + error.message);
            console.error("Error during login:", error);
        }
    });
});

//Protect admin page
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

//Logout function
export async function handleLogout() {
    if (user) {
        console.log("User is signed in", user.email);
    } else {
        console.log("No user is signed in");
    }

    try {
        await signOut(auth);
        alert("Logout successful!");
        window.location.href = "index.html"; // Redirect to homepage after logout
    } catch (error) {
        alert("Logout failed: " + error.message);
    }
}