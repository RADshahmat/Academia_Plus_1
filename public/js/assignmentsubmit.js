const submit_button = document.querySelectorAll('.submit_assignment');
const submit_form = document.querySelectorAll('.assignment_submit');

for (let i = 0; i < submit_button.length; i++) {
    submit_button[i].addEventListener('click', (event) => submit(event, i));
}

function submit(event, index) {
    event.preventDefault();

    const formData = new FormData(submit_form[index]);
    console.log('Index:', index);
    console.log(formData);
    // Add the logic to handle the form data for the specific index
    fetch("/submit_assignment", {
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
}
 