// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import { GlobalInfo } from "../../../App";

// Import External Dependencies
import {  useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SubcategoryList = () => {
    // State for the list of subcategories
    const [subcategories, setSubcategories]=useState([])
    
    // Access the global context to set the list of active subcategories
    const {setGlobalSubcategories} = useContext(GlobalInfo)

    // Function to load all subcategories
    const loadSubcategories = () => {
        axios.get(`${BASE_URL}api/subcategories`)
        .then(response=>{
            
            // Set the list of subcategories in the state
            setSubcategories(response.data)
        })
    }

    // Function to load all active subcategories
    const loadActiveSubcategories = ()=>{
        axios.get(`${BASE_URL}api/subcategories/active`)
        .then(response=>{
            
            // Set the list of active subcategories in the global context
            setGlobalSubcategories(response.data)
        })
    }

    // Load subcategories and active subcategories when the component mounts
    useEffect(() => {
        // Call the loadSubcategories function to load subcategories
        loadSubcategories()

        // Call the loadActiveSubcategories function to load active subcategories
        loadActiveSubcategories()
    }, [])
    
    return (
        <div className="container-fluid px-5">
            <div className="card shadow mt-3 mb-5">
                <div className="card-header bg-white">

                    {/* Subcategory List Table Title */}
                    <h4 className="float-start">Subcategory List</h4>

                    {/* Add Subcategory Button */}
                    <Link
                        to="/subcategories/add"
                        className="btn text-white fw-bold shadow-none float-end px-4 mb-2 shiny-btn"
                    >
                        <i className="fa-solid fa-plus ms-1"></i> Add Subcategory
                    </Link>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="table-responsive">

                                {/* Subcategory List Table start */}
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Action</th>                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {/* Mapping through subcategories to display each subcategory */}
                                    {subcategories.map((subcategory, index)=>(
                                        <tr key={index}>
                                            {/* Subcategory Id */}
                                            <td>{subcategory.id}</td>
                                            
                                            {/* Subcategory Name */}
                                            <td>{subcategory.name}</td>
                                            
                                            {/* Subcategory Category Name */}
                                            <td>{subcategory.category.name}</td>
                                            
                                            {/* Subcategory Description */}
                                            <td>{subcategory.description}</td>
                                            
                                            {/* Displaying subcategory status badge */}
                                            <td>{subcategory.status ? 
                                                <span className="badge bg-success px-2">Active</span> : 
                                                <span className="badge bg-danger px-2">Inactive</span>}
                                            </td>
                                            <td>
                                                {/* Edit Subcategory Button */}
                                                <Link to={`/subcategories/${subcategory.id}/edit/`} className="btn btn-primary btn-sm shadow-none me-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                            </td>                                
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {/* Subcategory List Table end */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the SubcategoryList component
export default SubcategoryList;