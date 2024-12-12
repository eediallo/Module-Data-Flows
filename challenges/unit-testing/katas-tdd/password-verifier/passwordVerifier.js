function verifier(password) {
  if (password === null) {
    return "Password rejected";
  }

  if (password.length < 8) {
    return "Password rejected";
  }

  if (!includesUpperCaseLetter(password)) {
    return "Password rejected";
  }

  return 'Password Accepted'
}

function includesUpperCaseLetter(str) {
  return Boolean(str.match(/[A-Z]/g));
}


module.exports = verifier;
