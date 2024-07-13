const apiUrl = 'https://your-backend-service.onrender.com'; // Replace with your Render URL

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  const userInput = document.getElementById('inputField').value;

  try {
    const response = await fetch(`${apiUrl}/your-endpoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: userInput }),
    });

    const data = await response.json();

    // Populate the frontend with the response data
    document.getElementById('outputField').textContent = data.result;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Add event listener to your form
document.getElementById('yourForm').addEventListener('submit', handleSubmit);
