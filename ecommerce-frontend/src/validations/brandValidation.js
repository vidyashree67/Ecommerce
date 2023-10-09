// Define a function for validating brand form values
const brandValidation = (values) => {

    // Initialize an empty object to store validation errors
    let errors = {};

    // Validate the "name" field
    if (!values.name) {
        errors.name = "Brand name is required.";
    }

    // Validate the "description" field
    if (!values.description) {
        errors.description = "Brand description is required.";
    }

    // Return the validation errors object
    return errors;
}

// Export the brand validation function for use in the application
export default brandValidation;
