const verify = require("./passwordVerifier.js");

describe("password verifier", () => {
  test("rejects password if its length is less than 8", () => {
    const currentInput = verify("eu4u");
    const targetOutput = "Password rejected";
    expect(currentInput).toBe(targetOutput);
  });

  test("rejects a null password", () => {
    const currentInput = verify('');
    const targetOutput = "Password rejected";
    expect(currentInput).toBe(targetOutput);
  });

  test("rejected password without a least one uppercase letter", () => {
    const currentInput = verify("9938hello");
    const targetOutput = "Password rejected";
    expect(currentInput).toBe(targetOutput);
  });

  test("rejected password without a least one number", () => {
    const currentInput = verify("HelloElhadj");
    const targetOutput = "Password rejected";
    expect(currentInput).toBe(targetOutput);
  });
});
