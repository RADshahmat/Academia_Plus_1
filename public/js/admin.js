document.addEventListener('DOMContentLoaded', function () {
  var examStatusInput = document.getElementById('examStatus');
  var toggle_exam_color = document.getElementById('toggle_exam');
  var toggleButton = document.getElementById('customSwitch1');

  var resultStatusInput = document.getElementById('resultStatus');
  var toggle_result_color = document.getElementById('toggle_result');
  var toggleButton1 = document.getElementById('customSwitch2');
console.log("Value:"+examStatusInput.value)
  if (examStatusInput.value === "0") {
    
    toggleButton.checked = false;
    toggle_exam_color.style.backgroundColor="rgb(222, 4, 4)"
} else {
    
    toggleButton.checked = true;
    toggle_exam_color.style.backgroundColor="green"
}
  toggleButton.addEventListener('click', function () {
      toggleButtonState();
      submitForm();
  });

  function toggleButtonState() {
      if (examStatusInput.value === "0") {
          examStatusInput.value = "1";
          toggleButton.checked = false;
          toggle_exam_color.style.backgroundColor="rgb(222, 4, 4)"
      } else {
          examStatusInput.value = "0";
          toggleButton.checked = true;
          toggle_exam_color.style.backgroundColor="green"
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


  console.log("Value:"+resultStatusInput.value)
  toggleButton1.addEventListener('click', function () {
      toggleButtonState1();
      submitForm1();
  });

  function toggleButtonState1() {
      if (resultStatusInput.value === "0") {
          resultStatusInput.value = "1";
          toggleButton1.checked = false;
          toggle_result_color.style.backgroundColor="rgb(222, 4, 4)"
      } else {
          resultStatusInput.value = "0";
          toggleButton1.checked = true;
          toggle_result_color.style.backgroundColor="green"
      }
  }

  function submitForm1() {
    var resultStatusValue
    if (resultStatusInput.value === "0") {
      resultStatusValue = "1";
    }else {
      resultStatusValue = "0";
    }

      let data = {
          result_start: resultStatusValue,
      };

      const form = document.getElementById('resultForm');

      fetch('/result_start', {
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