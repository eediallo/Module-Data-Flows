function verifier(password) {
  if (password === null) {
    return "Password rejected";
  }

  if (password.length < 8) {
    return "Password rejected";
  }
}

module.exports = verifier;
