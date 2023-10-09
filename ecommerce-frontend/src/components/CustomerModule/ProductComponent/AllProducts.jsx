// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import ProductCard from "./ProductCard";
import TopSlider from "../../CommonModule/SliderComponent/TopSlider";
import Footer from "../../CommonModule/FooterComponent/Footer";
import FilterProductsBySubcategory from "./FilterProductsBySubcategory";
import SearchProductsByCategory from "./SearchProductsByCategory";

// Import External Dependencies
import { useEffect, useState } from "react";
import {useLocation,useParams} from "react-router-dom";
import axios from "axios";

const AllProducts = () => {

  // Get the current location object
  const location = useLocation();

  // Get the 'subcategory' parameter from the URL
  const {subcategory} = useParams();

  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // State to control the visibility of slider
  const [showSlider, setShowSlider] = useState(true);

  // State to control the visibility of footer
  const [showFooter, setShowFooter] = useState(true);

  // Function to fetch and show all products
  const showAllProducts = (page=0, pagesize=20) => {

    // Function to fetch and show all products
    axios.get(`${BASE_URL}api/products/paginated?page=${page}&pageSize=${pagesize}`)
    .then(response=>{
      // Function to fetch and show all products
      setProducts(response.data.data.productList);
    });
  }

  // Handle changes in subcategory and location state
  useEffect(()=>{
    // Check if a specific subcategory is selected
    if(subcategory !== undefined) {

      // Filter and show products based on the selected subcategory
      FilterProductsBySubcategory(subcategory, setProducts);

      // Hide the slider and footer when showing products based on a specific subcategory
      setShowSlider(false);
      setShowFooter(false);
    }

    // Check if location state is not null
    else if(location.state != null) {
      const { categoryId, search } = location.state;

      // Search and show products based on category and search keyword
      SearchProductsByCategory(categoryId, search, setProducts);

      // Hide the slider and footer when showing search results
      setShowSlider(false);
      setShowFooter(false);
    }

    // If there is no specific subcategory or search keyword, show all products
    else {
      showAllProducts();

      // Show the slider and footer when displaying all products
      setShowSlider(true);
      setShowFooter(true);
    }

  },[subcategory, location.state]);

  return (
    <>
    {/* Conditionally render TopSlider component based on showSlider state */}
    {showSlider ? <TopSlider/>:null}

    {/* Container for displaying products */}            
    <div className="container-fluid" style={{width:"85%"}}>

      {/* Check if there are no products */}
      {products.length === 0 ? (
        <h3 className="mt-4">No Products available</h3>
      ):(
      
      // Render products if there are products in the list
      <div className="row">

        {/* Mapping through all products to display each product */}
        {products.map(product=>(

          // Render a ProductCard component for each product
          <ProductCard key={product.id} product={product} />
        ))}
      </div> 
      )}
    </div>
    {/* Conditionally render Footer component based on showFooter state */}
    {showFooter ? <Footer/>:null}
    </>
  );
}

// Export the AllProducts component
export default AllProducts;