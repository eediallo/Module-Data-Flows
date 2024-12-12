function verifier(password) {
  if (password.length < 8) {
    return "Password rejected";
  }
}

module.exports = verifier;
