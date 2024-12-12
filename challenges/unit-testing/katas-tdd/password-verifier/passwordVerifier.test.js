const verify = require("./passwordVerifier.js");

describe("password verifier", () => {
  test("rejects password if its length is less than 8", () => {
    const currentInput = verify("938u");
    const targetOutput = "Password rejected";
    expect(currentInput).toBe(targetOutput);
  });

  test("rejects a null password", () => {
    const currentInput = verify(null);
    const targetOutput = "Password rejected";
    expect(currentInput).toBe(targetOutput);
  });
});
