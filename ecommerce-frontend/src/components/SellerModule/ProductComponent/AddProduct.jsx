// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import productValidation from "../../../validations/productValidation";

// Import External Dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = () => {
    // Initialize navigation
    const navigate = useNavigate();
    
    // Get the seller ID from local storage
    const sellerId = localStorage.getItem("id");
    
    // Initialize a state variable to track the active categories
    const [activeCategories, setActiveCategories] = useState([]);

    // Initialize a state variable to track the active subcategories
    const [activeSubcategories, setActiveSubcategories] = useState([]);

    // Initialize a state variable to track the active brands
    const [activeBrands, setActiveBrands] = useState([]);

    // Initialize state to track the list of filtered subcategories based on the selected category
    const [subcategories, setSubcategories] = useState([]);

    // State to hold product information
    const [product, setProduct] = useState({
        name: "",
        category: "",
        subcategory: "",
        price: "",
        brand: "",
        description: "",
        sellerId: sellerId
    });

    // Initialize state to manage the selected product photo (file)
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // State to manage validation errors
    const [errors, setErrors] = useState({});

    // State to track form submission status
    const [submitted, setSubmitted] = useState(false);

    // Function to load all active categories
    const loadActiveCategories = () => {
        axios.get(`${BASE_URL}api/categories/active`)
        .then((response) => {
            // Set the active categories in the state
            setActiveCategories(response.data);
        });
    }

    // Function to load all active subcategories
    const loadActiveSubcategories = () => {
        axios.get(`${BASE_URL}api/subcategories/active`)
        .then((response) => {
            // Set the active subcategories in the state
            setActiveSubcategories(response.data);
        });
    }

    // Function to load all active brands
    const loadActiveBrands = () => {
        axios.get(`${BASE_URL}api/brands/active`)
        .then((response) => {
            // Set the active brands in the state
            setActiveBrands(response.data);
        });
    }

    // Load active categories, active subcategories and active brands when the component mounts
    useEffect(() => {
        // Call the function loadActiveCategories to load active categories
        loadActiveCategories();

        // Call the function loadActiveSubcategories to load active subcategories
        loadActiveSubcategories();

        // Call the function loadActiveBrands to load active brands
        loadActiveBrands();
    }, []);

    // Function to handle product input changes
    const handleProductInput = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    // Function to handle file input changes
    const handleFileInput = (event) => {
        setSelectedPhoto(event.target.files[0]);
    }

    // Update the list of filtered subcategories based on the selected category
    useEffect(() => {
        // Filter activeSubcategories array to get subcategories matching the selected category
        const result = activeSubcategories.filter((subcategory) => subcategory.category.id == product.category);

        // Update the filtered subcategories state
        setSubcategories(result);
    }, [product.category]);

    // Handle the form submission to add a new product
    const handleAddProduct = (event) => {

        // Prevent the default behavior of the event, such as form submission
        event.preventDefault();

        // Validate the product data and set errors
        setErrors(productValidation(product));

        // Set the form submission status to true
        setSubmitted(true);
    }

    // Handle when form is submitted
    useEffect(() => {
        // Check if there are no validation errors and the form has been submitted
        if (Object.keys(errors).length === 0 && submitted) {

            // Create a new FormData object and append product data
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("categoryId", product.category);
            formData.append("subcategoryId", product.subcategory);
            formData.append("price", product.price);
            formData.append("brandId", product.brand);
            formData.append("description", product.description);
            formData.append("sellerId", sellerId);
            formData.append("photo", selectedPhoto);

            // Perform API request to add a new product
            axios.post(`${BASE_URL}api/products/add`, formData)
            .then(() => {
                // Show success message when product is added
                toast.success("Product saved successfully.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the product-list page
                navigate("/products");
            })
            .catch(() => {
                // Show error toast if unable to save the product
                toast.error("Error saving product.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the product-list page
                navigate("/products");
            });
        }
    }, [errors, submitted]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-7 mx-auto">
                    <div className="card shadow my-5">
                        <div className="card-header form-header">

                            {/* Add Product Form Title */}
                            <h4 className="text-center">Add Product Form</h4>
                        </div>
                        <div className="card-body">
                            <div className="container">

                                {/* Add Product Form start */}
                                <form onSubmit={handleAddProduct} encType="multipart/form-data">

                                    {/* Product Name form input */}
                                    <div className="row my-3">
                                        <label className="col-sm-4 form-control-label fw-bold">Product Name</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="name"
                                                value={product.name}
                                                onChange={handleProductInput}
                                                className="form-control shadow-none border border-dark"
                                            />
                                            {/* Display name validation error */}
                                            {errors.name && <h6 className="text-danger mt-1">{errors.name}</h6>}
                                        </div>
                                    </div>

                                    {/* Category form input */}
                                    <div className="row mb-3">
                                        <label className="col-sm-4 form-control-label fw-bold">Category</label>
                                        <div className="col-sm-8">
                                            <select
                                                name="category"
                                                value={product.category}
                                                onChange={handleProductInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                                <option value="">Select Category</option>

                                                {/* Map through active categories to populate the dropdown options */}
                                                {activeCategories.map(category => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))}   
                                            </select>
                                            {/* Display category validation error */}  
                                            {errors.category && <h6 className="text-danger mt-1">{errors.category}</h6>}                   
                                        </div>                        
                                    </div>

                                    {/* Subcategory form input */}
                                    <div className="row mb-3">
                                        <label className="col-sm-4 form-control-label fw-bold">Subcategory</label>
                                        <div className="col-sm-8">
                                            <select
                                                name="subcategory"
                                                value={product.subcategory}
                                                onChange={handleProductInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                                <option value="">Select Sub Category</option>
                                                
                                                {/* Map through active subcategories to populate the dropdown options */}
                                                {subcategories.map(x => (
                                                    <option key={x.id} value={x.id}>{x.name}</option>
                                                ))}                                                 
                                            </select>
                                            {/* Display subcategory validation error */}
                                            {errors.subcategory && <h6 className="text-danger mt-1">{errors.subcategory}</h6>}                      
                                        </div>                        
                                    </div>

                                    {/* price form input */}
                                    <div className="row mb-3">
                                        <label className="col-sm-4 form-control-label fw-bold">Price</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="number"
                                                name="price"
                                                value={product.price}
                                                onChange={handleProductInput}
                                                className="form-control shadow-none border border-dark"
                                            />
                                            {/* Display price validation error */}  
                                            {errors.price && <h6 className="text-danger mt-1">{errors.price}</h6>}
                                        </div>                                
                                    </div>

                                    {/* Brand form input */}
                                    <div className="row mb-3">
                                        <label className="col-sm-4 form-control-label fw-bold">Brand</label>
                                        <div className="col-sm-8">
                                            <select
                                                name="brand"
                                                value={product.brand}
                                                onChange={handleProductInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                                <option value="">Select Brand</option>

                                                {/* Map through active brands to populate the dropdown options */}
                                                {activeBrands.map(x=>(
                                                    <option key={x.id} value={x.id}>{x.name}</option>
                                                ))}   
                                            </select>
                                            {/* Display brand validation error */}    
                                            {errors.brand && <h6 className="text-danger mt-1">{errors.brand}</h6>}               
                                        </div>                        
                                    </div>

                                    {/* Description form input */}
                                    <div className="row mb-3">
                                        <label className="col-sm-4 form-control-label fw-bold">Description</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                name="description"
                                                rows="4"
                                                onChange={handleProductInput}
                                                value={product.description}
                                                className="form-control shadow-none border border-dark">
                                            </textarea>
                                            {/* Display description validation error */}  
                                            {errors.description && <h6 className="text-danger mt-1">{errors.description}</h6>}             
                                        </div>                                
                                    </div>

                                    {/* Photo form input */}
                                    <div className="row mb-3">
                                        <label className="col-sm-4 form-control-label fw-bold">Photo</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="file"
                                                name="photo"
                                                required
                                                value={product.photo}
                                                onChange={handleFileInput}
                                                className="form-control-file"
                                            />                                    
                                        </div>                     
                                    </div>

                                    {/* Add product Button */}
                                    <button className="btn text-white fw-bold shadow-none float-end px-4 mb-2 shiny-btn">
                                        Add Product
                                    </button>
                                </form>
                                {/* Add Product Form end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the AddProduct component
export default AddProduct;
