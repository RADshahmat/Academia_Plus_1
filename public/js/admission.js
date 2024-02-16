const submit = document.querySelector("#submit_button");
const a_form = document.querySelector("#applicant-form");
const f_name = document.querySelector("#firstname");
const l_name = document.querySelector("#lastname");
const fa_name = document.querySelector("#father_name");
const mo_name = document.querySelector("#mother_name");
const e_no = document.querySelector("#email");
const p_no = document.querySelector("#phone-number");
const c_address = document.querySelector("#inputAddress");
const p_address = document.querySelector("#inputAddress2");
const ci_address = document.querySelector("#inputCity");
const s_address = document.querySelector("#inputState");
const z_address = document.querySelector("#inputZip");
const dob = document.querySelector("#inputDob");
const classinput = document.querySelector("#inputClass");
const image = document.querySelector("#inputImage");
const div_f = document.getElementById("form--container");
let det = false;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("applicant-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    console.log(formData);
   

    fetch("/applyform", {
      method: "POST",
      body: formData,
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
  });
});

function hide_form(det, get_data) {
  console.log(get_data)
  if (det) {

    const initUrl = `/init?applicant_id=${get_data[0]}`;
    fetch(initUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.body) {
        window.location.href = data.body;
      } else {
        console.error("GatewayPageURL is missing in the response:", data);
      }
    })
    .catch((error) => {
      console.error("Error initiating transaction:", error);
    });
    
  } else {
    var submitButton = document.getElementById("submit_button");
    if (submitButton && submitButton.parentNode) {
      var message = document.createElement("p");
      message.style.padding = "5px";
      message.textContent = "Already Exists";
      submitButton.parentNode.appendChild(message);
    } else {
      console.error("Submit button element not found");
    }
  }
}
