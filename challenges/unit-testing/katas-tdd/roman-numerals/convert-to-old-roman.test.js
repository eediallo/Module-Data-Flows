const convertToOldRoman = require("./convert-to-old-roman");

test("returns I if passed 1 as an argument", function () {
  const currentInput = convertToOldRoman(1);
  const targetOutput = "I";
  expect(currentInput).toBe(targetOutput);
});

test("returns II if passed 2 as an argument", function () {
  const currentInput = convertToOldRoman(2);
  const targetOutput = "II";
  expect(currentInput).toBe(targetOutput);
});

test("returns III if passed 3 as an argument", function () {
  const currentInput = convertToOldRoman(3);
  const targetOutput = "III";
  expect(currentInput).toBe(targetOutput);
});

test("returns VII if passed 7 as an argument", function () {
  const currentInput = convertToOldRoman(7);
  const targetOutput = "VII";
  expect(currentInput).toBe(targetOutput);
});

test("returns XV if passed 15 as an argument", function () {
  const currentInput = convertToOldRoman(15);
  const targetOutput = "XV";
  expect(currentInput).toBe(targetOutput);
});

test("returns XVIII if passed 18 as an argument", function () {
  const currentInput = convertToOldRoman(18);
  const targetOutput = "XVIII";
  expect(currentInput).toBe(targetOutput);
});

test("returns XXII if passed 22 as an argument", function () {
  const currentInput = convertToOldRoman(22);
  const targetOutput = "XXII";
  expect(currentInput).toBe(targetOutput);
});