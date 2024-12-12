function verifier(password) {
  const passwordRejected = "Password rejected";
  if (password === null) {
    return passwordRejected;
  }

  if (password.length < 8) {
    return passwordRejected;
  }

  if (!includesUpperCaseLetterAndNumber(password)) {
    return passwordRejected;
  }

  return "Password Accepted";
}

function includesUpperCaseLetterAndNumber(str) {
  return Boolean(str.match(/[A-Z]/g) && str.match(/[0-9]/g));
}

module.exports = verifier;
