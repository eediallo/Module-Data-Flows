let convertToNewRoman = require("./convert-to-new-roman");

test("returns I if passed 1 as an argument", function () {
  const currentInput = convertToNewRoman(1);
  const targetOutput = "I";
  expect(currentInput).toBe(targetOutput);
});

test("returns II if passed 2 as an argument", function () {
  const currentInput = convertToNewRoman(3);
  const targetOutput = "III";
  expect(currentInput).toBe(targetOutput);
});

test("returns V if passed 5 as an argument", function () {
  const currentInput = convertToNewRoman(5);
  const targetOutput = "V";
  expect(currentInput).toBe(targetOutput);
});
test("returns III if passed 3 as an argument", function () {
  const currentInput = convertToNewRoman(3);
  const targetOutput = "III";
  expect(currentInput).toBe(targetOutput);
});

test("returns IV if passed 4 as an argument", function () {
  const currentInput = convertToNewRoman(4);
  const targetOutput = "IV";
  expect(currentInput).toBe(targetOutput);
});
