const numerals = {
  one: "I",
  five: "V",
  ten: "X",
  fifty: "L",
  hundred: "C",
  fiveHundred: "D",
  thousand: "M",
};

const fiveThounsand = "VM";
function convertToNewRoman(n) {
  let numeral = "";
  if (n === 1) {
    return numerals.one;
  }

  // handle 1 to 3
  for (let i = 1; i < 4; i++) {
    numeral += numerals.one;
  }

  if (n === 5) {
    return numerals.five;
  }

  return numeral;
}

module.exports = convertToNewRoman;

("iv");
