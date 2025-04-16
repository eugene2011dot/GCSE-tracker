// Wait for the page to load fully before executing the login script
window.addEventListener('load', function () {

    // Check if we are on the login page
    if (window.location.href === 'https://beehive.lionhearttrust.org.uk/#/main/assignments') {

        // Target the login form and its input fields (example selectors, these may vary)
        const usernameField = document.querySelector('input[name="username"]'); // Replace with the correct name or id of the field
        const passwordField = document.querySelector('input[name="password"]'); // Replace with the correct name or id of the field
        const submitButton = document.querySelector('button[type="submit"]'); // Replace with the correct selector for the submit button

        // Check if the fields exist before proceeding
        if (usernameField && passwordField && submitButton) {
            // Fill in the credentials
            usernameField.value = 'abc123';
            passwordField.value = '123423';

            // Submit the form (this will trigger the form's submit event)
            submitButton.click();
        } else {
            console.log('Form elements not found. Please check the selectors.');
        }
    }

});
