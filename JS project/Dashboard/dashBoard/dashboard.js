let currentIndex = 0;
const images = document.querySelectorAll(".car-images img");

function showNextImage() {
    if (images.length === 0) return; // Check if images exist

    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
}
setInterval(showNextImage, 3000);


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

async function fetchCars(category = "All") {
    const carsRef = ref(db, "CarData");
    try {
        const snapshot = await get(carsRef);
        if (snapshot.exists()) {
            const cars = snapshot.val();
            displayCars(cars, category);
        } else {
            carContainer.innerHTML = "<p>No cars available.</p>";
        }
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
}

function displayCars(cars, category) {
    carContainer.innerHTML = ""; // Clear previous cars
    cars.forEach(car => {
        if (category === "All" || car.Category.toLowerCase() === category.toLowerCase()) {
            const card = document.createElement("div");
            card.className = "car-card animate__animated animate__fadeInLeftBig"; // Add animation classes
            card.innerHTML = `
                <h2>${car.Carname}</h2>
                <p>Category: ${car.Category}</p>
                <p>Fuel: ${car.Fuel}</p>
                <p>Fuel Type: ${car.Fueltype}</p>
                <p>Price: ${car.Price ? car.Price : "N/A"}</p>
                <p>Seats: ${car.Seats ? car.Seats : "N/A"}</p>
                <p>Transmission: ${car.Transmission ? car.Transmission : "N/A"}</p>
                <img src="${car.Image}" alt="${car.Carname}" onerror="this.style.display='none';">
                <button class="add-to-cart">Add to Cart</button>
                <button class="book-now">Book now</button>
            `;
            carContainer.appendChild(card);
        }
    });
}
document.getElementById("all-btn").addEventListener("click", () => fetchCars("All"));
document.getElementById("compact-btn").addEventListener("click", () => fetchCars("Compact"));
document.getElementById("economy-btn").addEventListener("click", () => fetchCars("Economy"));
document.getElementById("luxury-btn").addEventListener("click", () => fetchCars("Luxury"));

fetchCars();

document.addEventListener("DOMContentLoaded", function () {
    function addEventListeners() {
        document.querySelectorAll(".book-now").forEach((button) => {
            button.addEventListener("click", function () {
                const carCard = this.closest(".car-card");
                // const carImage = carCard.querySelector("img").innerText;
                const carName = carCard.querySelector("h2").innerText;
                const price = carCard.querySelector("p:nth-child(5)").innerText.split(": ")[1];

               
                window.location.href = `../Booknow/booknow.html?car=${encodeURIComponent(carName)}&price=${encodeURIComponent(price)}`;
            });
        });
    }

    setTimeout(addEventListeners, 1000); 
});