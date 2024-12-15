let getLargestNumber = require("./largest-number");

test("returns largest number in array", function () {
  const numbers = [3, 21, 88, 4, 36];
  const currentInput = getLargestNumber(numbers);
  const targetOutput = 88;
  expect(currentInput).toEqual(targetOutput);
});

test("check if original has not changed", function () {
  const numbers = [3, 21, 88, 4, 36];
  const originalNumbers = [...numbers];
  const currentInput = getLargestNumber(numbers);
  const targetOutput = 88;
  expect(currentInput).toEqual(targetOutput);
  expect(numbers).toEqual(originalNumbers);
});
