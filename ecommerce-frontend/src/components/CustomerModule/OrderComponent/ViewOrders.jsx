// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import { useState, useEffect } from "react";
import Moment from "react-moment";
import axios from "axios";

const ViewOrders = () => {
  
  // Get the customer ID from local storage
  const customerId = localStorage.getItem("id");

  // Initialize a state variable to track the orders
  const [orders, setOrders] = useState([]);

  // Initialize a state variable to track the order details
  const [orderDetails, setOrderDetails] = useState([]);

  // Flag to control order details display
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Function to fetch and display orders for a specific customer
  const showOrders = () => {

    // Send a GET request to the API to retrieve orders data for the given customer Id
    axios.get(`${BASE_URL}api/orders?customerId=` + customerId)
    .then(response => {
      // Update the orders state with the retrieved data from the API response
      setOrders(response.data.data);
    });
  }

  // Load orders when the component mounts
  useEffect(() => {
    // Call the function showOrders to fetch and show all orders
    showOrders();
  }, []);

  // Function to fetch and display order details based on order ID for the customer
  const fetchOrderDetails = (id) => {

    // Send a GET request to the API to retrieve order details
    axios.get(`${BASE_URL}api/orders/` + id)
    .then(response => {
      // Update the details state with the retrieved order details data
      setOrderDetails(response.data.data.orderDetails);
    })
    // Set the flag to display order details to true
    setShowOrderDetails(true);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-7">
          <div className="card shadow my-3">
            <div className="card-header table-header">

              {/* Purchased Order Information Table Title */}
              <h4>My Purchased Orders</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">

                {/* Purchased Order Information Table start */}
                <table className="table table-bordered table-sm table-light table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Order Date</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapping through orders to display each order */}
                    {orders.map((order,index) => (
                      <tr key={index}>

                        {/* Order Id */}
                        <td>{order.id}</td>

                        {/* Order Date */}
                        <td>
                          <Moment format="ddd, DD-MMM-YYYY">{order.orderDate}</Moment>
                        </td>

                        {/* Order Payment Amount */}
                        <td>&#8377; {order.payment.amount}</td>

                        {/* Show Details Button */}
                        <td>
                          <button
                            onClick={(event) => fetchOrderDetails(order.id)}
                            className="btn btn-sm rounded-pill px-3 text-white shadow-none shiny-btn"
                          >
                            Show Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Purchased Order Information Table end */}

              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">

          {/* Conditionally render based on the value of showOrderDetails flag */}
          {showOrderDetails ? (
            <>
              <h4 className="p-2">Order Details</h4>
              <div className="table-responsive">

                {/* Order Details Table start */}
                <table className="table table-bordered table-sm table-light table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Id</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapping through order details to display each order */}
                    {orderDetails.map((order, index) => (
                      <tr key={index}>

                        {/* Product Id */}
                        <td>{order.product.id}</td>

                        {/* Product Photo and Name */}
                        <td className="d-flex">
                          <img className="me-4" src={BASE_URL + order.product.photo} height="100" alt="" />
                          <div>
                            <h6>{order.product.name}</h6>

                            {/* Product Category Name */}
                            <h6><span className="fw-bold me-2">Category:</span>{order.product.category.name}</h6>

                            {/* Product Subcategory Name */}
                            <h6><span className="fw-bold me-2">Subcategory:</span>{order.product.subcategory.name}</h6>

                            {/* Product Brand Name */}
                            <h6><span className="fw-bold me-2">Brand:</span>{order.product.brand.name}</h6>
                          </div>
                        </td>
                        {/* Product Price */}
                        <td>&#8377; {order.product.price}</td>

                        {/* Product Quantity */}
                        <td>{order.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Order Details Table end */}

              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Export the ViewOrders component
export default ViewOrders;