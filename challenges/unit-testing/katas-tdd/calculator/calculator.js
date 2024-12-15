function add(numbers) {
  let sum = 0;
  if (typeof numbers !== "string") {
    throw new Error("Parameter must be a string.");
  }

  if (numbers === "") {
    return sum;
  }

  const negativeValues = [];
    const nums = numbers.split(",");
    for (let num of nums) {
      num = Number(num);
      if (num > 1000) {
        continue;
      }
      if (num < 0) {
        negativeValues.push(num);
      }
      sum += num;
    }

    if (negativeValues.length > 0) {
      throw new Error(`negatives not allowed: ${negativeValues.join(", ")}`);
    }
  return sum;
}

module.exports = add;
