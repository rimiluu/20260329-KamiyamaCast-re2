let mediaRecorder;
let audioChunks = [];
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const audioPreview = document.getElementById('audioPreview');
const audioInput = document.getElementById('audioInput');
let streamStarted = false;

recordButton.addEventListener('click', () => {
    if (!streamStarted) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                streamStarted = true;

                mediaRecorder.ondataavailable = function (e) {
                    audioChunks.push(e.data);
                };

                mediaRecorder.onstop = function () {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioPreview.src = audioUrl;

                    // Set the recorded blob as a file to the hidden input
                    const file = new File([audioBlob], "recordedAudio.wav", { type: "audio/wav" });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    audioInput.files = dataTransfer.files;
                };

                mediaRecorder.start();
                recordButton.disabled = true;
                stopButton.disabled = false;
                audioChunks = [];
            })
            .catch(error => console.error('Error accessing media devices.', error));
    } else {
        mediaRecorder.start();
        recordButton.disabled = true;
        stopButton.disabled = false;
        audioChunks = [];
    }
});

stopButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        recordButton.disabled = false;
        stopButton.disabled = true;
    }
});
