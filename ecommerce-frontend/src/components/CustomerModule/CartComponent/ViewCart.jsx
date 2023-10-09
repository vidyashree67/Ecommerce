// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import "./ViewCart.css";

// Import External Dependencies
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const ViewCart = () => {

    // Initialize Redux dispatch
    const dispatch = useDispatch();
    
    // Get the customer ID from local storage
    const customerId = localStorage.getItem("id");

    // Initialize state to manage the cart
    const [cart, setCart] = useState([]);

    // State to hold total ammount
    const [totalAmount, setTotalAmount] = useState(0);

    // State to hold address information
    const [address, setAddress] = useState({
        shippingAddress: "",
        billingAddress: "",
        city: "",
        state: "",
        country: "",
        zipcode: ""
    });

    // State to hold payment information
    const [payment, setPayment] = useState({
        paymentId: "",
        amount: ""
    });

    // State to track the submission status
    const [submitting, setSubmitting] = useState(false);

    //fetch the cart details
    const fetchCart = () => {
        axios.get(`${BASE_URL}api/cart/${customerId}`)
        .then((response) => {
            setCart(response.data);

            //calculate total amount
            const totalAmount = response.data.reduce((total, item) => {
                return total + item.product.price * item.quantity
            }, 0);
            setTotalAmount(totalAmount);
            setPayment({ ...payment, amount: totalAmount });
        });
    }

    // Fuction to handle delete the cart item
    const deleteItem = (item) => {
        // Display a confirmation dialog using SweetAlert
        Swal.fire({
            title: "Delete Cart Item",
            text: "Are you sure to delete the cart item?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // If customer confirms deletion, send a DELETE request to the API
                axios.delete(`${BASE_URL}api/cart/${item.id}/delete`)
                .then(() => {
                    // Show success message when the cart item is deleted
                    toast.success(`${item.product.name} successfully removed from your cart.`, {
                        position: "top-right",
                        autoClose: 2000
                    });
                    // Dispatch an action to remove an item from the cart
                    dispatch({ type: "RemoveItem", payload: item });

                    // Reload the list of cart items
                    fetchCart();
                })
                .catch(() => {
                    // Show error toast if unable to delete the cart item
                    toast.error(`Unable to remove ${item.product.name} from the cart..!`, {
                        position: "top-right",
                        autoClose: 2000
                    });
                });
            }
        });
    }

    // Fetch the cart data when the component mounts
    useEffect(() => {
        fetchCart();
    }, []);

    // Function to handle quantity change (increment or decrement)
    const handleQuantityChange = ({ type, item }) => {

        // Calculate the new quantity based on the action type
        let newQuantity;
      
        if (type === "decrement") {
            
            // Ensure the new quantity is at least 1 (minimum allowed)
            newQuantity = Math.max(1, item.quantity - 1);
        }
        else if (type === "increment") {

            // Increment the quantity by 1
            newQuantity = item.quantity + 1;
        }
      
        // Update the cart with the new quantity
        const updatedCart = cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem);
        setCart(updatedCart);
      
        const productId = item.product.id;
    
        // Update the quantity on the server
        axios.put(`${BASE_URL}api/cart/${customerId}/${productId}/update`, {quantity: newQuantity})
        .then(() => {
            updateTotalAmount(updatedCart);
        });
    }
    
    // Function to update the total amount based on the cart items
    const updateTotalAmount = (updatedCart) => {
        const newTotalAmount = updatedCart.reduce(
        (total,item) => total + item.product.price*item.quantity, 0);

        // Update the total amount for payment
        setTotalAmount(newTotalAmount);

        // Update the billed amount for payment
        setPayment({ ...payment, amount:newTotalAmount });
    }

    // Function to handle address input changes
    const handleAddressInput = (event) => {
        setAddress({ ...address, [event.target.name]: event.target.value });
    }

    // Function to handle payment input changes
    const handlePaymentInput = (event) => {
        setPayment({ ...payment, [event.target.name]: event.target.value });
    }
    
    // Function to open Razorpay payment page
    const handleOpenRazorpay = (data) => {

        // Configure the options for the Razorpay payment page
        const options = {
            key: "rzp_test_8To6MHyfeAADzw",
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.orderId,
            name: "Ecowear",
            handler: function(response) {
                // Handle the payment success/failure response here
                if (response.razorpay_payment_id) {

                    // Payment successful, proceed to save the payment details
                    const paymentDetails = {
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        amount: data.amount,
                        currency: data.currency,
                        customerId: customerId,
                        transactionTime: new Date().toISOString()
                    }
    
                    // Make the API call to save the payment details
                    axios.post(`${BASE_URL}api/payment/saveTransaction`, paymentDetails)
                    .then(() => {
                        setPayment({ ...payment, paymentId: response.razorpay_payment_id });
                        setSubmitting(false);
                    })
                } else {
                    // Show error toast if payment failed or canceled
                    toast.error("Unable to make the payment..!", {
                        position: "top-right",
                        autoClose: 2000
                    });
                }
            },
            theme: {
                color: "#df929e"
            }
        }
        // Open razorpay page
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }

    // Function to handle payment submission
    const handlePayment = (event) => {

        // Prevent the default behavior of the event, such as form submission
        event.preventDefault();

        // Set the form submission status to true
        setSubmitting(true);
        
        // Perform API request to create a transaction
        axios.post(`${BASE_URL}api/payment/createTransaction`, null, {
            params: { amount: totalAmount },
        })
        .then((response) => {
            // Open Razorpay payment page
            handleOpenRazorpay(response.data)
        });
    }

    // Function to place an order
    const handlePlaceOrder = () => {

        // Set the form submission status to true
        setSubmitting(true)

        // Prepare product details for the order
        const productDetails = cart.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            productCategory: item.product.categoryId,
            price: item.product.price,
            quantity: item.quantity,
        }));
      
        // Prepare data for placing the order
        const data = {
            cart: productDetails,
            address: address,
            customerId: customerId,
            paymentId: payment.paymentId
        }
      
        // Save the checkout form details and clear the cart
        axios.post(`${BASE_URL}api/orders/placeOrder`, data)
        .then(() => {    
            
            // Perform API request to clear the cart
            axios.delete(`${BASE_URL}api/cart/${customerId}/clear`)
            .then(() => {
                // Show success message when order is placed
                toast.success("Order placed successfully.", {
                    position: "top-right",
                    autoClose: 2000
                });
                // Dispatch an action to clear the cart
                dispatch({ type: "Clear" });

                // Reload the list of cart items
                fetchCart();

                // Set the form submission status to true
                setSubmitting(false);
            });
        })
        .catch(() => {
            // Show error toast if unable to place the order
            toast.error("Unable to place order..!", {
                position: "top-right",
                autoClose: 2000
            });
        });
    }

    // handle placing the order when payment is successful
    useEffect(() => {
        // Check if a successful payment has been made and a payment ID is available
        if (payment.paymentId) {
            // Initiate the process of placing an order
            handlePlaceOrder();
        }
    }, [payment.paymentId]);
      
    return (
        <div className="container-fluid">

            {/* Check if cart is not empty */}
            {cart.length > 0 ? (
                <div className="row mt-3">
                    <div className="col-lg-8">
                        <div className="table-responsive shadow">

                            {/* Cart Item Table start */}
                            <table className="table table-bordered table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* Mapping through cart to display each item */}
                                    {cart.map((item) => (
                                        <tr key={item.id}>

                                            {/* Product Photo */}
                                            <td>
                                                <img
                                                    alt="Product"
                                                    className="me-2"
                                                    src={BASE_URL+item.product.photo}
                                                    width="100"
                                                />
                                                {item.product.productName}
                                            </td>

                                            {/* Product Price */}
                                            <td>&#8377; {item.product.price}</td>

                                            {/* Product Quantity */}
                                            <td>
                                                <div className="quantity">

                                                    {/* Quantity Decrement Button */}
                                                    <button
                                                        className="bg-light fw-bold me-1 quantity-increment-button"
                                                        onClick={() => handleQuantityChange({ type: "decrement", item })}
                                                    >
                                                        <i className="fa-solid fa-minus"></i>
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        className="bg-light fw-bold ps-3 me-1 quantity-input"
                                                        onChange={(e) => handleQuantityChange({ type: "input", value: e.target.value, item })}
                                                        disabled
                                                        min={1}
                                                    />

                                                    {/* Quantity Increment Button */}
                                                    <button
                                                        className="bg-light fw-bold quantity-decrement-button"
                                                        onClick={() => handleQuantityChange({ type: "increment", item })}
                                                    >
                                                        <i className="fa-solid fa-plus"></i>
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Subtotal */}
                                            <td>&#8377; {item.quantity * item.product.price}</td>
                                            <td>
                                                {/* Cart Item Delete Button */}
                                                <Link
                                                    to="#"
                                                    onClick={(e) => deleteItem(item)}
                                                    className="text-danger fw-bold text-decoration-none deleteCartItemIcon"
                                                >
                                                    &#10008;
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th colSpan="4"></th>
                                        <th colSpan="2">

                                        {/* Total Amount */}
                                        <h5>
                                            Total Amount: <strong className="ms-1">&#8377; {totalAmount}</strong>
                                        </h5>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                            {/* Cart Item Table end */}

                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow" style={{borderRadius:"10px"}}>
                            <div className="container">
                                <div className="m-3">

                                    {/* Checkout Form start */}
                                    <form onSubmit={handlePayment}>

                                        {/* Checkout Form Title */}
                                        <h3 className="text-center fw-bold mb-4">Checkout Form</h3>

                                        {/* Payment Information */}
                                        <h5 className="text-secondary fw-bold mb-4">Payment Information</h5>

                                        {/* Billed Amount input field */}
                                        <div className="row mb-4">
                                            <label className="col-sm-4 form-control-label fw-bold">Billed Amount</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    maxLength="3"
                                                    value={payment.amount}
                                                    readOnly
                                                    onChange={handlePaymentInput}
                                                    className="form-control shadow-none border border-dark"
                                                />                        
                                            </div>                        
                                        </div>
                                        <hr />

                                        {/* Address Information */}
                                        <h5 className="text-secondary fw-bold mb-4">Address Information</h5>

                                        {/* Shipping Address input field */}
                                        <div className="row mb-4">
                                            <label className="col-sm-4 form-control-label fw-bold">Shipping Address :</label>
                                            <div className="col-sm-8">
                                                <textarea
                                                    name="shippingAddress"
                                                    required
                                                    value={address.shippingAddress}
                                                    onChange={handleAddressInput}
                                                    className="form-control shadow-none border border-dark">
                                                </textarea>
                                            </div>                        
                                        </div>

                                        {/* Billing Address input field */}
                                        <div className="row mb-4">
                                            <label className="col-sm-4 form-control-label fw-bold">Billing Address :</label>
                                            <div className="col-sm-8">
                                                <textarea
                                                    name="billingAddress"
                                                    required
                                                    value={address.billingAddress}
                                                    onChange={handleAddressInput}
                                                    className="form-control shadow-none border border-dark">
                                                </textarea>
                                            </div>                        
                                        </div>

                                        {/* City input field */}
                                        <div className="row mb-4">
                                            <label className="col-sm-4 form-control-label fw-bold">City :</label>
                                            <div className="col-sm-8">
                                                <input type="text"
                                                    name="city"
                                                    required
                                                    value={address.city}
                                                    onChange={handleAddressInput}
                                                    className="form-control shadow-none border border-dark"
                                                />                        
                                            </div>                        
                                        </div>

                                        {/* State input field */}
                                        <div className="row mb-4">
                                            <label className="col-sm-4 form-control-label fw-bold">State :</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    required
                                                    value={address.state}
                                                    onChange={handleAddressInput}
                                                    className="form-control shadow-none border border-dark"
                                                />
                                            </div>                        
                                        </div>

                                        {/* Country input field */}
                                        <div className="row mb-4">
                                            <label className="col-sm-4 form-control-label fw-bold">Country :</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    name="country"
                                                    required
                                                    value={address.country}
                                                    onChange={handleAddressInput}
                                                    className="form-control shadow-none border border-dark"
                                                />                       
                                            </div>                        
                                        </div>

                                        {/* Zipcode input field */}           
                                        <div className="row mb-4">
                                            <label className="col-sm-4 form-control-label fw-bold">Zipcode :</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    name="zipcode"
                                                    required
                                                    value={address.zipcode}
                                                    onChange={handleAddressInput}
                                                    className="form-control shadow-none border border-dark"
                                                />                        
                                            </div>                        
                                        </div>

                                        {/* Place Order Button */}
                                        <button type="submit" className="btn btn-lg text-white fw-bold shadow-none px-4 float-end mb-4 glass-btn" disabled={submitting}>

                                            {/* Display "Placing Order..." if submitting, otherwise "Place Order" */}
                                            {submitting ? "Placing Order..." : "Place Order"}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (

                // Display message when cart is empty
                <h3 className="m-3">Cart is Empty</h3>
            )}
        </div>
    );
}

// Export the ViewCart component
export default ViewCart;