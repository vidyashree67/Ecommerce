// Constants
import { BASE_URL } from "../../../constants/constants";

// Internal Dependencies
import { GlobalInfo } from "../../../App";

// External Dependencies
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BrandList = () => {
    // State for the list of brands
    const [brands, setBrands] = useState([]);
    
    // Access the global context to set the list of active brands
    const {setGlobalBrands} = useContext(GlobalInfo);

    // Function to load all brands
    const loadBrands = () => {
        axios.get(`${BASE_URL}api/brands`)
        .then(response => {

            // Set the list of brands in the state
            setBrands(response.data);
        });
    }

    // Function to load all active brands
    const loadActiveBrands = () => {
        axios.get(`${BASE_URL}api/brands/active`)
        .then(response => {

            // Set the list of active brands in the global context
            setGlobalBrands(response.data);
        });
    }

    // Load brands and active brands when the component mounts
    useEffect(() => {

        // Call the loadBrands function to load brands
        loadBrands();

        // Call the loadActiveBrands function to load active brands
        loadActiveBrands();
    }, []);
    
    return (
        <div className="container-fluid px-5">
            <div className="card shadow mt-3 mb-5">
                <div className="card-header bg-white">

                    {/* Brand List Table Title */}            
                    <h4 className="float-start">Brand List</h4>
                    
                    {/* Add Brand Button */}
                    <Link
                        to="/brands/add"
                        className="btn text-white fw-bold shadow-none float-end px-4 mb-2 shiny-btn"
                    >
                        <i className="fa-solid fa-plus ms-1"></i> Add Brand
                    </Link>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="table-responsive">

                                {/* Brand List Table start */}
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Action</th>                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {/* Mapping through brands to display each brand */}
                                    {brands.map((brand, index)=>(
                                        <tr key={index}>
                                            {/* Brand Id */}
                                            <td>{brand.id}</td>

                                            {/* Brand Name */}
                                            <td>{brand.name}</td>

                                            {/* Brand Description */}
                                            <td>{brand.description}</td>
                                            
                                            {/* Displaying brand status badge */}
                                            <td>{brand.status ? 
                                                <span className="badge bg-success px-2">Active</span> : 
                                                <span className="badge bg-danger px-2">Inactive</span>}
                                            </td>
                                            <td>
                                                {/* Edit Brand Button */}
                                                <Link to={`/brands/${brand.id}/edit/`} className="btn btn-primary btn-sm shadow-none me-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </td>                                
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {/* Brand List Table end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the BrandList component
export default BrandList;