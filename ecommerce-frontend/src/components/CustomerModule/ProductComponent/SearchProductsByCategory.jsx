// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import axios from "axios";

// Function to search products by category and search keyword
const SearchProductsByCategory = (categoryId, search, setProducts) => {

    // Make a API request to fetch products with a specific category and search keyword
    axios.get(`${BASE_URL}api/products/search?categoryId=${categoryId}&search=${search}`)
    .then((response) => {
        // Update the products state
        setProducts(response.data.data);
    });
};

// Export the SearchProductsByCategory component
export default SearchProductsByCategory;
