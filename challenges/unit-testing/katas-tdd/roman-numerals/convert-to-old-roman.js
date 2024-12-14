const romanNumerals = {
  one: "I",
  five: "V",
  ten: "X",
  fifty: "L",
  hundred: "C",
  fiveHundred: "D",
  thousand: "M",
};

function convertToOldRoman(number) {
  let result = "";

  const numeralValues = [
    { value: 1000, numeral: romanNumerals.thousand },
    { value: 500, numeral: romanNumerals.fiveHundred },
    { value: 100, numeral: romanNumerals.hundred },
    { value: 50, numeral: romanNumerals.fifty },
    { value: 10, numeral: romanNumerals.ten },
    { value: 5, numeral: romanNumerals.five },
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

module.exports = convertToOldRoman;
