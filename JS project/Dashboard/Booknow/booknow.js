// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
// import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
// import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-storage.js";

// // 🔥 Firebase Configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDpXpOlBvQdkVR9_NAkDx43n6OQCcvsGys",
//     authDomain: "car-rental-system-50ce2.firebaseapp.com",
//     databaseURL: "https://car-rental-system-50ce2-default-rtdb.firebaseio.com/",
//     projectId: "car-rental-system-50ce2",
//     storageBucket: "car-rental-system-50ce2.appspot.com",
//     messagingSenderId: "520742902854",
//     appId: "1:520742902854:web:3a49401077e6bac285fe47",
//     measurementId: "G-3V3SCWS94L"
// };

// // 🚀 Initialize Firebase Services
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const auth = getAuth();
// const storage = getStorage();

// // 🔒 Ensure User is Logged In
// onAuthStateChanged(auth, (user) => {
//     if (!user) {
//         alert("Please log in to book a car.");
//         window.location.href = "../../Authentication/Login/login.html";
//     }
// });

// // 🌍 Get URL Params
// const urlParams = new URLSearchParams(window.location.search);
// const carName = urlParams.get('car');
// const pricePerDay = parseFloat(urlParams.get('price')) || 0;

// // 🏎️ Set Car Details
// document.getElementById("car-name").innerText = carName;
// document.getElementById("car-price").innerText = `$${pricePerDay.toFixed(2)}`;

// // 🌟 Elements
// const calculatePriceButton = document.getElementById("calculate-price");
// const payButton = document.getElementById("pay");
// const totalPriceElement = document.getElementById("total-price");
// const carImageElement = document.getElementById("car-image");

// // 🖼️ Fetch Car Image from Firebase Storage
// async function fetchCarImage() {
//     try {
//         const imageRef = storageRef(storage, `CarImages/${carName}.jpg`);
//         const url = await getDownloadURL(imageRef);
//         carImageElement.src = url;
//     } catch (error) {
//         console.error("❌ Error fetching image:", error);
//         carImageElement.src = "default-car.jpg"; // Fallback Image
//     }
// }

// // 🚘 Check if Car is Already Booked
// async function checkIfBooked() {
//     try {
//         const carRef = ref(db, `CarData/${carName}/Booked`);
//         const snapshot = await get(carRef);

//         if (snapshot.exists() && snapshot.val() === true) {
//             document.getElementById("booking-status").innerHTML = `
//                 <p><strong>Status:</strong> <span style="color:red;">This car is already booked!</span></p>
//                 <a href="../../Dashboard/dashBoard/dashboard.html">Go Back</a>
//             `;
//             payButton.disabled = true;
//             return true;
//         }
//     } catch (error) {
//         console.error("❌ Error checking booking status:", error);
//     }
//     return false;
// }

// // 💰 Calculate Total Price
// calculatePriceButton.addEventListener("click", function () {
//     const startDate = document.getElementById("start-date").value;
//     const endDate = document.getElementById("end-date").value;

//     if (!startDate || !endDate) {
//         alert("Please select a valid date range.");
//         return;
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (start >= end) {
//         alert("End date must be after the start date.");
//         return;
//     }

//     const days = (end - start) / (1000 * 60 * 60 * 24);
//     const totalPrice = days * pricePerDay;

//     totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
// });

// // ✅ Book and Mark Car as Booked
// payButton.addEventListener("click", async function () {
//     const startDate = document.getElementById("start-date").value;
//     const endDate = document.getElementById("end-date").value;

//     if (!startDate || !endDate) {
//         alert("Please select a valid date range before proceeding.");
//         return;
//     }

//     const alreadyBooked = await checkIfBooked();
//     if (alreadyBooked) {
//         alert("Sorry, this car is already booked.");
//         return;
//     }

//     try {
//         const carRef = ref(db, `CarData/${carName}/Booked`);
//         await set(carRef, true);

//         alert("🎉 Booking confirmed! The car is now marked as booked.");
//         window.location.href = "../../Dashboard/dashBoard/dashboard.html";
//     } catch (error) {
//         console.error("❌ Error during booking:", error);
//         alert("⚠️ Booking failed. Please try again.");
//     }
// });

// // 🏁 Run Functions on Page Load
// fetchCarImage();
// checkIfBooked();

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
import { getStorage, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-storage.js";

// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpXpOlBvQdkVR9_NAkDx43n6OQCcvsGys",
    authDomain: "car-rental-system-50ce2.firebaseapp.com",
    databaseURL: "https://car-rental-system-50ce2-default-rtdb.firebaseio.com/",
    projectId: "car-rental-system-50ce2",
    storageBucket: "car-rental-system-50ce2.appspot.com",
    messagingSenderId: "520742902854",
    appId: "1:520742902854:web:3a49401077e6bac285fe47",
    measurementId: "G-3V3SCWS94L"
};

// 🚀 Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const storage = getStorage();

// 🔒 Ensure User is Logged In
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Please log in to book a car.");
        window.location.href = "../../Authentication/Login/login.html";
    }
});

// 🌍 Get URL Params
const urlParams = new URLSearchParams(window.location.search);
const carName = urlParams.get('car');
const pricePerDay = parseFloat(urlParams.get('price')) || 0;

// 🏎️ Set Car Details
document.getElementById("car-name").innerText = carName;
document.getElementById("car-price").innerText = `$${pricePerDay.toFixed(2)}`;

// 🌟 Elements
const calculatePriceButton = document.getElementById("calculate-price");
const payButton = document.getElementById("pay");
const totalPriceElement = document.getElementById("total-price");
const carImageElement = document.getElementById("car-image");
const bookingStatusElement = document.getElementById("booking-status");

// 🖼️ Fetch Car Image from Firebase Storage
async function fetchCarImage() {
    if (!carName) return;
    
    try {
        const imageRef = storageRef(storage, `CarImages/${carName}.jpg`);
        const url = await getDownloadURL(imageRef);
        carImageElement.src = url;
    } catch (error) {
        console.error("❌ Error fetching image:", error);
        carImageElement.src = "default-car.jpg"; // Fallback Image
    }
}

// 🚘 Check if Car is Already Booked
async function checkIfBooked() {
    if (!carName) return false;

    try {
        const carRef = ref(db, `CarData/${carName}/Booked`);
        const snapshot = await get(carRef);

        if (snapshot.exists() && snapshot.val() === true) {
            bookingStatusElement.innerHTML = `<p><strong>Status:</strong> <span style="color:red;">This car is already booked!</span></p>`;
            payButton.disabled = true;
            return true;
        } else {
            bookingStatusElement.innerHTML = `<p><strong>Status:</strong> <span style="color:green;">Available for booking!</span></p>`;
        }
    } catch (error) {
        console.error("❌ Error checking booking status:", error);
    }
    return false;
}

// 💰 Calculate Total Price
calculatePriceButton.addEventListener("click", function () {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (!startDate || !endDate) {
        alert("Please select a valid date range.");
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
        alert("End date must be after the start date.");
        return;
    }

    const days = (end - start) / (1000 * 60 * 60 * 24);
    const totalPrice = days * pricePerDay;

    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
});

// ✅ Book and Mark Car as Booked
payButton.addEventListener("click", async function () {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (!startDate || !endDate) {
        alert("Please select a valid date range before proceeding.");
        return;
    }

    const alreadyBooked = await checkIfBooked();
    if (alreadyBooked) {
        alert("Sorry, this car is already booked.");
        return;
    }

    try {
        const carRef = ref(db, `CarData/${carName}/Booked`);
        await set(carRef, true);

        alert("🎉 Booking confirmed! The car is now marked as booked.");
        window.location.href = "../../Dashboard/dashBoard/dashboard.html";
    } catch (error) {
        console.error("❌ Error during booking:", error);
        alert("⚠️ Booking failed. Please try again.");
    }
});

// 🏁 Run Functions on Page Load
fetchCarImage();
checkIfBooked();

