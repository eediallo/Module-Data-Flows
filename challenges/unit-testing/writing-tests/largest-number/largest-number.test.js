let getLargestNumber = require("./largest-number");

test("returns largest number in array", function () {
  const numbers = [3, 21, 88, 4, 36];
  const currentInput = getLargestNumber(numbers);
  const targetOutput = 88;
  expect(currentInput).toEqual(targetOutput);
});

test("returns Infinity in [-1, 9, Infinity, 900000]", function () {
  const numbers = [-1, 9, Infinity, 900000];
  const currentInput = getLargestNumber(numbers);
  const targetOutput = Infinity;
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
