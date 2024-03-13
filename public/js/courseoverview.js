const form=document.querySelectorAll('.class-card form')
const selector=document.querySelectorAll('.class-card form input')
const but=document.querySelectorAll('.class-card form button')
const btn_close=document.querySelector('.btn-close')


for(let i=0; i<form.length; i++){
   but[i].addEventListener('click',function(){

    document.getElementById('section1').style.display='none';
    document.getElementById('section2').style.display='block';

   })
}

btn_close.addEventListener('click', function () {
    var section1 = document.getElementById('section1');
    var section2 = document.getElementById('section2');
    section1.style.display = 'block';

    section2.style.display = 'none';

    var dynamicParagraphs = section2.getElementsByClassName('dynamic-paragraph');
    while (dynamicParagraphs.length > 0) {
        dynamicParagraphs[0].parentNode.removeChild(dynamicParagraphs[0]);
    }
});


for(let i=0; i<form.length; i++){

   form[i].addEventListener('submit', function (event) {
     event.preventDefault();
     let data={
        cls:selector[i].value
    }
    console.log(data)

    
    fetch('/courseoverview', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        det=data.data;
        console.log(det)
        output(det);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
  }) 
}


function output(det) {
    var section2 = document.querySelector('#section2 .class-container');

    for (var i = 0; i < det.length; i++) {
        var paragraph = document.createElement('p');
        paragraph.className = 'dynamic-paragraph';
        paragraph.innerHTML = det[i];
        section2.appendChild(paragraph);
    }
}


