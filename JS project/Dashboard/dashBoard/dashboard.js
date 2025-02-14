import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

function displayCars(cars, category, searchQuery) {
    carContainer.innerHTML = "";
    Object.values(cars).forEach(car => {
        if ((category === "All" || car.Category.toLowerCase() === category.toLowerCase()) &&
            (searchQuery === "" || car.Carname.toLowerCase().includes(searchQuery.toLowerCase()))) {
            
            const card = document.createElement("div");
            card.className = "car-card animate__animated animate__fadeInLeftBig";
            card.innerHTML = `
                <h2>${car.Carname}</h2>
                <p>Category: ${car.Category}</p>
                <p>Fuel: ${car.Fuel}</p>
                <p>Fuel Type: ${car.Fueltype}</p>
                <p class="car-price">Price: ${car.Price || "N/A"}</p>
                <p>Seats: ${car.Seats || "N/A"}</p>
                <p>Transmission: ${car.Transmission || "N/A"}</p>
                <img src="${car.Image}" alt="${car.Carname}" onerror="this.style.display='none';">
                <button class="book-now">Book now</button>
            `;
            carContainer.appendChild(card);
        }
    });

    document.querySelectorAll(".book-now").forEach(button => {
     
        document.addEventListener("click", function (event) {
            if (event.target.classList.contains("book-now")) {
                const carCard = event.target.closest(".car-card");
                const priceElement = carCard.querySelector(".car-price");
        
                if (!priceElement) {
                    console.error("Price element not found in car card.");
                    return;
                }
        
                const car = {
                    Carname: carCard.querySelector("h2").innerText,
                    Image: carCard.querySelector("img").src,
                    Price: parseFloat(priceElement.innerText.split(": ")[1]) || 0
                };
        
                window.location.href = `../Booknow/booknow.html?name=${encodeURIComponent(car.Carname)}&image=${encodeURIComponent(car.Image)}&price=${car.Price}`;
            }
        });
        
    });
}

async function fetchCars(category = "All", searchQuery = "") {
    const carsRef = ref(db, "CarData");
    try {
        const snapshot = await get(carsRef);
        if (snapshot.exists()) {
            const cars = snapshot.val();
            console.log("Fetched cars:", cars);
            displayCars(cars, category, searchQuery);
        } else {
            console.warn("No cars available in database.");
            carContainer.innerHTML = "<p>No cars available.</p>";
        }
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("search").addEventListener("input", function () {
        fetchCars("All", this.value.toLowerCase());
    });

    document.getElementById("all-btn").addEventListener("click", () => fetchCars("All"));
    document.getElementById("compact-btn").addEventListener("click", () => fetchCars("Compact"));
    document.getElementById("economy-btn").addEventListener("click", () => fetchCars("Economy"));
    document.getElementById("luxury-btn").addEventListener("click", () => fetchCars("Luxury"));

    fetchCars(); 
});
document.addEventListener("DOMContentLoaded", function () {
    // Update the Contact Us link to open in a new page
    document.getElementById("contact").addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "../Contact/contact.html"; // Redirect to Contact Us page
    });
  });
  
// document.getElementById("about").addEventListener("click", function(event) {
//         event.preventDefault();
//         document.getElementById("about-section").style.display = "block";
//         document.getElementById("reviews-section").scrollIntoView({ behavior: "smooth" });
// })
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dashboard.js loaded");

    // Highlight current page in navbar
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "about.html") {
        document.querySelector("#about-link").style.textDecoration = "underline";
    }
});



fetchCars();
