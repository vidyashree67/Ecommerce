// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import categoryValidation from "../../../validations/categoryValidation";

// Import External Dependencies
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditCategory = () => {
    // Extracting the 'id' parameter from the URL using useParams
    const { id } = useParams();

    // Extracting the 'id' parameter from the URL using useParams
    const navigate = useNavigate();

    // State to hold category information
    const [category, setCategory] = useState({
        id: id,
        name: "",
        description: "",
        status: ""
    });

    // State to manage validation errors
    const [errors, setErrors] = useState({});

    // State to track form submission status
    const [submitted, setSubmitted] = useState(false);

    // State to track form submission status
    const handleCategoryInput = (event) => {
        setCategory({ ...category, [event.target.name]: event.target.value });
    }

    // Function to fetch and populate category data for editing
    const editCategory = (id) => {
        axios.get(`${BASE_URL}api/categories/${id}/edit`)
        .then((response) => {
            // Update the state with the retrieved category data
            setCategory({
                name: response.data.name,
                description: response.data.description,
                status: response.data.status ? "Active" : "Inactive"
            });
        });
    }

    // Fetch and populate category data on component mount
    useEffect(() => {
        // Call the editCategory function to fetch and populate data
       editCategory(id);
    }, []);

    // Function to handle updating the category
    const handleUpdateCategory = (event) => {

        // Prevent the default behavior of the event, such as form submission
        event.preventDefault();
        
        // Validate the category data and set errors
        setErrors(categoryValidation(category));
        
        // Set the form submission status to true
        setSubmitted(true);
    }

    // Handle category update when form is submitted
    useEffect(() => {
        // Check if there are no validation errors and the form has been submitted
        if (Object.keys(errors).length === 0 && submitted) {

            // Create a new FormData object and append category data
            const formData = new FormData();
            formData.append("name", category.name);
            formData.append("description", category.description);
            formData.append("status", category.status === "Active" ? true : false);

            // Perform a PUT request to update the category
            axios.put(BASE_URL + "api/categories/" + id + "/update", formData)
            .then(() => {
                // Show success message when category is updated
                toast.success("Category updated successfully.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the category-list page
                navigate("/categories");
            })
            .catch(() => {
                // Show error toast if unable to update the category
                toast.error("Unable to update the category..!", {
                    position: "top-right",
                    autoClose: 2000
                });

                // Navigate to the category-list page
                navigate("/categories");
            });
        }
    }, [errors, submitted]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card shadow my-4">
                        <div className="card-header form-header">

                            {/* Update Category Form Title */}
                            <h4 className="text-center">Update Category</h4>
                        </div>
                        <div className="card-body">
                            <div className="container">

                                {/* Update Category Form start */}
                                <form onSubmit={handleUpdateCategory}>

                                    {/* Name input field */}
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
                                            {/* Name validation error */}
                                            {errors.name && <h6 className="text-danger mt-1">{errors.name}</h6>}

                                        </div>
                                    </div>

                                    {/* Description input field */}
                                    <div className="row mb-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Description</label>
                                        <div className="col-sm-8">
                                            <textarea
                                                name="description"
                                                rows="4"
                                                value={category.description}
                                                onChange={handleCategoryInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                                {category.description}
                                            </textarea>

                                            {/* Description validation error */}
                                            {errors.description && <h6 className="text-danger mt-1">{errors.description}</h6>}

                                        </div>
                                    </div>
                                    
                                    {/* Status input field */}
                                    <div className="row mb-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Status</label>
                                        <div className="col-sm-8">
                                            <select
                                                name="status"
                                                value={category.status}
                                                onChange={handleCategoryInput}
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
                                {/* Update Category Form end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the EditCategory component
export default EditCategory;
