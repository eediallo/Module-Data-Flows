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

  const values = [
    { value: 1000, numeral: numerals.thousand },
    { value: 900, numeral: numerals.nineHundred },
    { value: 500, numeral: numerals.fiveHundred },
    { value: 400, numeral: numerals.fourHundred },
    { value: 100, numeral: numerals.hundred },
    { value: 90, numeral: numerals.ninety },
    { value: 50, numeral: numerals.fifty },
    { value: 40, numeral: numerals.forty },
    { value: 10, numeral: numerals.ten },
    { value: 9, numeral: numerals.nine },
    { value: 5, numeral: numerals.five },
    { value: 4, numeral: numerals.four },
    { value: 1, numeral: numerals.one },
  ];

  return numeral;
}

module.exports = convertToNewRoman;

("iv");
