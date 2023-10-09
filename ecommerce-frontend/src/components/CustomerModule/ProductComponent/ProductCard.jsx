// IMport Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import "./Product.css";

// Import External Dependencies
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {

  // Destructure the 'product' prop from the component's props
  const { product } = props;

  // Initialize navigation
  const navigate = useNavigate();

  return (
    <div className="col-lg-3 col-md-6 mt-3" key={product.id}>

      {/* Product Card */}
      <div className="card mb-5 shadow product-card">
        <div className="card-header border-bottom border-white text-center p-1">

          {/* Display the product's brand name */}
          <h5>{product?.brand?.name}</h5>
        </div>
        <div className="card-body d-flex justify-content-center py-1">
          {/* Display the product's image */}
          <img
            alt="Product"
            src={BASE_URL + product.photo}
            className="img-thumnail product-card"
          />
        </div>
        {/* Product Card Footer */}
        <div className="product-card-footer">

          {/* Product Details */}
          <div className="text-white py-2 px-3 content">

            {/* Display the product's name */}
            <h6 className="mb-2">{product.name}</h6>

            {/* Display the product's price */}
            <h6 className="product-price mb-2">&#8377; {product.price}</h6>

            {/* Button to navigate to the product details page */}
            <div className="d-flex justify-content-center">
              <button className="btn btn-sm rounded-pill text-white px-3 shiny-btn" onClick={(e) => navigate("/products/" + product.id)}>
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the ProductCard component
export default ProductCard;
