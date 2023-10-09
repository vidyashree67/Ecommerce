// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import { useState, useEffect } from "react";
import Moment from "react-moment";
import axios from "axios";

const CustomerOrders = () => {

  // Initialize a state variable to track the orders
  const [orders, setOrders] = useState([]);
  
  // Initialize a state variable to track the order details
  const [orderDetails, setOrderDetails] = useState([]);
  
  // Initialize a state variable to track the address information
  const [address, setAddress] = useState([]);
  
  // Flag to control order details display
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Function to fetch and display orders
  const showCustomerOrders = () => {

    // Send a GET request to the API to retrieve orders data
    axios.get(`${BASE_URL}api/orders`)
    .then((response) => {
      // Update the orders state with the retrieved data from the API response
      setOrders(response.data.data);
    });
  }

  // Load customer orders when the component mounts
  useEffect(() => {
    // Call the function showCustomerOrders to fetch and show all customer orders
    showCustomerOrders();
  }, []);

  // Function to fetch and display order details based on order ID
  const fetchCustomerOrderDetails = (id) => {

    // Send a GET request to the API to retrieve order details
    axios.get(`${BASE_URL}api/orders/${id}`)
    .then((response) => {
      // Update the details state with the retrieved order details data
      setOrderDetails(response.data.data.orderDetails);

      // Update the address state with the retrieved address data
      setAddress(response.data.data.order.address);
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

              {/* Customer Order Information title */}
              <h4>Customer Orders</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">

                {/* Customer Order Information Table start */}
                <table className="table table-bordered table-sm table-light table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Order Date</th>
                      <th>Amount</th>
                      <th>Customer Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapping through orders to display each customer order */}
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

                        {/* Customer Name */}
                        <td>{order.customer.name}</td>

                        {/* Show Details Button */}
                        <td>
                          <button
                            onClick={(event) => fetchCustomerOrderDetails(order.id)}
                            className="btn btn-sm rounded-pill px-3 text-white shadow-none shiny-btn"
                          >
                            Show Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Customer Order Information Table end */}

              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">

          {/* Conditionally render based on the value of showOrderDetails flag */}
          {showOrderDetails ? (
            <div className="shadow mt-3 p-3">

              {/* Customer Order Details Table title */}
              <h4 className="p-2">Order Details</h4>

              {/* Customer Order Details Table start */}
              <div className="table-responsive">
                <table className="table table-bordered table-sm table-light table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Id</th>
                      <th>Product</th>
                      <th style={{width:"12%"}}>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapping through order details to display each order */}
                    {orderDetails.map((order, index) => (
                      <tr key={index}>
                        <td>{order.product.id}</td>
                        <td className="d-flex">
                          
                          {/* Product Photo */}
                          <img className="me-4" src={BASE_URL + order.product.photo} height="100" alt="product-photo" />

                          {/* Product Information */}
                          <div>
                            {/* Product Name */}
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
              </div>
              {/* Shipping Address */}
              <div className=" bg-light shadow-sm mb-3 px-3 py-2">
                <h6 className="fw-bold mb-2">Shipping Address</h6>
                <div>{address.shippingAddress}</div>
              </div>
              {/* Billing Address */}
              <div className=" bg-light shadow-sm mb-2 px-3 py-2">
                <h6 className="fw-bold mb-2">Billing Address</h6>
                <div>{address.billingAddress}</div>
              </div>
              {/* Customer Order Details Table end */}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// Export the CustomerOrders component
export default CustomerOrders;

