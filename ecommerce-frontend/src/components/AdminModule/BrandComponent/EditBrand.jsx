// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import brandValidation from "../../../validations/brandValidation";

// Import External Dependencies
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditBrand = () => {
    // Extracting the 'id' parameter from the URL using useParams
    const { id } = useParams();

    // Extracting the 'id' parameter from the URL using useParams
    const navigate = useNavigate();

    // State to hold brand information
    const [brand, setBrand] = useState({
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
    const handleBrandInput = (event) => {
        setBrand({ ...brand, [event.target.name]: event.target.value });
    }

    // Function to fetch and populate brand data for editing
    const editBrand = (id) => {
        axios.get( `${BASE_URL}api/brands/${id}/edit`)
        .then((response) => {
            // Update the state with the retrieved brand data
            setBrand({
                name: response.data.name,
                description: response.data.description,
                status: response.data.status ? "Active" : "Inactive"
            });
        });
    }

    // Fetch and populate brand data on component mount
    useEffect(() => {
        // Call the editBrand function to fetch and populate data
       editBrand(id);
    }, []);

    // Function to handle updating the brand
    const handleUpdateBrand = (event) => {

        // Prevent the default behavior of the event, such as form submission
        event.preventDefault();
        
        // Validate the brand data and set errors
        setErrors(brandValidation(brand));
        
        // Set the form submission status to true
        setSubmitted(true);
    }

    // Handle brand update when form is submitted
    useEffect(() => {
        // Check if there are no validation errors and the form has been submitted
        if (Object.keys(errors).length === 0 && submitted) {

            // Create a new FormData object and append brand data
            const formData = new FormData();
            formData.append("name", brand.name);
            formData.append("description", brand.description);
            formData.append("status", brand.status === "Active" ? true : false);

            // Perform a PUT request to update the brand
            axios.put(`${BASE_URL}api/brands/${id}/update`, formData)
            .then(() => {
                // Show success message when brand is updated
                toast.success("Brand updated successfully.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Navigate to the brand-list page
                navigate("/brands");
            })
            .catch(() => {
                // Show error toast if unable to update the brand
                toast.error("Unable to update the brand..!", {
                    position: "top-right",
                    autoClose: 2000
                });

                // Navigate to the brand-list page
                navigate("/brands");
            });
        }
    }, [errors, submitted]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card shadow my-4">
                        <div className="card-header form-header">

                            {/* Update Brand Form Title */}
                            <h4 className="text-center">Update Brand</h4>
                        </div>
                        <div className="card-body">
                            <div className="container">

                                {/* Update Brand Form start */}
                                <form onSubmit={handleUpdateBrand}>

                                    {/* Name input field */}
                                    <div className="row my-4">
                                        <label className="col-sm-4 form-control-label fw-bold">Name</label>
                                        <div className="col-sm-8">
                                            <input
                                                type="text"
                                                name="name"
                                                value={brand.name}
                                                onChange={handleBrandInput}
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
                                                value={brand.description}
                                                onChange={handleBrandInput}
                                                className="form-control shadow-none border border-dark"
                                            >
                                                {brand.description}
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
                                                value={brand.status}
                                                onChange={handleBrandInput}
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
                                {/* Update Brand Form end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the EditBrand component
export default EditBrand;
