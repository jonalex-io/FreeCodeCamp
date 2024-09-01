// ***************
// *** 先定變數 ***
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
// 標準除錯方法嗎
let isError = false;

// *************
// *** 次程式 ***

// Remove [+-\s] from user's numerical input
function cleanInputString(str) {
  // Regular Expression IS A PATTERN of characters
  // Pattern is used for searching & replacing characters in strings
  // /pattern/modifier(s);
  // Modifiers include:
  //    * /g - global match (find all)
  //    * /i - case-insensitive matching
  //    * /m - multi-line matching
  // Pattern may use brackets:
  //    * [abc] - find any character between the brackets
  //    * [0-9] - find any digit between the brackets
  // RegExp object has Properties & Methods:
  //    * toString()
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

// Check whether user is using scientific notation
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
  // match():
  //    * matches a string against a regex
  //    * returns an array with the matches
  //    * returns null if no match found
}

// Insert HTML within user's desired input-container for data input
function addEntry() {
  // * #entry-dropdown within html uses a <label> with a "for" attribute to reference the <select> <option>s
  //    * each option tag is given a value attribute
  //    * uses .value here because a Select Object represents an HTML <select> element
  //    * HTML <!-- fieldset ids and input-container class pathways correlate with dropdown select options later -->
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  // * Determine which entry # the user is inputting, + 1 to start count from 1
  // * Use to aid id selector construction
  //    * Note console initially logs with nothing as there is no <input> with a type="text" attribute
  //    * this case uses a CSS [attribute] selector
  //    * e.g. input[type="text"], a[target="_blank"]
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  // console.log(entryNumber);

  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories"/>`;

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);

// ***********
// *** 實驗 ***
console.log("%c function cleanInputString(str)", "font-weight: bold;");
console.log(cleanInputString("+100"))
console.log(cleanInputString("-100"))
console.log(cleanInputString("+- 1 0 0"))

console.log("%c function isInvalidInput(str)", "font-weight: bold;");
console.log(isInvalidInput("10e1"));
console.log(isInvalidInput("10E1"));
console.log(isInvalidInput("101"));

console.log("%c function addEntry()", "font-weight: bold;");
console.log("see comment")
// addEntry();

console.log("%c function calculateCalories(e)", "font-weight: bold;");