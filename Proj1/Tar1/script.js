import { Counter } from './Counter.js';

const inputField = document.getElementById("counterInput");
const startButton = document.getElementById("startButton");
const incrementButton = document.getElementById("incrementButton");
const goButton = document.getElementById("goButton");

let counterInstance;

// Initialize the counter
startButton.addEventListener("click", () => {
  const value = parseInt(inputField.value);
  counterInstance = new Counter(value);
  console.log(counterInstance);
});

// Increment the counter
incrementButton.addEventListener("click", () => {
  counterInstance.Increment();
  inputField.value = counterInstance.value;
});

// Print numbers
goButton.addEventListener("click", () => {
counterInstance.Go();
});
