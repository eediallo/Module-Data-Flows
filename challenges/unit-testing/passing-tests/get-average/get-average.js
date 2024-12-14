// the input is an array of numbers and strings
// return the average of all the numbers
// be sure to exclude the strings

function average(numbers) {
  const onlyNumbers = numbers.filter((item) => typeof item === "number");
  console.log(onlyNumbers);
}

average([4, "-", 8, 11, "hello", "57", 0, 2]);
module.exports = average;
