// Get elements from the DOM
const button = document.querySelector('.remote-button');
const spokenText = document.querySelector('.spoken-text');
const originalButtonText = button.textContent;

// Initialize the SpeechRecognition object
const recognition = new webkitSpeechRecognition();

// Set the Whisper Speech Recognition URL

recognition.url = 'wss://api.openai.com/v1/whisper/asr';


const token = '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';
const gptEl = document.getElementById('gpt_answer');



var voiceInput="Generate the code to";


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
    const  result = event.results[0][0].transcript;

      // Update the spoken text
      spokenText.textContent = result;
      voiceInput=voiceInput + result;
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
//Function to get response from chat gpt of the text given from voice.
async function getChatGptResponse(voiceInput) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token,
    },
    body: JSON.stringify({
      prompt: voiceInput,
      max_tokens: 100, // Adjust the max tokens to control the response length
      temperature: 0.7, // Adjust the temperature for more creative or focused responses
      n: 1, // Number of responses to generate
      stop: '\n' // Stop generating tokens at a newline character
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim(); // Get the generated response text
}

// Function to execute the generated Selenium code
function executeSeleniumCode(seleniumCode) {
  const script = document.createElement('script');
  script.textContent = seleniumCode;
  document.body.appendChild(script);
}

// Generate and execute Selenium code based on ChatGPT response
async function generateAndExecuteSeleniumCode(voiceInput) {
  try {
    const response = await getChatGptResponse(voiceInput);

    // Perform any necessary parsing or transformation of the response
    const seleniumCode = response; // Customize based on the structure of the response

    executeSeleniumCode(seleniumCode);
  } catch (error) {
    console.error(error);
  }
}

generateAndExecuteSeleniumCode(voiceInput);
