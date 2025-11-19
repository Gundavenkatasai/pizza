// Test Script: Cart Functionality for Anonymous Users
// Run this in the browser console to test cart operations

// Test 1: Check if cart context is available
console.log('Testing Cart Functionality...');

// Test 2: Check localStorage cart
const guestCart = localStorage.getItem('guest_cart');
console.log('Current guest cart:', guestCart ? JSON.parse(guestCart) : 'Empty');

// Test 3: Simulate adding item (you can run this after adding real items)
function testCartAdd() {
  const testItem = {
    id: 'test-' + Date.now(),
    pizza: {
      id: '1',
      name: 'Test Pizza',
      basePrice: 12.99
    },
    size: {
      id: 'medium',
      name: 'medium',
      priceMultiplier: 1.2
    },
    quantity: 1,
    totalPrice: 15.59,
    customizations: []
  };
  
  const currentCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
  currentCart.push(testItem);
  localStorage.setItem('guest_cart', JSON.stringify(currentCart));
  console.log('Test item added to cart');
  
  // Trigger a page refresh to see the cart update
  window.location.reload();
}

// Test 4: Clear cart
function clearTestCart() {
  localStorage.removeItem('guest_cart');
  console.log('Guest cart cleared');
  window.location.reload();
}

console.log('Available test functions:');
console.log('- testCartAdd() - Add a test item');
console.log('- clearTestCart() - Clear the cart');
