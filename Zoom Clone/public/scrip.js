const { Socket } = require("socket.io");

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;
// myVideo.playsInline = true;
// document.body.appendChild(myVideo);

let myVideoStream;
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, myVideoStream);
});

Socket.emit("join-room", roomId, userId);

socket.on("user-connected", (userId) => {
    connectToNewUser(userId);
});

const connectToNewUser = (userId) => {
    console.log("New user connected", userId);
}
const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videoGrid.append(video);
};

