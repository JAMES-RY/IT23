let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get cart from localStorage or initialize as empty array

// Sample products
let products = [
    { name: 'Product 1', price: 20.00, img: 'image/pic.webp' },
    { name: 'Product 2', price: 25.00, img: 'image/pic.png' },
    { name: 'Product 3', price: 30.00, img: 'image/pic2.png' }
];

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');  // Get the search input field
    const productList = document.querySelector('.product-list');  // Get the product list container

    // Initial render of all products
    renderProducts(products);

    // Add event listener for search input to filter products
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        filterProducts(query);
    });

    // Add event listeners to "Add to Cart" buttons dynamically after product render
    productList.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productName = event.target.getAttribute('data-name');
            const productPrice = parseFloat(event.target.getAttribute('data-price'));
            addToCart(productName, productPrice);
        }
    });
});

// Function to add products to the cart
function addToCart(name, price) {
    const product = { name, price };
    cart.push(product);  // Add product to cart array
    localStorage.setItem('cart', JSON.stringify(cart));  // Save the updated cart to localStorage
    alert(`${name} has been added to your cart!`);
    console.log(cart);  // For debugging: log the current cart contents
}

// Function to filter products based on the search query
function filterProducts(query) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    renderProducts(filteredProducts);  // Render filtered products
}

// Function to render products to the page
function renderProducts(productsToRender) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = ''; // Clear the current products

    // Loop through the products array and create HTML for each product
    productsToRender.forEach(product => {
        const productArticle = document.createElement('article');
        productArticle.classList.add('product');

        productArticle.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        productList.appendChild(productArticle);
    });
}
