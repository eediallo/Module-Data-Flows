function add(numbers) {
  if (typeof numbers !== "string") {
    throw new Error("Parameter must be a string.");
  }
}

module.exports = add;
