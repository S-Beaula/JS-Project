// let signup = document.getElementById("signup")
// signup.addEventListener("submit", (e) => {
//     e.preventDefault()
//     let name = document.getElementById("name")
//     let email = document.getElementById("email")
//     let password = document.getElementById("password")
//     let confirmpassword = document.getElementById("confirmpassword")

//     let nameValue = name.value.trim()
//     let emailValue = email.value.trim()
//     let passwordValue = password.value.trim()
//     let confirmpasswordValue = confirmpassword.value.trim()
 
//     let isValid=true
//     if (nameValue === "") {
//         document.getElementById("nameerror").textContent = "name required"
//         isValid=false
//     } else if (nameValue.length <= 3) {
//         document.getElementById("nameerror").textContent = "please enter atleast 3 characters"
//          document.getElementById("nameerror").textContent = ""
//         isValid=false
//     } 
//     // emailpattern =/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{4,}$/
//     const emailpattern = /^[a-zA-z0-9]+@[a-zA-z]+\.[a-zA-Z]{2,}$/
//     // E_pattern=/^[a-zA-z0-9]+@[a-zA-z]+\.[a-zA-Z]{2,}$/
//     if (emailValue === "") {
//         document.getElementById("emailerror").textContent = "email required";
//         isValid=false
//     } else if (!emailpattern.test(emailValue)) {
//         document.getElementById("emailerror").textContent = "Email not valid";
//         document.getElementById("emailerror").textContent = "";
//         isValid=false
//     }
//     // let check = emailpattern.test(emailValue)
//     // console.log(check);
//     const pswdpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

//     if (passwordValue === "") {
//         document.getElementById("passworderror").textContent = "email required"
//         isValid=false
//     }
//     else if (!pswdpattern.test(passwordValue)) {
//         document.getElementById("passworderror").textContent = "password not valid"
//         document.getElementById("passworderror").textContent = "";
//         isValid=false
//     }
//     let check = pswdpattern.test(passwordValue)
//     console.log(check);

//     if (passwordValue !== confirmpasswordValue) {
//         document.getElementById("cwpderror").textContent = "password not matched"
//         isValid=false
// }


// if(isValid){
//     name.value=""
//     email.value =""
//     password.value =""
//     confirmpassword.value =""

//     const allUsers=JSON.parse(localStorage.getItem("users")) || [];

//     allUsers.push({name:nameValue,email:emailValue,password:passwordValue,confirmPassword:confirmpasswordValue})
//     localStorage.setItem("users",JSON.stringify(allUsers))
//     location.href="../Login/Login.html"
//   }


// })
document.getElementById("signupButton").addEventListener("click", () => {
    Swal.fire({
      title: "Sign Up",
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => {
        // Retrieve the values entered by the user
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmpassword").value.trim();
  
        // Perform validation
        let isValid = true;
  
        if (name === "") {
          document.getElementById("nameerror").textContent = "Name required";
          isValid = false;
        } else if (name.length <= 3) {
          document.getElementById("nameerror").textContent = "Please enter at least 3 characters";
          isValid = false;
        } else {
          document.getElementById("nameerror").textContent = "";
        }
  
        const emailpattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        if (email === "") {
          document.getElementById("emailerror").textContent = "Email required";
          isValid = false;
        } else if (!emailpattern.test(email)) {
          document.getElementById("emailerror").textContent = "Invalid email format";
          isValid = false;
        } else {
          document.getElementById("emailerror").textContent = "";
        }
  
        const pswdpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (password === "") {
          document.getElementById("passworderror").textContent = "Password required";
          isValid = false;
        } else if (!pswdpattern.test(password)) {
          document.getElementById("passworderror").textContent = "Password must contain uppercase, lowercase, digit, and special character";
          isValid = false;
        } else {
          document.getElementById("passworderror").textContent = "";
        }
  
        if (password !== confirmPassword) {
          document.getElementById("cwpderror").textContent = "Passwords do not match";
          isValid = false;
        } else {
          document.getElementById("cwpderror").textContent = "";
        }
  
        // If the form is invalid, prevent submission
        if (!isValid) return false;
  
        // Return the form data
        return { name, email, password };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { name, email, password } = result.value;
  
        // Save user to localStorage
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        allUsers.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(allUsers));
  
        // Success message and redirect
        Swal.fire({
          icon: "success",
          title: "Sign Up Successful",
          text: `Welcome, ${name}! Redirecting to login page...`,
          timer: 2000,
        }).then(() => {
          location.href = "../Login/Login.html";
        });
      }
    });
  });
  

