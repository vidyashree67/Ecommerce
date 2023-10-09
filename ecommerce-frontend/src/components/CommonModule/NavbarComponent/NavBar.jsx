// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import "./NavBar.css";
import RoleNavbar from "./RoleNavbar";
import { GlobalInfo } from "../../../App";

// Import External Dependencies
import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";

const NavBar = () => {

    // Accessing global state
    const state = useSelector((state) => state);

    // Accessing global context
    const {globalCategories, setGlobalCategories, globalSubcategories, setGlobalSubcategories} = useContext(GlobalInfo);

    // Function to load all active categories
    const loadActiveCategories = () => {
        // Send a GET request to the API to retrieve all active categories
        axios.get(`${BASE_URL}api/categories/active`)
        .then((response) => {
            // Update the globalCategories state with the retrieved data from the API response
            setGlobalCategories(response.data);
        })
    }

    // Function to load all active subcategories
    const loadActiveSubcategories = () => {
        // Send a GET request to the API to retrieve all active subcategories
        axios.get(`${BASE_URL}api/subcategories/active`)
        .then((response)=>{
            // Update the globalSubcategories state with the retrieved data from the API response
            setGlobalSubcategories(response.data);
        });
    }

    // Load active categories and subcategories when the component mounts
    useEffect(()=>{
        // Call the function loadActiveCategories to load active categories
        loadActiveCategories();

        // Call the function loadActiveCategories to load active subcategories
        loadActiveSubcategories();
    },[]);

    return (
    <>
        {/* Navbar start */}
        <nav className="navbar navbar-expand-lg navbar-dark position-sticky px-2">
            <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">

                    {/* Home Link */}
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>

                    {/* Mapping through global categories to display each category */}
                    {globalCategories.map((category) => (
                        <li className="nav-item dropdown" key={category.id}>
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {category.name}
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            
                            {/* Filtering and mapping through global subcategories to display each subcategory within the current category */}
                            {globalSubcategories.filter((subcategory) => subcategory.category.id === category.id).map((subcategoryItem) => (
                                <li key={subcategoryItem.id}>

                                    {/* Link to navigate to the specific subcategory */}
                                    <NavLink className="dropdown-item" to={`/categories/${subcategoryItem.id}`}>
                                        {subcategoryItem.name}
                                    </NavLink>
                                </li>
                            ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                {/* Rendering the navigation bar component with role-specific options based on user login status */}
                <RoleNavbar isLoggedIn={state.loggedin.IsLoggedIn} />
            </div>
        </nav>
        {/* Navbar end */}
    </>
    );
}

// Export the NavBar component
export default NavBar;
