let login=document.getElementById("submit")
login.addEventListener("click",(e)=>{
    e.preventDefault()
    let emailvalue=document.getElementById("email").value.trim()
    let passwordvalue=document.getElementById("password").value.trim()
    let storeddata=JSON.parse(localStorage.getItem("users"));

    console.log(storeddata);
    if (storeddata) {
        const user = storeddata.find((x) => {x.email === emailvalue && x.password === passwordvalue && x.email.toLowerCase() === emailvalue.toLowerCase();
    });
        console.log(user);
    
        if (user) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: `Welcome back, ${emailvalue}!`,
            confirmButtonText: "Continue",
          }).then(() => {
            location.href = "../Navbar/navbar.html";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid email or password. Please try again.",
            confirmButtonText: "Retry",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "No Users Found",
          text: "No user data is stored. Please sign up first.",
          confirmButtonText: "Sign Up",
        });
      }
    });