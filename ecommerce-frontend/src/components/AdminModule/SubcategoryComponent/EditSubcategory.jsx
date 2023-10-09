// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import subcategoryValidation from "../../../validations/subcategoryValidation";

// Import External Dependencies
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditSubcategory = () => {
    // Extracting the 'id' parameter from the URL using useParams
    const { id } = useParams();

    // Initialize navigation
    const navigate = useNavigate();

    // Initialize a state variable to track the active categories
    const [activeCategories, setActiveCategories] = useState([]);

    // State to hold subcategory information
    const [subcategory, setSubcategory] = useState({
        id: id,
        name: "",
        category: "",
        description: "",
        status: ""
    });

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

    // Load active categories when the component mounts
    useEffect(() => {
        // Call the function loadActiveCategories to load active categories
        loadActiveCategories();
    }, []);

    // Function to handle subcategory input changes
    const handleSubcategoryInput = (event) => {
        setSubcategory({ ...subcategory, [event.target.name]: event.target.value });
    }

    // Function to fetch and populate subcategory data for editing
    const editSubcategory = (id) => {
        axios.get(`${BASE_URL}api/subcategories/${id}/edit`)
        .then((response) => {
            // Update the state with the retrieved subcategory data
            setSubcategory({
                name: response.data.name,
                description: response.data.description,
                category: response.data.category.id,
                status: response.data.status ? "Active" : "Inactive"
            });
        });
    }

    // Fetch and populate subcategory data on component mount
    useEffect(() => {
        // Call the editSubcategory function to fetch and populate data
        editSubcategory(id);
    }, []);

    // Function to handle updating the subcategory
    const handleUpdateSubcategory = (event) => {

        // Prevent the default behavior of the event, such as form submission
        event.preventDefault();

         // Validate the subcategory data and set errors
        setErrors(subcategoryValidation(subcategory));
        
        // Set the form submission status to true
        setSubmitted(true);
    }

    // Handle subcategory update when form is submitted
    useEffect(() => {
        // Check if there are no validation errors and the form has been submitted
        if (Object.keys(errors).length === 0 && submitted) {

            // Create a new FormData object and append subcategory data
            const formData = new FormData();
            formData.append("name", subcategory.name);
            formData.append("category", subcategory.category);
            formData.append("description", subcategory.description);
            formData.append("status", subcategory.status === "Active" ? "true" : "false");

            // Perform a PUT request to update the subcategory
            axios.put(`${BASE_URL}api/subcategories/${id}/update`, formData)
            .then(() => {
                // Show success message when subcategory is updated
                toast.success("Subcategory updated successfully.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the subcategory-list page
                navigate("/subcategories");
            })
            .catch(() => {
                // Show error toast if unable to update the subcategory
                toast.error("Unable to update the subcategory..!", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the subcategory-list page
                navigate("/subcategories");
            });
        }
    }, [errors, submitted]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card shadow my-4">
                        <div className="card-header form-header">

                            {/* Update Subcategory Form Title */}
                            <h4 className="text-center">Update Subcategory</h4>
                        </div>
                        <div className="card-body">
                            <div className="container">

                                {/* Update Subcategory Form start */}
                                <form onSubmit={handleUpdateSubcategory}>

                                    {/* Name form input */}
                                    <div className="row my-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Name</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="name"
                                                value={subcategory.name}
                                                onChange={handleSubcategoryInput}
                                                className="form-control shadow-none border border-dark"
                                            />

                                            {/* Display name validation error */}
                                            {errors.name && <h6 className="text-danger mt-1">{errors.name}</h6>}

                                        </div>
                                    </div>
                                    
                                    {/* Category form input */}
                                    <div className="row mb-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Category</label>
                                        <div className="col-sm-8">
                                            <select
                                                name="category"
                                                value={subcategory.category}
                                                onChange={handleSubcategoryInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                            <option value="">Select Category</option>

                                            {/* Map through active categories to populate the dropdown options */}
                                            {activeCategories.map((category, index) => (
                                              <option
                                                key={index}
                                                value={category.id}
                                              >
                                                {category.name}
                                              </option>
                                            ))}
                                            </select>

                                            {/* Display category validation error */}
                                            {errors.category && <h6 className="text-danger mt-1">{errors.category}</h6>}
                                        </div>
                                    </div>

                                    {/* Description form input */}
                                    <div className="row mb-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Description</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                name="description"
                                                rows="4"
                                                value={subcategory.description}
                                                onChange={handleSubcategoryInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                                {subcategory.description}
                                            </textarea>

                                            {/* Display description validation error */}
                                            {errors.description && <h6 className="text-danger mt-1">{errors.description}</h6>}

                                        </div>
                                    </div>
                                    
                                    {/* Status form input */}
                                    <div className="row mb-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Status</label>
                                        <div className="col-sm-8">
                                            <select
                                                name="status"
                                                value={subcategory.status}
                                                onChange={handleSubcategoryInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                                <option value="">Select Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Update Button */}
                                    <button className="btn text-white px-4 float-end shiny-btn mb-4">
                                        Update
                                    </button>
                                </form>
                                {/* Update Subcategory Form end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the EditSubcategory component
export default EditSubcategory;
