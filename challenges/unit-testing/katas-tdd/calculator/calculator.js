function add(numbers) {
  let sum = 0;
  if (typeof numbers !== "string") {
    throw new Error("Parameter must be a string.");
  }

  if (numbers === "") {
    return sum;
  }

  if (numbers.length === 1) {
    return Number(numbers);
  }

  if (numbers.length > 1) {
    const nums = numbers.split(",");
    for (let num of nums) {
      num = Number(num);
      if (num > 1000) {
        continue;
      }
      if (num < 0) {
        throw new Error(`negatives not allowed: ${num}`);
      }
      sum += num;
    }
  }

  return sum;
}

add("5,6");

module.exports = add;
