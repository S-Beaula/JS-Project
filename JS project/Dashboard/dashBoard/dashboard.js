// let currentIndex = 0;
// const images = document.querySelectorAll(".car-images img");

// function showNextImage() {
//     if (images.length === 0) return;

//     images[currentIndex].classList.remove("active");
//     currentIndex = (currentIndex + 1) % images.length;
//     images[currentIndex].classList.add("active");
// }
// setInterval(showNextImage, 3000);

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const carContainer = document.getElementById("car-container");

// async function fetchCars(category = "All", searchQuery = "") {
//     const carsRef = ref(db, "CarData");
//     try {
//         const snapshot = await get(carsRef);
//         if (snapshot.exists()) {
//             const cars = snapshot.val();
//             displayCars(cars, category, searchQuery);
//         } else {
//             carContainer.innerHTML = "<p>No cars available.</p>";
//         }
//     } catch (error) {
//         console.error("Error fetching cars:", error);
//     }
// }

// function displayCars(cars, category, searchQuery) {
//     carContainer.innerHTML = "";
    
//     Object.values(cars).forEach(car => {  
//         if (
//             (category === "All" || car.Category.toLowerCase() === category.toLowerCase()) &&
//             (searchQuery === "" || car.Carname.toLowerCase().includes(searchQuery))
//         ) {
//             const card = document.createElement("div");
//             card.className = "car-card animate__animated animate__fadeInLeftBig";
//             card.innerHTML = `
//                 <h2>${car.Carname}</h2>
//                 <p>Category: ${car.Category}</p>
//                 <p>Fuel: ${car.Fuel}</p>
//                 <p>Fuel Type: ${car.Fueltype}</p>
//                 <p>Price: ${car.Price ? car.Price : "N/A"}</p>
//                 <p>Seats: ${car.Seats ? car.Seats : "N/A"}</p>
//                 <p>Transmission: ${car.Transmission ? car.Transmission : "N/A"}</p>
//                 <img src="${car.Image}" alt="${car.Carname}" onerror="this.style.display='none';">
//                 <button class="book-now">Book now</button>
//             `;
//             carContainer.appendChild(card);
//         }
//     });

//     addBookNowListeners();
// }

// document.getElementById("search").addEventListener("input", function () {
//     const query = this.value.toLowerCase();
//     fetchCars("All", query);
// });

// document.getElementById("all-btn").addEventListener("click", () => fetchCars("All"));
// document.getElementById("compact-btn").addEventListener("click", () => fetchCars("Compact"));
// document.getElementById("economy-btn").addEventListener("click", () => fetchCars("Economy"));
// document.getElementById("luxury-btn").addEventListener("click", () => fetchCars("Luxury"));

// function addBookNowListeners() {
//     document.querySelectorAll(".book-now").forEach(button => {
//         button.addEventListener("click", function () {
//             const carCard = this.closest(".car-card");
//             const carName = carCard.querySelector("h2").innerText;
//             const price = carCard.querySelector("p:nth-child(5)").innerText.split(": ")[1];

//             window.location.href = `../Booknow/booknow.html?car=${encodeURIComponent(carName)}&price=${encodeURIComponent(price)}`;
//         });
//     });
// }

// fetchCars();

// document.getElementById("about-link").addEventListener("click", function(event) {
//     event.preventDefault();
//     document.getElementById("about-section").style.display = "block";
//     document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
//   });


let currentIndex = 0;
const images = document.querySelectorAll(".car-images img");

function showNextImage() {
    if (images.length === 0) return;

    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
}
setInterval(showNextImage, 3000);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const carContainer = document.getElementById("car-container");

// 🚗 Fetch Cars from Firebase
async function fetchCars(category = "All", searchQuery = "") {
    const carsRef = ref(db, "CarData");

    try {
        const snapshot = await get(carsRef);
        if (snapshot.exists()) {
            const cars = snapshot.val();
            console.log("✅ Fetched cars from Firebase:", cars);
            displayCars(cars, category, searchQuery);
        } else {
            carContainer.innerHTML = "<p>No cars available.</p>";
        }
    } catch (error) {
        console.error("❌ Error fetching cars:", error);
    }
}

// 🏎️ Display Cars on the Web Page
function displayCars(cars, category, searchQuery) {
    carContainer.innerHTML = "";

    Object.keys(cars).forEach(key => {
        const car = cars[key];

        if (!car || !car.Carname) {
            console.warn(`⚠️ Missing Carname in car data:`, car);
            return;
        }

        if (
            (category === "All" || (car.Category && car.Category.toLowerCase() === category.toLowerCase())) &&
            (searchQuery === "" || (car.Carname && car.Carname.toLowerCase().includes(searchQuery)))
        ) {
            const card = document.createElement("div");
            card.className = "car-card animate__animated animate__fadeInLeftBig";
            card.innerHTML = `
                <h2>${car.Carname}</h2>
                <p>Category: ${car.Category || "Unknown"}</p>
                <p>Fuel: ${car.Fuel || "N/A"}</p>
                <p>Fuel Type: ${car.Fueltype || "N/A"}</p>
                <p>Price: ${car.Price ? `$${car.Price}` : "N/A"}</p>
                <p>Seats: ${car.Seats || "N/A"}</p>
                <p>Transmission: ${car.Transmission || "N/A"}</p>
                <img src="${car.Image}" alt="${car.Carname}" onerror="this.style.display='none';">
                <button class="book-now">Book now</button>
            `;
            carContainer.appendChild(card);
        }
    });

    addBookNowListeners();
}

// 🔍 Search Functionality
document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    fetchCars("All", query);
});

// 🔘 Category Buttons
document.getElementById("all-btn").addEventListener("click", () => fetchCars("All"));
document.getElementById("compact-btn").addEventListener("click", () => fetchCars("Compact"));
document.getElementById("economy-btn").addEventListener("click", () => fetchCars("Economy"));
document.getElementById("luxury-btn").addEventListener("click", () => fetchCars("Luxury"));

// 🚗 Add "Book Now" Button Listeners
function addBookNowListeners() {
    document.querySelectorAll(".book-now").forEach(button => {
        button.addEventListener("click", function () {
            const carCard = this.closest(".car-card");
            const carName = carCard.querySelector("h2").innerText;
            const price = carCard.querySelector("p:nth-child(5)").innerText.split(": ")[1];

            window.location.href = `../Booknow/booknow.html?car=${encodeURIComponent(carName)}&price=${encodeURIComponent(price)}`;
        });
    });
}

// 📢 Fetch Cars on Page Load
fetchCars();

// ℹ️ Show "About" Section on Click
document.getElementById("about-link").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("about-section").style.display = "block";
    document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
});
