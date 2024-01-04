document.addEventListener('DOMContentLoaded', function () {
  var examStatusInput = document.getElementById('examStatus');
  var toggle_exam_color = document.getElementById('toggle_exam');
  var toggleButton = document.getElementById('customSwitch1');


console.log("Value:"+examStatusInput.value)
  if (examStatusInput.value === "0") {
    
    toggleButton.checked = false;
    toggle_exam_color.style.backgroundColor="rgb(73, 63, 63)"
} else {
    
    toggleButton.checked = true;
    toggle_exam_color.style.backgroundColor="red"
}
  toggleButton.addEventListener('click', function () {
      toggleButtonState();
      submitForm();
  });

  function toggleButtonState() {
      if (examStatusInput.value === "0") {
          examStatusInput.value = "1";
          toggleButton.checked = false;
          toggle_exam_color.style.backgroundColor="rgb(73, 63, 63)"
      } else {
          examStatusInput.value = "0";
          toggleButton.checked = true;
          toggle_exam_color.style.backgroundColor="red"
      }
  }

  function submitForm() {
    var examStatusValue
    if (examStatusInput.value === "0") {
      examStatusValue = "1";
    }else {
      examStatusValue = "0";
    }

      let data = {
          online_exam_start: examStatusValue,
      };

      const form = document.getElementById('examForm');

      fetch('/online_exam_start', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          exam_stat(det, data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
});