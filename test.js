// easy/test.js
const assert = require('assert');
const { processCartData } = require('./easy');
const { exit } = require('process');
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
function runTest(name, testFunction) {
  totalTests++;
  try {
    testFunction();
    passedTests++;
    console.log(`✅ ${name}`);
  } catch (error) {
    failedTests++;
    console.error(`❌ ${name}`);
    console.error(error.message);
  }
}

console.log('Running Easy Level Tests: Cart Data Cleaning\n');

runTest('should correctly process a valid cart', () => {
  const cartItems = [{
    id: '1',
    name: 'Laptop',
    quantity: '1',
    price: '1200.00'
  }, {
    id: '2',
    name: 'Mouse',
    quantity: '2',
    price: '25.50'
  }, ];
  const {
    cleanedCart,
    totalPrice
  } = processCartData(cartItems);

  assert.strictEqual(cleanedCart.length, 2, 'Expected 2 items in cleaned cart');
  assert.deepStrictEqual(cleanedCart[0], {
    id: '1',
    name: 'Laptop',
    quantity: 1,
    price: 1200
  }, 'First item mismatch');
  assert.deepStrictEqual(cleanedCart[1], {
    id: '2',
    name: 'Mouse',
    quantity: 2,
    price: 25.50
  }, 'Second item mismatch');
  assert.strictEqual(totalPrice, 1251, 'Total price mismatch'); // 1*1200 + 2*25.50 = 1200 + 51 = 1251
});

runTest('should remove items with invalid quantity (zero, negative, non-numeric)', () => {
  const cartItems = [{
    id: '1',
    name: 'Valid Item',
    quantity: '1',
    price: '10.00'
  }, {
    id: '2',
    name: 'Zero Quantity',
    quantity: '0',
    price: '5.00'
  }, {
    id: '3',
    name: 'Negative Quantity',
    quantity: '-1',
    price: '10.00'
  }, {
    id: '4',
    name: 'Non-numeric Quantity',
    quantity: 'abc',
    price: '10.00'
  }, {
    id: '5',
    name: 'NaN Quantity',
    quantity: 'NaN',
    price: '10.00'
  }, {
    id: '6',
    name: 'Whitespace Quantity',
    quantity: '  ',
    price: '10.00'
  }, ];
  const {
    cleanedCart,
    totalPrice
  } = processCartData(cartItems);

  assert.strictEqual(cleanedCart.length, 1, 'Expected 1 valid item');
  assert.deepStrictEqual(cleanedCart[0].id, '1', 'Expected valid item to be present');
  assert.strictEqual(totalPrice, 10, 'Total price should only include valid item');
});

runTest('should remove items with invalid price (zero, negative, non-numeric, whitespace)', () => {
  const cartItems = [{
    id: '1',
    name: 'Valid Item',
    quantity: '1',
    price: '10.00'
  }, {
    id: '2',
    name: 'Zero Price',
    quantity: '1',
    price: '0'
  }, {
    id: '3',
    name: 'Negative Price',
    quantity: '1',
    price: '-5.00'
  }, {
    id: '4',
    name: 'Non-numeric Price',
    quantity: '1',
    price: 'xyz'
  }, {
    id: '5',
    name: 'NaN Price',
    quantity: '1',
    price: 'NaN'
  }, {
    id: '6',
    name: 'Whitespace Price',
    quantity: '  ',
    price: '10.00'
  }, ];
  const {
    cleanedCart,
    totalPrice
  } = processCartData(cartItems);

  assert.strictEqual(cleanedCart.length, 1, 'Expected 1 valid item');
  assert.deepStrictEqual(cleanedCart[0].id, '1', 'Expected valid item to be present');
  assert.strictEqual(totalPrice, 10, 'Total price should only include valid item');
});

runTest('should remove items with empty or whitespace-only names', () => {
  const cartItems = [{
    id: '1',
    name: 'Product A',
    quantity: '1',
    price: '10.00'
  }, {
    id: '2',
    name: '',
    quantity: '1',
    price: '20.00'
  }, {
    id: '3',
    name: '   ',
    quantity: '1',
    price: '30.00'
  }, ];
  const {
    cleanedCart,
    totalPrice
  } = processCartData(cartItems);

  assert.strictEqual(cleanedCart.length, 1, 'Expected 1 valid item');
  assert.deepStrictEqual(cleanedCart[0].name, 'Product A', 'Expected valid item name');
  assert.strictEqual(totalPrice, 10, 'Total price should only include valid item');
});

runTest('should remove items with empty id', () => {
  const cartItems = [{
    id: '1',
    name: 'Product A',
    quantity: '1',
    price: '10.00'
  }, {
    id: '',
    name: 'Product B',
    quantity: '1',
    price: '20.00'
  }, ];
  const {
    cleanedCart,
    totalPrice
  } = processCartData(cartItems);

  assert.strictEqual(cleanedCart.length, 1, 'Expected 1 valid item');
  assert.deepStrictEqual(cleanedCart[0].id, '1', 'Expected valid item id');
  assert.strictEqual(totalPrice, 10, 'Total price should only include valid item');
});

runTest('should return empty cart and zero total for an empty input array', () => {
  const {
    cleanedCart,
    totalPrice
  } = processCartData([]);
  assert.strictEqual(cleanedCart.length, 0, 'Expected empty cleaned cart');
  assert.strictEqual(totalPrice, 0, 'Expected zero total price');
});

runTest('should return empty cart and zero total for an array of all invalid items', () => {
  const cartItems = [{
    id: '',
    name: 'Invalid',
    quantity: '0',
    price: '0'
  }, {
    id: '2',
    name: '   ',
    quantity: 'abc',
    price: 'xyz'
  }, ];
  const {
    cleanedCart,
    totalPrice
  } = processCartData(cartItems);
  assert.strictEqual(cleanedCart.length, 0, 'Expected empty cleaned cart');
  assert.strictEqual(totalPrice, 0, 'Expected zero total price');
});

console.log('\nAll Easy Level tests completed.');

console.log('\n---------------------------');
console.log(`Total: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests === 0) {
  console.log('🎉 All tests passed!');
  process.exit(0);
} else {
  console.log(`⚠️ ${failedTests} test(s) failed`);
  process.exit(1);
}