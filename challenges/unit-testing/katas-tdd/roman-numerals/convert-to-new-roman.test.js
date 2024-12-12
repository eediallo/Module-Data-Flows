let convertToNewRoman = require("./convert-to-new-roman");

test("returns I if passed 1 as an argument", function () {
  const currentInput = convertToNewRoman(1);
  const targetOutput = "I";
  expect(currentInput).toBe(targetOutput);
});
