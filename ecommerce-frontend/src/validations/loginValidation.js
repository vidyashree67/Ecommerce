// Define a function for validating login form values
const loginValidation = (values) => {
    
    // Initialize an empty object to store validation errors
    let errors = {};

    // Validate the "email" field
    if (!values.email) {
        errors.email = "Email Address is required.";
    }

    // Validate the "password" field
    if (!values.password) {
        errors.password = "Password is required.";
    }

    // Return the validation errors object
    return errors;
}

// Export the login validation function for use in the application
export default loginValidation;
