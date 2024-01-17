document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("forgotPasswordForm");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      console.log(formData);
      const email = new URLSearchParams(window.location.search).get("email");
  const data={
   otp: document.querySelector("#otp").value }
  console.log(data)
      fetch(`/otpverify?email=${email}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          det = data.reply;
          console.log(data);
          showpassword(data.data)
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
  function showpassword(data){
    document.getElementById("showpassword").innerText=`Your Password is ${data}`
  }