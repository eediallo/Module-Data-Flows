const sum = require("./calculator.js");

test("throw an error if num is not a string", () => {
  const target = "Parameter must be a string";
  expect(() => {
    const str = 9;
    sum(str);
  }).toThrow(target);
});
