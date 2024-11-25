import { Clock } from './clock.js';
console.log("Script loaded"); // Ensure script is loaded

// Select the form and output div
const clockForm = document.getElementById("clockForm");
const outputDiv = document.getElementById("output");
const clocks = []; // Array to store clock instances
// Handle form submission
clockForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Get input values
    const hours = parseInt(document.getElementById("hours").value, 10);
    const minutes = parseInt(document.getElementById("minutes").value, 10);
    const seconds = parseInt(document.getElementById("seconds").value, 10);
    const country = document.getElementById("country").value;

    // Create a new Clock instance
    const clock = new Clock(hours, minutes, seconds, country);

    // Add clock to the array
    clocks.push(clock);

    // Clear form fields
    clockForm.reset();

    // Display results if there are 5 clocks
    if (clocks.length === 5) {
        displayClocks();
    }
});

function displayClocks() {
    outputDiv.innerHTML = "<h2>Clock Details:</h2>";
    clocks.forEach((clock) => {
        const div = document.createElement("div");
        div.innerHTML = `
      <p>Country: ${clock.country}</p>
      <p>Time: ${clock.Show()}</p>
      <p>Seconds: ${clock.ConvertToSeconds()}</p>
    `;
        div.style.border = "2px solid #ccc"; // Light gray border
        div.style.borderRadius = "8px"; // Rounded corners
        div.style.padding = "10px"; // Inner spacing
        div.style.margin = "10px 0"; // Space between clock entries
        div.style.backgroundColor = "#f9f9f9"; // Light background color
        div.style.boxShadow = "2px 2px 8px rgba(0, 0, 0, 0.1)"; // Subtle shadow
        outputDiv.appendChild(div);
    });
}
