document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const location = document.getElementById('location').value.trim();

    const errorMessage = document.getElementById('error-message');

    // Basic client-side validation
    if (!name || !email || !password) {
        errorMessage.textContent = 'Please fill in all required fields.';
        return;
    }

    // Example of additional checks or processing
    if (!validateEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // Assuming validation is successful
    errorMessage.textContent = '';
    alert('Signup successful!');

    // Clear form fields
    document.getElementById('signup-form').reset();
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
