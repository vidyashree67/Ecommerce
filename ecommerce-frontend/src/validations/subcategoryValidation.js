// Define a function for validating subcategory form values
const subcategoryValidation = (values) => {
    
    // Initialize an empty object to store validation errors
    let errors = {};

    // Validate the "name" field
    if (!values.name) {
        errors.name = "Subcategory name is required.";
    }

    // Validate the "category" field
    if (!values.category) {
        errors.category = "Category should be selected.";
    }

    // Validate the "description" field
    if (!values.description) {
        errors.description = "Subcategory description is required.";
    }

    // Return the validation errors object
    return errors;
}

// Export the subcategory validation function for use in the application
export default subcategoryValidation;
