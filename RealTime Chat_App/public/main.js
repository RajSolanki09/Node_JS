const socket = io();

const clientsTotal = document.getElementById('client-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

let typingTimeout = null;

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

messageInput.addEventListener('input', () => {
    socket.emit('typing', {
        name: nameInput.value
    });
});

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`;
});

socket.on('chat-message', (data) => {
    addMessageToUI(false, data);
});

socket.on('typing-feedback', (data) => {
    const feedbackElement = document.createElement('li');
    feedbackElement.classList.add('message-feedback');
    feedbackElement.innerHTML = `<p class="feedback" id="feedback">${data.name} is typing...</p>`;
    
    // Remove existing typing messages
    const existingFeedback = messageContainer.querySelectorAll('.message-feedback');
    existingFeedback.forEach(element => element.remove());
    
    messageContainer.appendChild(feedbackElement);
    scrollToBottom();

    // Remove typing indicator after 1 second
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        feedbackElement.remove();
    }, 1000);
});

function sendMessage() {
    if (messageInput.value === '') return;
    
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    };

    socket.emit('message', data);
    addMessageToUI(true, data);
    messageInput.value = '';
}

function addMessageToUI(isOwnMessage, data) {
    const element = document.createElement('li');
    element.classList.add(isOwnMessage ? 'message-right' : 'message-left');
    
    const messageTime = moment(data.dateTime).format('h:mm A');
    
    element.innerHTML = `
        <p class="message">
            ${data.message}
            <span>${data.name} • ${messageTime}</span>
        </p>
    `;
    
    // Remove typing indicator if exists
    const existingFeedback = messageContainer.querySelectorAll('.message-feedback');
    existingFeedback.forEach(element => element.remove());
    
    messageContainer.appendChild(element);
    scrollToBottom();
}

function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}