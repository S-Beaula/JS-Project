import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpXpOlBvQdkVR9_NAkDx43n6OQCcvsGys",
    authDomain: "car-rental-system-50ce2.firebaseapp.com",
    projectId: "car-rental-system-50ce2",
    storageBucket: "car-rental-system-50ce2.appspot.com", 
    messagingSenderId: "520742902854",
    appId: "1:520742902854:web:3a49401077e6bac285fe47",
    measurementId: "G-3V3SCWS94L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let login = document.getElementById("submit");

login.addEventListener("click", async (e) => {
    e.preventDefault();

    let emailValue = document.getElementById("email").value.trim();
    let passwordValue = document.getElementById("password").value.trim();

    try {
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: `Welcome back, ${emailValue}!`,
            confirmButtonText: "Continue",
        }).then(() => {
            location.href = "../../Dashboard/dashBoard/dashboard.html"; 
        });
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid email or password. Please try again.",
            confirmButtonText: "Retry",
        });
    }
});



// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
// import { getAuth, signupWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyDpXpOlBvQdkVR9_NAkDx43n6OQCcvsGys",
//     authDomain: "car-rental-system-50ce2.firebaseapp.com",
//     projectId: "car-rental-system-50ce2",
//     storageBucket: "car-rental-system-50ce2.firebasestorage.app",
//     messagingSenderId: "520742902854",
//     appId: "1:520742902854:web:3a49401077e6bac285fe47",
//     measurementId: "G-3V3SCWS94L"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)

// let login = document.getElementById("submit");

// login.addEventListener("click", async (e) => {
//     e.preventDefault();

//     let emailValue = document.getElementById("email").value.trim();
//     let passwordValue = document.getElementById("password").value.trim();
//     // let storedData = JSON.parse(localStorage.getItem("users"));

//     // console.log(storedData);

//     // if (storedData) {
//     //     const user = storedData.find(
//     //         (x) =>
//     //             x.email.toLowerCase() === emailValue.toLowerCase() &&
//     //             x.password === passwordValue
//     //     );

//         // console.log(user);

//         if (user) {
//             try {
//                 await signupWithEmailAndPassword(auth, emailValue, passwordValue).then(() => {
//                     Swal.fire({
//                         icon: "success",
//                         title: "Login Successful",
//                         text: `Welcome back, ${emailValue}!`,
//                         confirmButtonText: "Continue",
//                     }).then(() => {
//                         location.href = "../Navbar/navbar.html";
//                     });
//                 })
//             } catch (err) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Login Successful",
//                     text: `Welcome back, ${emailValue}!`,
//                     confirmButtonText: "Continue",
//                 }).then(() => {
//                     location.href = "../Navbar/navbar.html";
//                 });
//             }
//         // } else {
//         //     Swal.fire({
//         //         icon: "error",
//         //         title: "Login Failed",
//         //         text: "Invalid email or password. Please try again.",
//         //         confirmButtonText: "Retry",
//         //     });
//         // }
//     } else {
//         Swal.fire({
//             icon: "error",
//             title: "No Users Found",
//             text: "No user data is stored. Please sign up first.",
//             confirmButtonText: "Sign Up",
//         });
//     }
// });

