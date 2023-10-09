// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import "./Header.css";
import { GlobalInfo } from "../../../App";

// Import External Dependencies
import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {

  // Initialize navigation
  const navigate = useNavigate();

  // Initialize a state variable to track the selected categorys Id
  const [categoryId, setCategoryId] = useState(0);

  // Initialize a state variable to track the search query entered by the user
  const [search, setSearch] = useState("");

  // Get global categories from the 'GlobalInfo' context
  const { globalCategories, setGlobalCategories } = useContext(GlobalInfo);

  // Function to load all active categories
  const loadActiveCategories = () => {
    // Send a GET request to the API to retrieve active categories
    axios.get(`${BASE_URL}api/categories/active`)
    .then((response) => {
      // Update the globalCategories state with the retrieved data from the API response
      setGlobalCategories(response.data);
    });
  }

  // Load active categories when the component mounts
  useEffect(() => {
    // Call the function loadActiveCategories to load active categories
    loadActiveCategories();
  }, []);

  // Handle the form submission to search produch based on category Id
  const handleSearchProducts = (event) => {

    // Prevent the default behavior of the event
    event.preventDefault();

    // Redirect to the home page with category Id and search parameters
    navigate("/", { state: { categoryId, search } });
  }

  return (
    <div className="container-fluid p-3 d-flex justify-content-between flex-wrap">
      <div>
        {/* Display Logo */}
        <NavLink to="/">
          <img src={"/assets/logo.png"} width="180" alt="Logo" className="logo" />
        </NavLink>
      </div>
      <div className="row">
        <div className="col-11">

          {/* Product Search Bar start */}
          <form onSubmit={handleSearchProducts} className="form-inline search-form">
            <div className="row">
              {/* Product Category Dropdown */}
              <select
                name="categoryId"
                onChange={(event) => setCategoryId(event.target.value)}
                className="col-5 text-white px-3 search-category"
              >
                <option value="0" className="text-dark">
                  All Categories
                </option>

                {/* Mapping through global categories to display each category */}
                {globalCategories.map((category) => (
                  <option key={category.id} value={category.id} className="text-dark">
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Search Bar */}
              <input
                id="search"
                type="text"
                name="search"
                onChange={(event) => setSearch(event.target.value)}
                className="col-6 search-bar px-3"
                placeholder="Search Products"
              />

              {/* Search Button */}
              <div className="col-1">
                <button className="btn shadow-none text-white shiny-btn" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </form>
          {/* Product Search Bar end */}
        </div>
      </div>
      <div></div>
    </div>
  );
}

// Export the Header component
export default Header;
