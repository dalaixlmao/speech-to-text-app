// Get elements from the DOM
const button = document.querySelector('.remote-button');
const spokenText = document.querySelector('.spoken-text');
const originalButtonText = button.textContent;

// Initialize the SpeechRecognition object
const recognition = new webkitSpeechRecognition();

// Set the Whisper Speech Recognition URL
recognition.url = 'wss://api.openai.com/v1/whisper/asr';

// Function to handle speech recognition
function handleSpeechRecognition() {
  // Check if the browser supports speech recognition
  if ('webkitSpeechRecognition' in window) {
    // Start speech recognition
    recognition.start();

    // Disable the button while listening
    button.disabled = true;

    // Change button text to "Listening..."
    button.textContent = 'Listening...';

    // Event handler when speech recognition result is available
    recognition.onresult = function (event) {
      const result = event.results[0][0].transcript;

      // Update the spoken text
      spokenText.textContent = result;

      // Enable the button after listening
      button.disabled = false;

      // Change button text back to original
      button.textContent = originalButtonText;
    };
  } else {
    alert('Speech recognition is not supported in this browser.');
  }
}

// Event listener for button click
button.addEventListener('click', handleSpeechRecognition);
