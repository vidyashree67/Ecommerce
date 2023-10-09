

// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal dependencies
import categoryValidation from "../../../validations/categoryValidation";

// Import External dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddCategory = () => {

    // Initialize navigation
    const navigate = useNavigate();

    // State to hold category information
    const [category, setCategory] = useState({
        name: "",
        description: ""
    });

    // State to manage validation errors
    const [errors, setErrors] = useState({});

    // State to track form submission status
    const [submitted, setSubmitted] = useState(false);

    // Function to handle category input changes
    const handleCategoryInput = (event) => {
        setCategory({ ...category, [event.target.name]: event.target.value });
    }

    // Handle the form submission to add a new category
    const handleAddCategory = (event) => {

        // Prevent the default behavior of the event, such as form submission
        event.preventDefault();

        // Validate the category data and set errors
        setErrors(categoryValidation(category));

        // Set the form submission status to true
        setSubmitted(true);
    }

    // Handle when form is submitted
    useEffect(() => {
        // Check if there are no validation errors and the form has been submitted
        if (Object.keys(errors).length === 0 && submitted) {

            // Perform API request to add a new category
            axios.post(`${BASE_URL}api/categories/add`, category)
            .then(() => {
                // Show success message when category is added
                toast.success("Category saved successfully.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the category-list page
                navigate("/categories");
            })
            .catch(() => {
                // Show error toast if unable to save the category
                toast.error("Unable to save the category..!", {
                    position: "top-right",
                    autoClose: 2000
                });

                // Navigate to the category-list page
                navigate("/categories");
            })
        }
    }, [errors, submitted]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card shadow my-5">
                        <div className="card-header form-header">

                            {/* Add Category Form Title */}
                            <h4 className="text-center">Add New Category</h4>
                        </div>
                        <div className="card-body">
                            <div className="container">

                                {/* Add Category Form start */}
                                <form onSubmit={handleAddCategory}>

                                    {/* Name form input */}
                                    <div className="row my-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Name</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="name"
                                                value={category.name}
                                                onChange={handleCategoryInput}
                                                className="form-control shadow-none border border-dark"
                                            />

                                            {/* Display name validation error */}
                                            {errors.name && <h6 className="text-danger mt-1">{errors.name}</h6>}
                                        </div>
                                    </div> 
                                    
                                    {/* Description form input */}
                                    <div className="row mb-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Description</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                name="description"
                                                rows="4"
                                                onChange={handleCategoryInput}
                                                value={category.description}
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
                                {/* Add Category Form end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the AddCategory component
export default AddCategory;