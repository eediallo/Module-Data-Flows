let getLargestNumber = require("./largest-number");

test("returns largest number in array", function () {
  const numbers = [3, 21, 88, 4, 36];
  const currentInput = getLargestNumber(numbers);
  const targetOutput = 88;
  expect(currentInput).toEqual(targetOutput);
});

// example
// input: [3, 21, 88, 4, 36];
// expected: 88;

// also test that the original array hasn't changed
