let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];


function orderReceipt(){
  
  console.log('QTY'.padEnd(8),'ITEM'.padEnd(18),'TOTAL')
  let totalOrder = 0
  for(const {quantity, itemName, unitPricePence} of order){
    const totalPerItem = ((unitPricePence * quantity) / 100).toFixed(2)
    totalOrder += unitPricePence * quantity
    console.log(`${quantity.toString().padEnd(8)}${itemName.padEnd(20)}${totalPerItem}`)
  }

  console.log(`\nTotal: ${(totalOrder/100).toFixed(2)}`)
}

orderReceipt()