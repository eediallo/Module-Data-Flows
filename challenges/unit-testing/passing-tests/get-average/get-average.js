// the input is an array of numbers and strings
// return the average of all the numbers
// be sure to exclude the strings

function compare(a, b) {
  return a - b;
}
function average(numbers) {
  const onlyNumbers = numbers.filter((item) => typeof item === "number");
  const sortedNumbers = onlyNumbers.sort(compare);
  console.log(sortedNumbers);
}

average([4, 100, "-", 8, 11, "hello", "57", 0, 2, 10]);
module.exports = average;
