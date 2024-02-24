const chatbotForm = document.getElementById('chatbotReq');

chatbotForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    sendMessage();
});

const sendButton = document.getElementById('chatSendButton');

sendButton.addEventListener('click', function () {
    sendMessage();
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = '';
    displayMessage(userInput, 'user');

    fetch('/chatbot_rad', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayMessage(data.answer, 'chatbot');
        
    })
    .catch(error => {
        console.error('Error making API call:', error);
    });
}

function displayMessage(message, sender) {
    const chatbotBody = document.getElementById('chatbot_body');

    
    const messageElement = document.createElement('p');


    messageElement.className = sender === 'user' ? 'user-message' : 'chatbot-message';


    if (sender === 'user') {
        messageElement.classList.add('align-right');
    }

    messageElement.textContent = message;

    const backgroundColor = sender === 'user' ? '#ccc' : '#a2d2a3 ';
    const margin = sender === 'user' ? '83px' : '5px';

    messageElement.style.backgroundColor = backgroundColor;
    messageElement.style.left = margin;

    chatbotBody.appendChild(messageElement);

    setTimeout(() => {
        chatbotBody.scrollTo(0, chatbotBody.scrollHeight);
    }, 100);
}


//------------------



      const chatbotContainer = document.getElementById('chatbot-container'); 
      const chatbotIcon = document.getElementById('chatbot_icon') 
      let isExpanded = false; 
 
       
      function toggleIframeSize() { 
           
          if(chatbotContainer.style.display=='none'){ 
            chatbotContainer.style.display='block' 
          }else{ 
            chatbotContainer.style.display='none' 
          } 
      } 
 
       
      chatbotIcon.addEventListener('click', function () { 
          toggleIframeSize(); 
      }); 
