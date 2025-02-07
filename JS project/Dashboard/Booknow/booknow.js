// document.addEventListener("DOMContentLoaded", function () {
//     function addEventListeners() {
//         document.querySelectorAll(".book-now").forEach((button) => {
//             button.addEventListener("click", function () {
//                 const carCard = this.closest(".car-card");
//                 const carName = carCard.querySelector("h2").innerText;
//                 const price = carCard.querySelector("p:nth-child(5)").innerText.split(": ")[1];

               
//                 window.location.href = `booking.html?car=${encodeURIComponent(carName)}&price=${encodeURIComponent(price)}`;
//             });
//         });
//     }

//     setTimeout(addEventListeners, 1000); 
// });


const urlParams = new URLSearchParams(window.location.search);
const carName = urlParams.get('car');
const pricePerDay = parseFloat(urlParams.get('price')) || 0;

document.getElementById("car-name").innerText = carName;
document.getElementById("car-price").innerText = `$${pricePerDay}`;

document.getElementById("calculate-price").addEventListener("click", function () {
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    if (!startDate || !endDate || startDate >= endDate) {
        alert("Please select a valid date range.");
        return;
    }

    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const totalPrice = days * pricePerDay;
    document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
});

document.getElementById("pay").addEventListener("click", function () {
    alert("Proceeding to payment...");
});