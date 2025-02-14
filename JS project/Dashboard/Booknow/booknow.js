import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

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

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        image: params.get("image"),
        price: parseFloat(params.get("price")) || 0
    };
}

document.addEventListener("DOMContentLoaded", async function () {
    const car = getQueryParams();
    const bookingStatusElement = document.getElementById("booking-status");
    const payButton = document.getElementById("pay-now");

    document.getElementById("car-name").innerText = car.name;
    document.getElementById("car-image").src = car.image;
    document.getElementById("car-price").innerText = car.price;

    async function checkIfBooked() {
        try {
            const carRef = ref(db, `CarData/${car.name}/Booked`);
            const snapshot = await get(carRef);

            if (snapshot.exists() && snapshot.val() === true) {
                bookingStatusElement.innerHTML = `<p style="color:red;"><strong>This car is already booked!</strong></p>`;
                payButton.disabled = true;
                return true;
            }
        } catch (error) {
            console.error("❌ Error checking booking status:", error);
        }
        return false;
    }

    document.getElementById("calculate-price").addEventListener("click", function () {
        const startDate = new Date(document.getElementById("start-date").value);
        const endDate = new Date(document.getElementById("end-date").value);

        if (isNaN(startDate) || isNaN(endDate) || endDate < startDate) {
            Swal.fire({
                icon: "error",
                title: "Invalid Dates",
                text: "Please select a valid start and end date.",
            });
            return;
        }

        const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
        document.getElementById("total-price").innerText = (totalDays * car.price).toFixed(2);
    });

    document.getElementById("pay-now").addEventListener("click", async function () {
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;

        if (!startDate || !endDate) {
            Swal.fire({
                icon: "error",
                title: "Missing Information",
                text: "Please select a valid date range before proceeding.",
            });
            return;
        }

        const alreadyBooked = await checkIfBooked();
        if (alreadyBooked) {
            Swal.fire({
                icon: "warning",
                title: "Car Already Booked",
                text: "Sorry, this car is already booked by another user.",
            });
            return;
        }

        try {
            const carRef = ref(db, `CarData/${car.name}/Booked`);
            await set(carRef, true);

            Swal.fire({
                icon: "success",
                title: "Booking Confirmed!",
                text: "The car has been successfully booked.",
                confirmButtonText: "Go to Dashboard",
            }).then(() => {
                window.location.href = "../../Dashboard/dashBoard/dashboard.html";
            });
        } catch (error) {
            console.error("❌ Error during booking:", error);
            Swal.fire({
                icon: "error",
                title: "Booking Failed",
                text: "Something went wrong. Please try again.",
            });
        }
    });

    checkIfBooked();
});
