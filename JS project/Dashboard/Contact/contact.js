document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
  
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); 
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!name || !email || !subject || !message) {
        swal("Oops!", "All fields are required.", "error");
        return;
      }
  
      swal("Success!", "Your message has been sent!", "success");
      contactForm.reset();
    });
  });
  