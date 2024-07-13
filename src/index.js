const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

//update later
let isError = false;

//if a number is entered with a + or - sign, remove those characters
function cleanInputString(str) {
  const regex = /[+-\s]/g; // + - space. g tells it to keep looking even after it found a macth. uses Regular Expressions or "regex"
  return str.replace(regex, ""); //Use your regex to replace all instances of +, -, and a space in str with an empty string. Return this value.
}

//In HTML, number inputs allow for exponential notation (such as 1e10). You need to filter those out
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // i flag makes the pattern case-insensitive. \d to match any digit. + allows to match a pattern one or more times.
  return str.match(regex); //returns an array of matches
}

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container` //template literals
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // Get the count of the text inputs (entries' names). + 1 make sure entry doesn't start at 0.
  //HTML string to add to the webpage
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name">/>
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"/>
  `;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString); //sets or returns the HTML content inside an element. insertAdjacentHTML() makes sure entries don't disappear when new one is added (two arguments = insert new as last child, also pass the HTML string)
}

//get the calorie counts from the user's entries
function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    //loop through an array and a NodeList
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);
    if (invalidInputMatch) {
      //checks if invalidInputMatch is truthy
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

addEntryButton.addEventListener("click", addEntry); //button behaviour
