const submit_button = document.querySelectorAll('.submit_assignment');
const submit_form = document.querySelectorAll('.assignment_submit');

for (let i = 0; i < submit_form.length; i++) {
    submit_button[i].addEventListener('click', (event) => submit(event, i));
}

function submit(event, index) {
    event.preventDefault();

    const formData = new FormData(submit_form[index]);
    console.log('Index:', index);
    console.log(formData);
//my code

//end
    fetch("/submit_assignment", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          det = data.reply;
          console.log(data);
          submit_button[index].innerHTML = "UnSubmit";
        
      })
        .catch((error) => {
          console.error("Error:", error);
        });
}
const turn_button=document.querySelectorAll(".form-check-input")
const turn_value=document.querySelectorAll(".tin")
for(let i=0;i<turn_button.length;i++){
  turn_button[i].addEventListener('click', (event) => turnIn(event, i));
}
function turnIn(event,index){
  console.log(turn_value[index].value)
  
  if(turn_button[index].checked==false){
    const assignmentId = turn_value[index].value;
  const turnInValue = turn_button[index].checked ? '1' : '0';

  const data = {
    assignmentId,
    turnIn: turnInValue,
  };

  // Update local storage with the current state
  updateLocalStorage(assignmentId, turnInValue);
    fetch("/turnIn", {
      method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        det = data.reply;
        console.log(data);
        hide_form(det, data.a_id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  else{
    //const data = {
      //assignmentId: turn_value[index].value,
     // turnIn:"1"
    //};
    const assignmentId = turn_value[index].value;
  const turnInValue = turn_button[index].checked ? '1' : '0';

  const data = {
    assignmentId,
    turnIn: turnInValue,
  };

  updateLocalStorage(assignmentId, turnInValue);
  //upore amr code
    fetch("/turnIn", {
      method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        det = data.reply;
        console.log(data);
        hide_form(det, data.a_id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
 
//my code
function updateLocalStorage(assignmentId, turnIn) {
  const storedData = JSON.parse(localStorage.getItem('turnInState')) || {};
  storedData[assignmentId] = turnIn;
  localStorage.setItem('turnInState', JSON.stringify(storedData));
}

// Function to load TurnIn state from local storage
function loadTurnInState() {
  const storedData = JSON.parse(localStorage.getItem('turnInState')) || {};
  Object.keys(storedData).forEach((assignmentId) => {
    const turnIn = storedData[assignmentId];
    const checkbox = document.querySelector(`#flexCheckDefault[value="${assignmentId}"]`);
    if (checkbox) {
      checkbox.checked = turnIn === '1';
    }
  });
}

// Call loadTurnInState when the page loads
document.addEventListener('DOMContentLoaded', loadTurnInState);

