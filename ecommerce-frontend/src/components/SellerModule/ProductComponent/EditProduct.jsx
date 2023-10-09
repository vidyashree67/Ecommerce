// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import productValidation from "../../../validations/productValidation";

// Import External Dependencies
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditProduct = () => {

  // Extracting the 'id' parameter from the URL using useParams
  const { id } = useParams();

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
    id: id,
    name: "",
    category: "",
    subcategory: "",
    price: "",
    brand: "",
    description: "",
    sellerId: sellerId,
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // State to track form submission status
  const [submitted, setSubmitted] = useState(false);

  // Function to load all active categories
  const loadActiveCategories = () => {
    axios.get(`${BASE_URL}api/categories/active`)
    .then((response) => {
      // Set the active brands in the state
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
      // Set the active scategories in the state
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

  // Function to fetch and populate product data for editing
  const editProduct = (id) => {
    axios.get(`${BASE_URL}api/products/${id}`)
    .then((response) => {
      // Update the state with the retrieved product data
      setProduct({
        id: response.data.id,
        name: response.data.name,
        category: response.data.category.id,
        subcategory: response.data.subcategory.id,
        price: response.data.price,
        brand: response.data.brand.id,
        description: response.data.description,
        photo: response.data.photo,
      });
    });
  }

  // Fetch and populate product data on component mount
  useEffect(() => {

    // Call the editProduct function to fetch and populate data
    editProduct(id);
  }, []);

  // Function to handle product input changes
  const handleProductInput = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  }

  // Update the list of filtered subcategories based on the selected category
  useEffect(() => {
    // Filter activeSubcategories array to get subcategories matching the selected category
    const result = activeSubcategories.filter((subcategory) => subcategory.category.id == product.category);
    
    // Update the filtered subcategories state
    setSubcategories(result);
  }, [product.category]);

  // Function to handle updating the product
  const handleUpdateProduct = (event) => {

    // Prevent the default behavior of the event, such as form submission
    event.preventDefault();

    // Validate the product data and set errors
    setErrors(productValidation(product));

    // Set the form submission status to true
    setSubmitted(true);
  }

  // Handle product update when form is submitted
  useEffect(() => {
    // Check if there are no validation errors and the form has been submitted
    if (Object.keys(errors).length === 0 && submitted) {

      // Create an updated product object with modified or unchanged properties
      const updatedProduct = {
        id: product.id,
        name: product.name,
        categoryId: product.category,
        subcategoryId: product.subcategory,
        price: product.price,
        brandId: product.brand,
        description: product.description,
        sellerId: product.sellerId,
      };

      // Perform a PUT request to update the product
      axios.put(`${BASE_URL}api/products/${id}/update`, updatedProduct)
      .then(() => {
        // Show success message when product is added
        toast.success("Product updated successfully.", {
          position: "top-right",
          autoClose: 2000
        });
        // Navigate to the product-list page
        navigate("/products");
      })
      .catch(() => {
        // Show error toast if unable to update the product
        toast.error("Unable to save the product..!", {
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
          <div className="card shadow my-4">
            <div className="card-body">
              <div className="container">

                {/* Update Product Form Title */}
                <h4 className="text-center">Update Product</h4>

                {/* Product Photo */}
                <img alt="Product" width="120" src={BASE_URL + "" + product.photo} className="mt-n3 mb-3" />

                {/* Update Product Form start */}
                <form onSubmit={handleUpdateProduct}>

                  {/* Product Name input field */}
                  <div className="row mb-3">
                    <label className="col-sm-4 form-control-label">Product Name</label>
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

                  {/* Category input field */}
                  <div className="row mb-3">
                    <label className="col-sm-4 form-control-label">Category</label>
                    <div className="col-sm-8">
                      <select
                        name="category"
                        value={product.category}
                        onChange={handleProductInput}
                        className="form-control shadow-none border border-dark"
                      >
                        <option value="">Select Category</option>
                        {activeCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {/* Display category validation error */}
                      {errors.category && <h6 className="text-danger mt-1">{errors.category}</h6>}
                    </div>
                  </div>

                  {/* Subcategory input field */}
                  <div className="row mb-3">
                    <label className="col-sm-4 form-control-label">Subcategory</label>
                    <div className="col-sm-8">
                      <select
                        name="subcategory"
                        value={product.subcategory}
                        onChange={handleProductInput}
                        className="form-control shadow-none border border-dark"
                      >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((subcategory) => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))}
                      </select>
                      {/* Display name validation error */}
                      {errors.subcategory && <h6 className="text-danger mt-1">{errors.subcategory}</h6>}
                    </div>
                  </div>

                  {/* Price input field */}
                  <div className="row mb-3">
                    <label className="col-sm-4 form-control-label">Price</label>
                    <div className="col-sm-8">
                      <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleProductInput}
                        className="form-control shadow-none border border-dark"
                      />
                      {/* Display error validation error */}
                      {errors.price && <h6 className="text-danger mt-1">{errors.price}</h6>}
                    </div>
                  </div>

                  {/* Price input field */}
                  <div className="row mb-3">
                    <label className="col-sm-4 form-control-label">Brand</label>
                    <div className="col-sm-8">
                      <select
                        name="brand"
                        value={product.brand}
                        onChange={handleProductInput}
                        className="form-control shadow-none border border-dark"
                      >
                        <option value="">Select Brand</option>
                        {activeBrands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                      {/* Display brand validation error */}
                      {errors.brand && <h6 className="text-danger mt-1">{errors.brand}</h6>}
                    </div>
                  </div>

                  {/* Description input field */}
                  <div className="row mb-3">
                    <label className="col-sm-4 form-control-label">Description</label>
                    <div className="col-sm-8">
                      <textarea
                        name="description"
                        rows="4"
                        value={product.description}
                        onChange={handleProductInput}
                        className="form-control shadow-none border border-dark"
                      >
                        {product.description}
                      </textarea>
                      {/* Display description validation error */}
                      {errors.description && <h6 className="text-danger mt-1">{errors.description}</h6>}
                    </div>
                  </div>

                  {/* Update Product Button */}
                  <button className="btn text-white px-4 float-end shiny-btn mt-3">
                    Update Product
                  </button>
                </form>
                {/* Update Product Form end */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the EditProduct component
export default EditProduct;
