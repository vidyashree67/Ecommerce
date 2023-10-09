// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import axios from "axios";

// Fetch products based on a specific subcategory
const FilterProductsBySubcategory = (subcategory, setProducts) => {

    // Make a GET request to fetch products of a specific subcategory
    axios.get(`${BASE_URL}api/products/categories?subcategoryId=${subcategory}`)
    .then((response) => {

        // Update the products state
        setProducts(response.data.data);
    });
}

// Export the FilterProductsBySubcategory component
export default FilterProductsBySubcategory;
