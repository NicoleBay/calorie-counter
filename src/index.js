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
  <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name"/>
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories"/>
  `;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString); //sets or returns the HTML content inside an element. insertAdjacentHTML() makes sure entries don't disappear when new one is added (two arguments = insert new as last child, also pass the HTML string)
}

//attaching submit event of the form
function calculateCalories(e) {
  e.preventDefault();
  isError = false; //Reset the global error flag at the start
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  //check is there's an error in input
  if (isError) {
    return; // Exit the function if an error was detected
  }

  // Calculate the consumed calories
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;

  // Calculate remaining calories
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;

  // Declare and assign surplusOrDeficit using a ternary operator
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";

  output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    //Maths.abs = ensure that the value is positive
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
<p>${exerciseCalories} Calories Burned</p>
  `; //span with class and toLowerCase()

  output.classList.remove("hide"); // visible so the user can see your text
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

function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  ); //querying the document for all elements with the class input-container
  for (const container of inputContainers) {
    container.innerHTML = "";
  } //This will clear all of the contents of that input container.
  budgetNumberInput.value = ""; //clear the budgetNumberInput
  output.innerText = ""; // clear the output element's text
  output.classList.add("hide"); //  restore the hide class to the output element
}

addEntryButton.addEventListener("click", addEntry); //button behaviour
calorieCounter.addEventListener("submit", calculateCalories); //button behavior
clearButton.addEventListener("click", clearForm); //button behavior
