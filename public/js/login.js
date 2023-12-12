
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    let data={
        phone_no:document.getElementById('phoneNo').value,
        password:document.getElementById('password').value
    }
  
    form.addEventListener('submit', function (event) {


      event.preventDefault();
      let data={
        phone_no:document.getElementById('phoneNo').value,
        password:document.getElementById('password').value
    }
   console.log(data);
      const formData = new FormData(form);
  
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        det=data.reply;
        login(det,data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

     
  });


  function login(det, data) {
    if (det && data.data.length > 0) {
      window.location.href = 'applicant_dashboard'; 
    } else {
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerText = 'Login failed. Please check your credentials.';
      errorMessage.style.color = 'red';
    }
  }
  
  