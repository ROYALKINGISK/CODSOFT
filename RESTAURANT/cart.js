document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach(cartItem => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <p>${cartItem.item}</p>
                <p class="price">Rs:${cartItem.price}</p>
                <p class="quantity">Quantity: ${cartItem.quantity}</p>
                <button class="remove-from-cart" data-item="${cartItem.item}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += cartItem.price * cartItem.quantity;
        });
        cartTotal.innerText = total.toFixed(2);
        setupRemoveButtons();
    }

    function setupRemoveButtons() {
        const removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const item = button.getAttribute('data-item');
                removeFromCart(item);
            });
        });
    }

    function removeFromCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(cartItem => cartItem.item !== item);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    checkoutButton.addEventListener('click', () => {
        alert('Checkout not implemented yet!');
    });

    // Event listeners for menu item quantity controls
    document.querySelectorAll('.quantity-controls').forEach(control => {
        const decrementBtn = control.querySelector('.decrement');
        const incrementBtn = control.querySelector('.increment');
        const quantityDisplay = control.querySelector('.quantity');
        let quantity = parseInt(quantityDisplay.textContent, 10);

        decrementBtn.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateCartQuantity(control, quantity);
            }
        });

        incrementBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateCartQuantity(control, quantity);
        });
    });

    function updateCartQuantity(control, quantity) {
        const item = control.closest('.menu-item').querySelector('.add-to-cart').getAttribute('data-item');
        const price = parseFloat(control.closest('.menu-item').querySelector('.price').textContent.replace('Rs:', ''));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.item === item);

        if (existingItemIndex > -1) {
            if (quantity > 0) {
                cart[existingItemIndex].quantity = quantity;
            } else {
                cart.splice(existingItemIndex, 1);
            }
        } else if (quantity > 0) {
            cart.push({ item, price, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    loadCart();
});
