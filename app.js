// Check if the browser supports the Web Speech API
if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    alert("Your browser does not support voice recognition.");
} else {
    // Set up SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep recognition active even after the first phrase
    recognition.interimResults = true; // Get intermediate results while speaking

    // DOM elements
    const startButton = document.getElementById('start-btn');
    const outputDiv = document.getElementById('output');

    // Start button event listener
    startButton.addEventListener('click', function() {
        recognition.start(); // Start voice recognition
        startButton.disabled = true; // Disable the button while recognizing
        startButton.innerText = 'Listening...';
    });

    // Event listener for when speech is recognized
    recognition.onresult = function(event) {
        const transcript = event.results[event.resultIndex][0].transcript;
        outputDiv.innerText = transcript; // Display recognized speech
    };

    // Event listener for speech recognition errors
    recognition.onerror = function(event) {
        outputDiv.innerText = 'Error: ' + event.error;
        startButton.disabled = false;
        startButton.innerText = 'Start Voice Recognition';
    };

    // Event listener when recognition ends
    recognition.onend = function() {
        startButton.disabled = false; // Enable the start button when recognition ends
        startButton.innerText = 'Start Voice Recognition';
    };
}
