function sales(carsSold) {
  const totals = {
    Ford: 0,
    Honda: 0,
    "Land Rover": 0,
    Toyota: 0,
  };

  for (let carDetails of carsSold) {
    const {make, price} = carDetails
    if (make === "Ford") {
      totals.Ford += price;
    } else if (make === "Honda") {
      totals.Honda = price;
    } else if (make === "Land Rover") {
      totals["Land Rover"] += price;
    } else {
      totals.Toyota += price;
    }
  }

  return totals;
}

module.exports = sales;
