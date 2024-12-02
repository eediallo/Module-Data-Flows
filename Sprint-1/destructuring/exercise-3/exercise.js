let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

const formatCurrency = (total) => (total / 100).toFixed(2);

function formatReceiptDetails(str1, pad1Num, str2, pad2Num, str3) {
  console.log(`${str1.padEnd(pad1Num)}${str2.padEnd(pad2Num)}${str3}`);
}

function orderReceipt(arr) {
  formatReceiptDetails("QTY", 8, 'ITEM', 20, 'TOTAL');
  let totalOrder = 0;
  for (const { quantity, itemName, unitPricePence } of arr) {
    const totalPerItem = unitPricePence * quantity;
    const formattedTotalPerItem = formatCurrency(totalPerItem);
    totalOrder += unitPricePence * quantity;
    formatReceiptDetails(quantity.toString(), 8, itemName, 20, formattedTotalPerItem)
  }

  console.log(`\nTotal: ${formatCurrency(totalOrder)}`);
}

orderReceipt(order);
