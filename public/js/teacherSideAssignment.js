
document.addEventListener('DOMContentLoaded', function () {
const details_btns = document.querySelectorAll('.btn-success');
const all_forms = document.querySelectorAll('.form_assignment');

for (let index = 0; index < details_btns.length; index++) {
    details_btns[index].addEventListener('click', function(event) {
        console.log('dhoka')
        event.preventDefault();
        const assignmentId = all_forms[index].querySelector('[name="assignment_id"]').value;
        let data={
            a_id:assignmentId
        }

        fetch('/view_assignment_details', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            det=data.reply;
            showData(det,data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    });
}
})

function showData(det,data){

    console.log(det,data)
}