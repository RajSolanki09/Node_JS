// Constants and configurations
const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '8090'
});

// Video stream setup
const myVideo = document.createElement('video');
myVideo.muted = true;
let myVideoStream;
const peers = {};

// Media stream handling
async function initializeStream() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        myVideoStream = stream;
        addVideoStream(myVideo, stream);
        handlePeerCalls(stream);
        setupMessageHandling();
        return stream;
    } catch (error) {
        console.error('Failed to get media stream:', error);
        alert('Unable to access camera or microphone. Please check your permissions.');
    }
}

// Peer connection handling
function handlePeerCalls(stream) {
    myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
        call.on('error', error => {
            console.error('Peer call error:', error);
            video.remove();
        });
    });

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    });
}

// Message handling setup
function setupMessageHandling() {
    const textInput = document.querySelector('#chat_message');
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && textInput.value.trim().length > 0) {
            socket.emit('message', textInput.value);
            textInput.value = '';
        }
    });

    socket.on('createMessage', message => {
        const messagesList = document.querySelector('.messages');
        const messageElement = document.createElement('li');
        messageElement.className = 'message';
        messageElement.innerHTML = `<b>User</b><br/>${message}`;
        messagesList.appendChild(messageElement);
        scrollToBottom();
    });
}

// User connection handling
function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    
    call.on('close', () => {
        video.remove();
    });
    
    call.on('error', error => {
        console.error('Connection to user failed:', error);
        video.remove();
    });

    peers[userId] = call;
}

// Video stream utility functions
function addVideoStream(video, stream) {
    try {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(error => {
                console.error('Failed to play video:', error);
            });
        });
        videoGrid.append(video);
    } catch (error) {
        console.error('Error adding video stream:', error);
    }
}

function scrollToBottom() {
    const chatWindow = document.querySelector('.main__chat_window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Media controls
const MediaControls = {
    toggleAudio: () => {
        const audioTrack = myVideoStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        updateAudioButton(audioTrack.enabled);
    },

    toggleVideo: () => {
        const videoTrack = myVideoStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        updateVideoButton(videoTrack.enabled);
    }
};

// UI update functions
function updateAudioButton(enabled) {
    const html = enabled ? 
        `<i class="fas fa-microphone"></i><span>Mute</span>` :
        `<i class="unmute fas fa-microphone-slash"></i><span>Unmute</span>`;
    document.querySelector('.main__mute_button').innerHTML = html;
}

function updateVideoButton(enabled) {
    const html = enabled ?
        `<i class="fas fa-video"></i><span>Stop Video</span>` :
        `<i class="stop fas fa-video-slash"></i><span>Play Video</span>`;
    document.querySelector('.main__video_button').innerHTML = html;
}

// Event listeners
document.querySelector('.main__mute_button').addEventListener('click', MediaControls.toggleAudio);
document.querySelector('.main__video_button').addEventListener('click', MediaControls.toggleVideo);

// Peer connection setup
myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

// Socket event handlers
socket.on('user-disconnected', userId => {
    if (peers[userId]) {
        peers[userId].close();
        delete peers[userId];
    }
});

// Initialize everything
initializeStream().catch(error => {
    console.error('Failed to initialize:', error);
});

// Leave meeting handler
document.querySelector('.leave_meeting').addEventListener('click', () => {
    window.location.href = '/';
});