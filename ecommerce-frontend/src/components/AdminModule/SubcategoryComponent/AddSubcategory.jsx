// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal dependencies
import subcategoryValidation from "../../../validations/subcategoryValidation";

// Import External dependencies
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddSubcategory = () => {
    // Initialize navigation
    const navigate = useNavigate();

    // Initialize a state variable to track the active categories
    const [activeCategories, setActiveCategories] = useState([]);

    // State to hold subcategory information
    const [subcategory, setSubcategory] = useState({
        name: "",
        category: "",
        description: ""
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
        })
    }

    // Load active categories when the component mounts
    useEffect(() => {
        // Call the function to load active categories
        loadActiveCategories();
    }, []);

    // Function to handle subcategory input changes
    const handleSubcategoryInput = (event) => {
        setSubcategory({ ...subcategory, [event.target.name]: event.target.value });
    }

    // Handle the form submission to add a new subcategory
    const handleAddSubcategory = (event) => {

        // Prevent the default behavior of the event, such as form submission
        event.preventDefault();

        // Validate the subcategory data and set errors
        setErrors(subcategoryValidation(subcategory));

        // Set the form submission status to true
        setSubmitted(true);
    }

    // Handle when form is submitted
    useEffect(() => {
        // Check if there are no validation errors and the form has been submitted
        if (Object.keys(errors).length === 0 && submitted) {

            // Create a data object for the new subcategory, including its category ID
            const data = {
                ...subcategory,
                category: { id: subcategory.category }
            };

            // Perform API request to add a new subcategory
            axios.post(`${BASE_URL}api/subcategories/add`, data)
            .then(() => {
                // Show success message when subcategory is added
                toast.success("Subcategory saved successfully.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the subcategory-list page
                navigate("/subcategories");
            })
            .catch(() => {
                // Show error toast if unable to save the subcategory
                toast.error("Unable to save the subcategory..!", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the subcategory-list page
                navigate("/subcategories");
            })
        }
    }, [errors, submitted]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card shadow my-5">
                        <div className="card-header form-header">

                            {/* Add Subcategory Form Title */}
                            <h4 className="text-center">Add New Subcategory</h4>
                        </div>
                        <div className="card-body">
                            <div className="container">

                                {/* Add Subcategory Form start */}
                                <form onSubmit={handleAddSubcategory}>

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
                                    <div className="row my-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Category</label>
                                        <div className="col-sm-8">
                                            <select
                                                name="category"
                                                value={subcategory.category}
                                                onChange={handleSubcategoryInput}
                                                className="form-select shadow-none border border-dark"
                                            >
                                                <option>Select Category</option>

                                                {/* Map through active categories to populate the dropdown options */}
                                                {activeCategories.map(category=>(
                                                    <option key={category.id} value={category.id}>{category.name}</option>
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
                                                onChange={handleSubcategoryInput}
                                                value={subcategory.description}
                                                className="form-control shadow-none border border-dark">
                                            </textarea>
                                            {/* Display description validation error */}
                                            {errors.description && <h6 className="text-danger mt-1">{errors.description}</h6>}             
                                        </div>                                
                                    </div>

                                    {/* Save Button */}
                                    <button type="submit" className="btn text-white fw-bold shadow-none float-end px-4 mb-4 shiny-btn">
                                        Save
                                    </button>
                                </form>
                                {/* Add Subcategory Form end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the AddSubcategory component
export default AddSubcategory;
