// Load cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Default to empty array if no cart is found

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Call function to display cart items and update the total
    renderCartItems();

    // Cart Icon Click Event (For navigation to cart page)
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    // Checkout button logic (For now, just logs a message)
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Redirect to checkout page or add further functionality
    });
});

// Function to render cart items dynamically
function renderCartItems() {
    const cartProductsContainer = document.getElementById('cart-products');
    const totalPriceElement = document.getElementById('total-price');
    const cartEmptyMessage = document.getElementById('cart-empty-message');

    // Clear previous cart items
    cartProductsContainer.innerHTML = '';

    // If the cart is empty, show the empty message
    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';  // Show "Your cart is empty" message
        totalPriceElement.innerText = '0.00';  // Reset total price to 0
        return;
    } else {
        cartEmptyMessage.style.display = 'none';  // Hide "Your cart is empty" message
    }

    // Initialize total price
    let totalPrice = 0;

    // Loop through the cart and display each product
    cart.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="cart-product-img">
            <div class="cart-product-info">
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity: ${product.quantity}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            </div>
        `;

        // Add the product to the cart container
        cartProductsContainer.appendChild(productDiv);

        // Update the total price
        totalPrice += product.price * product.quantity;

        // Add event listener for removing the product from the cart
        const removeButton = productDiv.querySelector('.remove-from-cart');
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });
    });

    // Update the total price displayed
    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(index) {
    // Remove the product from the cart array
    cart.splice(index, 1);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart items
    renderCartItems();
}
