// the input is an array of numbers and strings
// return the average of all the numbers
// be sure to exclude the strings

function average(numbers) {
  const onlyNumbers = numbers.filter((item) => typeof item === "number");
  let sum = 0;
  onlyNumbers.forEach((num) => {
    sum += num;
  });

  return sum / onlyNumbers.length;
}
module.exports = average;
