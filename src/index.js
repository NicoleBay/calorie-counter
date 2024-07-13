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
