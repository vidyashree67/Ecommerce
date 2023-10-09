// Constants
import { BASE_URL } from "../../../constants/constants";

// Internal Dependencies
import { GlobalInfo } from "../../../App";

// External Dependencies
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
    // State for the list of categories
    const [categories, setCategories] = useState([]);
    
    // Access the global context to set the list of active categories
    const {setGlobalCategories} = useContext(GlobalInfo);

    // Function to load all categories
    const loadCategories = () => {
        axios.get(`${BASE_URL}api/categories`)
        .then(response => {

            // Set the list of categories in the state
            setCategories(response.data);
        });
    }

    // Function to load all active categories
    const loadActiveCategories = () => {
        axios.get(`${BASE_URL}api/categories/active`)
        .then(response => {

            // Set the list of active categories in the global context
            setGlobalCategories(response.data);
        });
    }

    // Load categories and active categories when the component mounts
    useEffect(() => {

        // Call the loadCategories function to load categories
        loadCategories();

        // Call the loadActiveCategories function to load active categories
        loadActiveCategories();
    }, []);
    
    return (
        <div className="container-fluid px-5">
            <div className="card shadow mt-3 mb-5">
                <div className="card-header bg-white">

                    {/* Category List Table Title */}            
                    <h4 className="float-start">Category List</h4>
                    
                    {/* Add Category Button */}
                    <Link
                        to="/categories/add"
                        className="btn text-white fw-bold shadow-none float-end px-4 mb-2 shiny-btn"
                    >
                        <i className="fa-solid fa-plus ms-1"></i> Add Category
                    </Link>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="table-responsive">

                                {/* Category List Table start */}
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
                                    {/* Mapping through categories to display each category */}
                                    {categories.map((category, index)=>(
                                        <tr key={index}>

                                            {/* Category Id */}
                                            <td>{category.id}</td>

                                            {/* Category Name */}
                                            <td>{category.name}</td>

                                            {/* Category Description */}
                                            <td>{category.description}</td>
                                            
                                            {/* Displaying category status badge */}
                                            <td>{category.status ? 
                                                <span className="badge bg-success px-2">Active</span> : 
                                                <span className="badge bg-danger px-2">Inactive</span>}
                                            </td>
                                            <td>
                                                {/* Edit Category Button */}
                                                <Link to={`/categories/${category.id}/edit/`} className="btn btn-primary btn-sm shadow-none me-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </td>                                
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {/* Category List Table end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the CategoryList component
export default CategoryList;