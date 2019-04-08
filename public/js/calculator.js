let entryScreen = document.getElementById("entryScreen");
let button = document.getElementsByTagName("button");
let test = document.getElementById("test");

let numberActionButtons = [];
let e = /[0-9.]/;
for (let i = 0; i < button.length; i++) {
  numberActionButtons.push(button[i]);
}

let operators = /[*/+-]/;
let entry = [];
let state = true;

function calculateSentence(array) {
  let newAnswer;
  try {
  let answer = eval(array.join(""));
    answer = answer.toString();
  if (answer==="Infinity"){
    return answer;
  } else if (answer.includes("e")){
    newAnswer = answer.slice(0,4);
    let endingExponent= answer.substring(answer.indexOf("e"), answer.length);
    answer = newAnswer + endingExponent;

  } else if (answer > 1000000000000){
    let exponent = answer.length - 1;
    answer = answer[0]+"."+answer[1]+answer[2]+" E"+exponent;
  }
  return answer;
  } catch (error) {
    state = false;
    return "Error";
  }
}

for (let j = 0; j < numberActionButtons.length; j++) {
  //for
  numberActionButtons[j].addEventListener("click", function(event) {
    if (numberActionButtons[j].value === "AC") {
      entry = [];
      state = true;
      computeMath = [];
      entryScreen.innerHTML = "0";
    } else if (numberActionButtons[j].value == "CE") {
      state = true;
      entry.pop(entry[entry.length - 1]);
      if (entry.length === 0) {
        entryScreen.innerHTML = "0";
      } else {
        entryScreen.innerHTML = entry.join("");
      }
    } else if (numberActionButtons[j].value !== "=" && state !== false) {
      if (
        operators.test(numberActionButtons[j].value) &&
        operators.test(entry[entry.length - 1])
      ) {
        entry[entry.length - 1] = numberActionButtons[j].value;
        entryScreen.innerHTML = entry.join("");
      } else if (
        numberActionButtons[j].value === "." &&
        entry[entry.length - 1] === "."
      ) {
        entryScreen.innerHTML = entry.join("");
      } else {
        entry.push(numberActionButtons[j].value);
        entryScreen.innerHTML = entry.join("");
      }
    } else if (state !== false) {
      // for the equal sign
      if (calculateSentence(entry) !== "Error") {
        entry = [calculateSentence(entry)];
        entryScreen.innerHTML = entry.join("");
      } else {
        entryScreen.innerHTML = "Error";
        entry = [];
      }
    }
  });
}
