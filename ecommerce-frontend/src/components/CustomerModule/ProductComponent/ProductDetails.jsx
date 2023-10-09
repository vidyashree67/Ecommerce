// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Internal Dependencies
import "./Product.css";
import Footer from "../../CommonModule/FooterComponent/Footer";

// External dependencies
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetails = () => {

  // Initialize Redux dispatch
  const dispatch = useDispatch();

  // Initialize navigation
  const navigate = useNavigate();
  
  // Extracting the 'id' parameter from the URL using useParams
  const { id } = useParams();

  // State to hold product details
  const [product, setProduct] = useState({});

  // Function to load product details from the server based on the given 'id'
  const loadProductDetails = (id) => {

    // Use 'isMounted' flag to avoid state updates on unmounted component
    let isMounted = true;

    // API request to fetch product details
    axios.get(`${BASE_URL}api/products/${id}`)
    .then((response) => {
      // Update state only if mounted
      if(isMounted) {
        setProduct(response.data);
      }
    });
  }

  // Fetch product details when the component mounts
  useEffect(() => {
    // Call the function loadProductDetails to load the details of the product
    loadProductDetails(id);
  }, []);

  // Function to handle adding the product to the cart
  const handleAddToCart = (event) => {

    // Prevent the default behavior of the event
    event.preventDefault();

    // Check if the customer is logged in
    if (localStorage.getItem("email") == null) {

      // Show error toast if the customer is not logged in
      toast.error("Please login first to buy the product.", {
        position: "top-right",
        autoClose: 2000
      });
      // Navigate to customer login page
      navigate("/customers/login");
    }
    // Check if the user has the role of 'customer'
    else if (localStorage.getItem("role") !== "customer") {

      // Show error toast if there is the user has any other role
      toast.error("Only customers can buy products.", {
        position: "top-right",
        autoClose: 2000
      });
    }
    else {
      // Prepare the item to be added to the cart
      const item = { ...product };
      item.quantity = 1;
      item.id = id;
    
      // Prepare cart item data
      let cartItem = {
        customerId: parseInt(localStorage.getItem("id")),
        productId: parseInt(id),
        quantity: 1,
      };
  
      // Send a POST request to add item to the cart
      axios.post(BASE_URL + "api/cart/add", cartItem)
      .then(() => {
        // Dispatch an action to add item to the cart in Redux
        dispatch({ type: "AddItem", payload: item });

        // Show success message when the item is added to the cart
        toast.success("Product added to the cart successfully.", {
          position: "top-right",
          autoClose: 2000
        });
      })
      .catch(() => {
        // Show error toast if the customer cannot add item to the cart
        toast.error("Unable to add item to cart..!", {
          position: "top-right",
          autoClose: 2000
        });
      });
    } 
  }

  return (
    <div className="pt-4" style={{ background: "#eee" }}>
      <div className="container bg-white py-4">
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center mb-3" key={product.id}>
            {/* Product Photo */}
            <img
              alt="Product"
              style={{ height: "65vh" }}
              src={BASE_URL + product.photo}
              className="img-thumnail mt-3"
            />
          </div>
          <div className="col-lg-6">

            {/* Product Information */}
            <div className="container p-3">

              {/* Product Name */}
              <h3 className="fw-bold">{product.name}</h3>

              {/* Product Price */}
              <h1 className="fw-bold mb-4">&#8377; {product.price}</h1>

              {/* Product Details */}
              <h3 className="text-secondary fw-bold mb-3">Product Details</h3>
              <table className="mb-4">
                <tbody>
                  {/* Product Brand Name */}
                  <tr className="mb-3">
                    <td>
                      <h5 className="text-secondary fw-bold me-5">Brand</h5>
                    </td>
                    <td>
                      <h5>{product?.brand?.name}</h5>
                    </td>
                  </tr>

                  {/* Product Category Name */}
                  <tr className="mb-3">
                    <td>
                      <h5 className="text-secondary fw-bold me-5">Category</h5>
                    </td>
                    <td>
                      <h5>{product?.category?.name}</h5>
                    </td>
                  </tr>
                  {/* Product Subcategory Name */}
                  <tr className="mb-3">
                    <td>
                      <h5 className="text-secondary fw-bold me-5">Sub-Category</h5>
                    </td>
                    <td>
                      <h5>{product?.subcategory?.name}</h5>
                    </td>
                  </tr>

                  {/* Seller Name */}
                  <tr className="mb-3">
                    <td>
                      <h5 className="text-secondary fw-bold me-5">Seller</h5>
                    </td>
                    <td>
                      <h5>{product?.seller?.name}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Product Description */}
              <h3 className="text-secondary fw-bold mb-3">Product Description</h3>
              <h5 className="mb-4 text-justify">
                {product?.description?.split("\n").map((item, idx) => (
                  <span key={idx}>
                    {item}
                    <br />
                  </span>
                ))}
              </h5>
              {/* Add To Cart Button */}
              <button onClick={handleAddToCart} className="btn btn-primary px-5 shadow-none border-0 glass-btn" style={{ height: "50px" }}>
                <i className="fa-solid fa-cart-plus me-2 add-to-cart-button"></i>Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Display the Footer component */}
      <Footer />
    </div>
  );
}

// Export the ProductDetails component
export default ProductDetails;
