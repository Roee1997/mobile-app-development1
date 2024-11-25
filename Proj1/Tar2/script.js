import { Duck } from './Duck.js';

const duckForm = document.getElementById("duckForm");
const createButton = document.getElementById("createButton");
const showButton = document.getElementById("showButton");
const quackButton = document.getElementById("quackButton");
const buttonsDiv = document.getElementById("buttons");
const outputDiv = document.getElementById("output");

let duckInstance = null;

// Handle form submission
duckForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const color = document.getElementById("color").value;
  const age = parseInt(document.getElementById("age").value, 10);
  const weight = parseFloat(document.getElementById("weight").value);
  const image = document.getElementById("image").value;

  // Create a new Duck instance
  duckInstance = new Duck(name, color, age, weight, image);

  // Disable the create button
  createButton.disabled = true;

  // Show buttons for actions
  buttonsDiv.style.display = "block";

  // Clear output
  outputDiv.innerHTML = "";
});

// Handle "Show" button click
showButton.addEventListener("click", () => {
  if (duckInstance) {
    outputDiv.innerHTML = duckInstance.Show();
  }
});

// Handle "Quack" button click
quackButton.addEventListener("click", () => {
  if (duckInstance) {
    outputDiv.innerHTML = duckInstance.Quack();
  }
});
