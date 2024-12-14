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

  for (let i = 0; i < values.length; i++) {
    while (n >= values[i].value) {
      numeral += values[i].numeral;
      n -= values[i].value;
    }
  }

  return numeral;
}

module.exports = convertToNewRoman;

("iv");
