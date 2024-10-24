

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(productName, productPrice);
        });
    });
});

function addToCart(name, price) {
    const product = { name, price };
    cart.push(product);
    alert(`${name} has been added to your cart!`);
    console.log(cart); // For debugging: log the current cart contents
}