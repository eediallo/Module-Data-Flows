function convertToNewRoman(n) {
  let numeral = "";
  if (n === 1) {
    return "I";
  }

  for (let i = 0; i < n; i++) {
    numeral += "I";
  }

  return numeral
}

module.exports = convertToNewRoman;
