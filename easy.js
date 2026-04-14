// easy/easy.js

/**
 * Processes a list of cart items, cleaning and validating them,
 * and then calculates the total price.
 *
 * Each cart item object is expected to have:
 * - id: string (unique identifier)
 * - name: string (product name)
 * - quantity: string (number of items, can be "0", "1", " 2 ", "NaN", etc.)
 * - price: string (price per item, can be "10.00", " 5 ", "invalid", etc.)
 *
 * The function should:
 * 1. Validate each item:
 *    - `id` must be a non-empty string.
 *    - `name` must be a non-empty string after trimming whitespace.
 *    - `quantity` must be a positive integer.
 *    - `price` must be a positive number.
 * 2. Remove any invalid items from the cart.
 * 3. Convert `quantity` and `price` to appropriate number types.
 * 4. Calculate the total price of the valid items.
 *
 * @param {Array<Object>} cartItems - An array of cart item objects.
 * @returns {Object} - An object containing:
 *   - `cleanedCart`: Array of valid and cleaned cart items.
 *   - `totalPrice`: Total price of all valid items.
 */
function processCartData(cartItems) {
  const cleanedCart = [];
  let totalPrice = 0;

  for (const item of cartItems) {

    item.quantity = Number(item.quantity);
    item.price = Number(item.price);
    const ind = cartItems.indexOf(item);

    if (item.id === "") cartItems.splice(ind, 1);
    else if (item.name.trim() === "") cartItems.splice(ind, 1);
    else if (item.quantity <= 0 || !Number.isInteger(item.quantity)) cartItems.splice(ind, 1);
    else if (item.price <= 0 || isNaN(item.price)) cartItems.splice(ind, 1);
    else {
      cleanedCart.push(item);
      totalPrice += item.price * item.quantity;
    }

  }


  return { cleanedCart, totalPrice };
}

module.exports = { processCartData };
