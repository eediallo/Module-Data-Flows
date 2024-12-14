const numerals = {
  one: "I",
  four: "IV",
  five: "V",
  nine: "IX",
  ten: "X",
  forty: "XL",
  fifty: "L",
  ninety: "XC",
  hundred: "C",
  fourHundred: "CD",
  fiveHundred: "D",
  nineHundred: "CM",
  thousand: "M",
};

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
