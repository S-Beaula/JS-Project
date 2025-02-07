import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpXpOlBvQdkVR9_NAkDx43n6OQCcvsGys",
    authDomain: "car-rental-system-50ce2.firebaseapp.com",
    projectId: "car-rental-system-50ce2",
    storageBucket: "car-rental-system-50ce2.appspot.com",
    messagingSenderId: "520742902854",
    appId: "1:520742902854:web:3a49401077e6bac285fe47",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signup = document.getElementById("signup");

signup.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmpassword = document.getElementById("confirmpassword").value.trim();

    let isValid = true;

    // Validate Name
    if (name === "") {
        document.getElementById("nameerror").textContent = "Name required";
        isValid = false;
    } else if (name.length <= 3) {
        document.getElementById("nameerror").textContent = "Please enter at least 3 characters";
        isValid = false;
    } else {
        document.getElementById("nameerror").textContent = "";
    }

    // Validate Email
    const emailpattern =
        /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        document.getElementById("emailerror").textContent = "Email required";
        isValid = false;
    } else if (!emailpattern.test(email)) {
        document.getElementById("emailerror").textContent = "Email not valid";
        isValid = false;
    } else {
        document.getElementById("emailerror").textContent = "";
    }

    const pswdpattern =
       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
    if (password === "") {
        document.getElementById("passworderror").textContent = "Password required";
        isValid = false;
    } else if (!pswdpattern.test(password)) {
        document.getElementById("passworderror").textContent = "Password not valid";
        isValid = false;
    } else {
        document.getElementById("passworderror").textContent = "";
    }

    if (password !== confirmpassword) {
        document.getElementById("cwpderror").textContent =
            "Passwords do not match";
        isValid = false;
    } else {
        document.getElementById("cwpderror").textContent = "";
    }

    if (isValid) {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Swal.fire({
                title: "Success!",
                text: "Your account has been created successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                location.href = "../Login/Login.html"; 
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error!",
                text: err.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    } else {
        Swal.fire({
            title: "Error!",
            text: "Please fix the errors in the form.",
            icon: "error",
            confirmButtonText: "OK",
        });
    }
});

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
// // import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
// // const analytics = getAnalytics(app);
// let signup = document.getElementById("signup");
// signup.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     let name = document.getElementById("name");
//     let email = document.getElementById("email");
//     let password = document.getElementById("password");
//     let confirmpassword = document.getElementById("confirmpassword");

//     let nameValue = name.value.trim();
//     let emailValue = email.value.trim();
//     let passwordValue = password.value.trim();
//     let confirmpasswordValue = confirmpassword.value.trim();

//     let isValid = true;

//     if (nameValue === "") {
//         document.getElementById("nameerror").textContent = "Name required";
//         isValid = false;
//     } else if (nameValue.length <= 3) {
//         document.getElementById("nameerror").textContent = "Please enter at least 3 characters";
//         isValid = false;
//     } else {
//         document.getElementById("nameerror").textContent = "";
//     }

//     const emailpattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
//     if (emailValue === "") {
//         document.getElementById("emailerror").textContent = "Email required";
//         isValid = false;
//     } else if (!emailpattern.test(emailValue)) {
//         document.getElementById("emailerror").textContent = "Email not valid";
//         isValid = false;
//     } else {
//         document.getElementById("emailerror").textContent = "";
//     }

//     const pswdpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//     if (passwordValue === "") {
//         document.getElementById("passworderror").textContent = "Password required";
//         isValid = false;
//     } else if (!pswdpattern.test(passwordValue)) {
//         document.getElementById("passworderror").textContent = "Password not valid";
//         isValid = false;
//     } else {
//         document.getElementById("passworderror").textContent = "";
//     }

//     if (passwordValue !== confirmpasswordValue) {
//         document.getElementById("cwpderror").textContent = "Passwords do not match";
//         isValid = false;
//     } else {
//         document.getElementById("cwpderror").textContent = "";
//     }

//     if (isValid) {
//         name.value = ""
//         email.value = ""
//         password.value = ""
//         confirmpassword.value = ""
//         try {
//             await createUserWithEmailAndPassword(auth, email, password)
//             Swal.fire({
//                 title: "Success!",
//                 text: "Your account has been created successfully.",
//                 icon: "success",
//                 confirmButtonText: "OK"
//             }).then(() => {
//                 name.value = "";
//                 email.value = "";
//                 password.value = "";
//                 confirmpassword.value = "";
//                 location.href = "../Login/Login.html"; // Redirect to login page
//             });

//         } catch (err) {
//             console.log(err);
//             Swal.fire({
//                 title: "Error!",
//                 text: err.message,
//                 icon: "error",
//                 confirmButtonText: "OK",
//             });

//         }
//         // const allUsers = JSON.parse(localStorage.getItem("users")) || [];

//         // allUsers.push({
//         //     name: nameValue,
//         //     email: emailValue,
//         //     password: passwordValue,
//         //     confirmPassword: confirmpasswordValue
//         // });
//         // localStorage.setItem("users", JSON.stringify(allUsers));

//         // SweetAlert for success
//         // Swal.fire({
//         //     title: "Success!",
//         //     text: "Your account has been created successfully.",
//         //     icon: "success",
//         //     confirmButtonText: "OK"
//         // }).then(() => {
//         //     name.value = "";
//         //     email.value = "";
//         //     password.value = "";
//         //     confirmpassword.value = "";
//         //     location.href = "../Login/Login.html"; // Redirect to login page
//         // });
//     } else {
//         Swal.fire({
//             title: "Error!",
//             text: "Please fix the errors in the form.",
//             icon: "error",
//             confirmButtonText: "OK"
//         });
//     }
// });