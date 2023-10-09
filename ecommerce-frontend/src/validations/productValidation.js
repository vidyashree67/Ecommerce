// Define a function for validating product form values
const productValidation = (values) => {
    
    // Initialize an empty object to store validation errors
    let errors = {};

    // Validate the "name" field
    if (!values.name) {
        errors.name = "Product Name is required.";
    }

    // Validate the "category" field
    if (!values.category) {
        errors.category = "Category is required.";
    }

    // Validate the "subcategory" field
    if (!values.subcategory) {
        errors.subcategory = "Subcategory is required.";
    }

    // Validate the "price" field
    if (!values.price) {
        errors.price = "Price is required.";
    }

    // Validate the "brand" field
    if (!values.brand) {
        errors.brand = "Brand Name is required.";
    }

    // Validate the "description" field
    if (!values.description) {
        errors.description = "Product Description is required.";
    }

    // Return the validation errors object
    return errors;
}

// Export the product validation function for use in the application
export default productValidation;
