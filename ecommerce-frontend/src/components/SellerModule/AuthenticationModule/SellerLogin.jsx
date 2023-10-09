// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import loginValidation from "../../../validations/loginValidation";

// Import External Dependencies
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SellerLogin = () => {

    // Initialize Redux dispatch
    const dispatch = useDispatch();

    // Initialize navigation
    const navigate = useNavigate();

    // State variables for form input
    const [seller, setSeller] = useState({
        email: "",
        password: ""
    });

    // State to manage validation errors
    const [errors, setErrors] = useState({});

    // State variables for submission status
    const [submitted, setSubmitted] = useState(false);

    // Handle changes in the seller login form input
    const handleSellerLoginInput = (event) => {

        // Update the 'seller' state with the new value from the form input
        setSeller({ ...seller, [event.target.name]: event.target.value });
    }

    // Handle seller login form submission
    const handleSellerLogin = (event) => {

    // Prevent the default behavior of the event, such as form submission
    event.preventDefault();

    // Validate seller login input and set errors
    setErrors(loginValidation(seller));

    // Set the form submission status to true
    setSubmitted(true);
    }

    // Handle when the seller login form is submitted
    useEffect(() => {
        // Check if there are no validation errors and the form has been submitted
        if(Object.keys(errors).length === 0 && submitted) {

            // Perform seller login API request and handle the response
            axios.post(`${BASE_URL}api/sellers/login`, seller)
            .then(response => {

                // Extract relevant data from the response
                let result=response.data.data

                // Store seller information in local storage
                localStorage.setItem("email", result.email);
                localStorage.setItem("name", result.name);
                localStorage.setItem("role", "seller");
                localStorage.setItem("id", result.id);

                // Dispatch action to indicate successful login
                dispatch({type:"IsLoggedIn"});

                // Navigate to the seller profile page
                navigate("/sellers/profile");
            })
            .catch((error) => {
                // Check if the error response exists and the status code is 403 (Forbidden)
                if (error.response && error.response.status === 403) {

                    // If the account is suspended, display a specific message
                    toast.error("Your account is suspended. Please contact support.", {
                        position: "top-right",
                        autoClose: 2000
                    });
                } 
                else {
                    // Otherwise, display a generic error message for invalid login
                    toast.error("Invalid email address or password..!!", {
                        position: "top-right",
                        autoClose: 2000
                    });
                }

            })            
        }

    }, [errors, submitted]);

    return (
       
    <div className="container">
        <div className="row">
            <div className="col-lg-4 px-5 mx-auto">
                <div className="card shadow my-5">
                    <div className="card-header d-flex justify-content-center login-header">
                        <img src={"/assets/lock.png"} width="50" alt="Lock" className="py-5" />
                    </div>
                    <div className="card-body">
                        <div className="container">

                            {/* Form Title */}
                            <h4 className="text-center mt-2 mb-4">Seller Login Form</h4>

                            {/* Seller Login Form start */}
                            <form onSubmit={handleSellerLogin}>

                                {/* Email input field */}
                                <div className="form-group mb-3">
                                    <label className="form-control-label fw-bold mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={seller.email}
                                        onChange={handleSellerLoginInput}
                                        className="form-control shadow-none border border-dark"
                                    />

                                    {/* Display email validation error */}
                                    {errors.email && <h6 className="text-danger fw-bold mt-2">{errors.email}</h6>}
                                </div>

                                {/* Password input field */}
                                <div className="form-group mb-4">
                                    <label className="form-control-label fw-bold mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={seller.password}
                                        onChange={handleSellerLoginInput}
                                        className="form-control shadow-none border border-dark"
                                    />

                                    {/* Display password validation error */}
                                    {errors.password && <h6 className="text-danger fw-bold mt-2">{errors.password}</h6>}
                                </div>

                                {/* If not registered yet, provide a link to the seller registration page */}
                                <h6>Don't yet registered? 
                                    <Link to="/sellers/registration" className="text-dark fw-bold ms-2">Register</Link>
                                </h6>

                                {/* Login button */}
                                <div className="d-flex justify-content-center">
                                    <button className="btn rounded-pill shadow-none text-white fw-bold px-5 py-2 my-4 shiny-btn">
                                        Login
                                    </button>
                                </div>
                            </form>
                            {/* Seller Login Form end */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

// Export the SellerLogin component
export default SellerLogin;