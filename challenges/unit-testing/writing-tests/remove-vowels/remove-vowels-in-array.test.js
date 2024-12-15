let removeVowelsFromWords = require("./remove-vowels-in-array");

test("remove vowels from all words in array", function () {
  const names = ["Irina", "Etza", "Daniel"];
  const currentInput = removeVowelsFromWords(names);
  const targetOutput = ["rn", "tz", "Dnl"];
  expect(currentInput).toEqual(targetOutput);
});
