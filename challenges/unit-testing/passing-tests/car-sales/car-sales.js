function sales(carsSold) {
  const totals = {
    Ford: 0,
    Honda: 0,
    "Land Rover": 0,
    Toyota: 0,
  };

  for (let carDetails of carsSold) {
    console.log(carDetails.make);
    if (carDetails.make === "Ford") {
      totals.Ford += carDetails.price;
    } else if (carDetails.make === "Honda") {
      totals.Honda = carDetails.price;
    } else if (carDetails.make === "Land Rover") {
      totals["Land Rover"] += carDetails.price;
    } else {
      totals.Toyota += carDetails.price;
    }
  }

  return totals;
}

module.exports = sales;
