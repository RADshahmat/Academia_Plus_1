
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('online_exam_status');
   
  
    form.addEventListener('submit', function (event) {


      event.preventDefault();
      let data={
        online_exam_start:document.getElementById('online_exam_start').value,
        
    }
   console.log(data);
      const formData = new FormData(form);
  
      fetch('/online_exam_start', {
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


  function exam_stat(det, data) {
    console.log('Response:'+ data);
    
  
    if (det) {
       document.getElementById("online_exam_toggle").style.backgroundColor="red";
    } else {
        document.getElementById("online_exam_toggle").style.backgroundColor="green";
      console.log('Login failed. Check credentials.');
      
    }
  }
  
  
  
  