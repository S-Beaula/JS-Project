// document.getElementById("signupButton").addEventListener("click", () => {
//     Swal.fire({
//       title: "Sign Up",
//       html: `
//         <form id="signupForm">
//           <input type="text" id="name" class="swal2-input" placeholder="Name">
//           <p id="nameerror" style="color: red; font-size: small;"></p>
  
//           <input type="email" id="email" class="swal2-input" placeholder="Email">
//           <p id="emailerror" style="color: red; font-size: small;"></p>
  
//           <input type="password" id="password" class="swal2-input" placeholder="Password">
//           <p id="passworderror" style="color: red; font-size: small;"></p>
  
//           <input type="password" id="confirmpassword" class="swal2-input" placeholder="Confirm Password">
//           <p id="cwpderror" style="color: red; font-size: small;"></p>
//         </form>
//       `,
//       focusConfirm: false,
//       showCancelButton: true,
//       confirmButtonText: "Submit",
//       preConfirm: () => {
//         const name = document.getElementById("name").value.trim();
//         const email = document.getElementById("email").value.trim();
//         const password = document.getElementById("password").value.trim();
//         const confirmPassword = document.getElementById("confirmpassword").value.trim();
  
//         let isValid = true;
  
//         if (name === "") {
//           document.getElementById("nameerror").textContent = "Name required";
//           isValid = false;
//         } else if (name.length <= 3) {
//           document.getElementById("nameerror").textContent = "Please enter at least 3 characters";
//           isValid = false;
//         } else {
//           document.getElementById("nameerror").textContent = "";
//         }
  
//         const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
//         if (email === "") {
//           document.getElementById("emailerror").textContent = "Email required";
//           isValid = false;
//         } else if (!emailpattern.test(email)) {
//           document.getElementById("emailerror").textContent = "Invalid email format";
//           isValid = false;
//         } else {
//           document.getElementById("emailerror").textContent = "";
//         }
  
//         const pswdpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
//         if (password === "") {
//           document.getElementById("passworderror").textContent = "Password required";
//           isValid = false;
//         } else if (!pswdpattern.test(password)) {
//           document.getElementById("passworderror").textContent = "Password must contain uppercase, lowercase, digit, and special character";
//           isValid = false;
//         } else {
//           document.getElementById("passworderror").textContent = "";
//         }
  
//         if (password !== confirmPassword) {
//           document.getElementById("cwpderror").textContent = "Passwords do not match";
//           isValid = false;
//         } else {
//           document.getElementById("cwpderror").textContent = "";
//         }
  
//         if (!isValid) return false;
  
//         return { name, email, password };
//       },
//     }).then((result) => {
//       if (result.isConfirmed && result.value) {
//         const { name, email, password } = result.value;
  
//         const allUsers = JSON.parse(localStorage.getItem("users")) || [];
//         allUsers.push({ name, email, password });
//         localStorage.setItem("users", JSON.stringify(allUsers));
  
//         Swal.fire({
//           icon: "success",
//           title: "Sign Up Successful",
//           text: `Welcome, ${name}! Redirecting to login page...`,
//           timer: 2000,
//         }).then(() => {
//           location.href = "../Login/Login.html";
//         });
//       }
//     });
//   });
  