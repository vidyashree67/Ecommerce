// Define a function for validating category form values
const categoryValidation = (values) => {

    // Initialize an empty object to store validation errors
    let errors = {};

    // Validate the "name" field
    if (!values.name) {
        errors.name = "Category name is required.";
    }

    // Validate the "description" field
    if (!values.description) {
        errors.description = "Category description is required.";
    }

    // Return the validation errors object
    return errors;
}

// Export the category validation function for use in the application
export default categoryValidation;
