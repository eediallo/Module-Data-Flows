function sales(carsSold) {
  const totals = {
    Ford: 0,
    Honda: 0,
    "Land Rover": 0,
    Toyota: 0,
  };

  for (let { make, price } of carsSold) {
    if (totals.hasOwnProperty(make)) {
      totals[make] += price;
    }
  }

  return totals;
}

module.exports = sales;
