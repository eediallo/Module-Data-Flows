const add = require("./calculator.js");

test("throw an error if num is not a string", () => {
  const target = "Parameter must be a string.";
  expect(() => {
    add(9)
  }).toThrow(target);
});
