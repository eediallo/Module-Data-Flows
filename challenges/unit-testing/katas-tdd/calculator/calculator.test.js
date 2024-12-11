const add = require("./calculator.js");

test("throw an error if num is not a string", () => {
  const target = "Parameter must be a string.";
  expect(() => {
    add(9);
  }).toThrow(target);
});

test("return 0 if param is empty", () => {
  const str = "";
  const currentInput = add(str);
  const targetOutput = 0;
  expect(currentInput).toEqual(targetOutput);
});

test("return number if param length is 1", () => {
  const str = "9";
  const currentInput = add(str);
  const targetOutput = 9;
  expect(currentInput).toEqual(targetOutput);
});
