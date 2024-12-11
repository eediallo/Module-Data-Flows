function add(numbers) {
  let sum = 0;
  if (typeof numbers !== "string") {
    throw new Error("Parameter must be a string.");
  }

  if (numbers === "") {
    return 0
  }
}

module.exports = add;
