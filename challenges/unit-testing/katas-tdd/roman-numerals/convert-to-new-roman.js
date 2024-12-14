const romanNumerals = {
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

function convertToNewRoman(number) {
  let result = "";

  const numeralValues = [
    { value: 1000, numeral: romanNumerals.thousand },
    { value: 900, numeral: romanNumerals.nineHundred },
    { value: 500, numeral: romanNumerals.fiveHundred },
    { value: 400, numeral: romanNumerals.fourHundred },
    { value: 100, numeral: romanNumerals.hundred },
    { value: 90, numeral: romanNumerals.ninety },
    { value: 50, numeral: romanNumerals.fifty },
    { value: 40, numeral: romanNumerals.forty },
    { value: 10, numeral: romanNumerals.ten },
    { value: 9, numeral: romanNumerals.nine },
    { value: 5, numeral: romanNumerals.five },
    { value: 4, numeral: romanNumerals.four },
    { value: 1, numeral: romanNumerals.one },
  ];

  for (let i = 0; i < numeralValues.length; i++) {
    while (number >= numeralValues[i].value) {
      result += numeralValues[i].numeral;
      number -= numeralValues[i].value;
    }
  }

  return result;
}

module.exports = convertToNewRoman;
