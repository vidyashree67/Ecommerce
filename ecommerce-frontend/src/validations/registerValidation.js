// Define a function for validating registration form values
const registerValidation = (values) => {
    
    // Initialize an empty object to store validation errors
    let errors = {};

    // Validate the "name" field
    if (!values.name) {
        errors.name = "Name is required.";
    }

    // Validate the "email" field
    if (!values.email) {
        errors.email = "Email Address is required.";
    }

    // Validate the "phone" field
    if (!values.phone) {
        errors.phone = "Phone No is required.";
    }

    // Validate the "password" field
    if (!values.password) {
        errors.password = "Password is required.";
    }

    // Validate the "confirmPassword" field
    if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required.";
    }

    // Validate the "gender" field
    if (!values.gender) {
        errors.gender = "Gender is required.";
    }

    // Validate the "city" field
    if (!values.city) {
        errors.city = "City is required.";
    }
    
    // Check if password and confirm password match
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password does not match.";
    }

    // Return the validation errors object
    return errors;
}

// Export the registration validation function for use in the application
export default registerValidation;
