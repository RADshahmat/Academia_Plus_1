const submit= document.querySelector('#submit_button');
const a_form =document.querySelector('#applicant-form');
const s_name=document.querySelector('#student-name');
const p_no=document.querySelector('#phone-number');
const f_name=document.querySelector('#father-name');
const m_name=document.querySelector('#mother-name');
const c_address=document.querySelector('#inputAddress');
const p_address=document.querySelector('#inputAddress2');
const dob=document.querySelector('#inputDob');
const classinput=document.querySelector('#inputClass');
const image=document.querySelector('#inputImage');
const div_f=document.getElementById('form-div');
let det=false;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('applicant-form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = new FormData(form);
       console.log(formData);
      fetch('/applyform', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        det=data.reply;
        hide_form(det,data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });

     
  });

 function hide_form (det,get_data) {
    if (det) {
        var container = document.getElementById('form_div');
        document.getElementById('applicant-form').style.display="none";
        if (container) {
            var contentWrapper = document.createElement('div');
    contentWrapper.style.textAlign = 'center'; 

    var heading1 = document.createElement('h1');
    heading1.textContent = `You have Successfully Applied. You can use the following credentials to log in to your Applicant Space.`;
    heading1.style.fontFamily = 'Arial, sans-serif';
    heading1.style.fontSize = '24px';
    heading1.style.color = '#333'; 
    contentWrapper.appendChild(heading1);

    var heading2 = document.createElement('h1');
    heading2.textContent = `Phone Number: ${get_data.p_no} 
     Password: ${get_data.a_id}`;
    heading2.style.fontFamily = 'Arial, sans-serif';
    heading2.style.fontSize = '18px';
    heading2.style.color = '#555'; 
    contentWrapper.appendChild(heading2);

    var anchor = document.createElement('a');
    anchor.href = 'log_in';
    anchor.textContent = 'Log In';
    anchor.style.width='fit-content'
    anchor.style.display = 'block'; 
    anchor.style.marginTop = '10px'; 
    anchor.style.margin='auto';
    anchor.style.padding = '10px 20px 10px 20px'; 
    anchor.style.backgroundColor = '#4CAF50'; 
    anchor.style.color = '#fff';
    anchor.style.textDecoration = 'none'; 
    contentWrapper.appendChild(anchor);

    
    container.appendChild(contentWrapper);
        } else {
            console.error('Container element not found');
        }
    } else {
        var submitButton = document.getElementById('submit_button');
        if (submitButton && submitButton.parentNode) {
            var message = document.createElement('p');
            message.style.padding='5px';
            message.textContent = 'Already Exists';
            submitButton.parentNode.appendChild(message);
        } else {
            console.error('Submit button element not found');
        }
    }
    
};


  

