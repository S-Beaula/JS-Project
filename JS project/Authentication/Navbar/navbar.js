document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navbarContainer = document.querySelector(".navbar-container");

    menuIcon.addEventListener("click", function () {
        navbarContainer.classList.toggle("active");
    });
});


