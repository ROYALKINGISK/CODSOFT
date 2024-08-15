document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.category-button');
    const categories = document.querySelectorAll('.menu-category');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            categories.forEach(categoryDiv => {
                if (category === 'all' || categoryDiv.getAttribute('data-category') === category) {
                    categoryDiv.style.display = 'block';
                } else {
                    categoryDiv.style.display = 'none';
                }
            });
        });
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.getAttribute('data-item');
            const price = button.getAttribute('data-price');
            addToCart(item, price);
        });
    });

    function addToCart(item, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItem = { item, price };
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${item} added to cart!`);
    }

    // Show all categories by default
    document.querySelector('.category-button[data-category="all"]').click();
});
