
// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import registerValidation from "../../../validations/registerValidation";

// Import External Dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const CustomerRegistration = () => {

  // Initialize navigation
  const navigate = useNavigate();

  //initialize errors state with an empty object
  const [errors, setErrors] = useState({});

  // State variables for submission status
  const [submitted, setSubmitted] = useState(false);

  // State variables for form input
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    city: ""
  });
  
  // Handle changes in the customer registration form input
  const handleCustomerRegisterInput = (event) => {
        
    // Update the 'customer' state with the new value from the form input
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }
  
  // Handle customer registration form submission
  const handleCustomerRegister = (event) => {

    // Prevent the default behavior of the event, such as form submission
    event.preventDefault();

    // Validate customer registration input and set errors
    setErrors(registerValidation(customer));

    // Set the form submission status to true
    setSubmitted(true);
  }
  
  // Handle when the customer registration form is submitted
  useEffect(() => {
    // Check if there are no validation errors and the form has been submitted
    if(Object.keys(errors).length === 0 && submitted) {

      // Perform customer register API request and handle response
      axios.post(`${BASE_URL}api/customers/register`, customer)
      .then(() => {
        // Show success message when customer is registerd
        Swal.fire({
          icon: "success",
          title: "Customer registered successfully.",
        });
        // Navigate to the customer login page
        navigate("/customers/login");
      })
      .catch((error) => {
        // Show error message from API response
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 2000
          });

          // Reset the form submission status to false
          setSubmitted(false);
        } 
        else {
          // Show a generic error message
          toast.error("Unable to register..!", {
            position: "top-right",
            autoClose: 2000
          });

          // Reset the form submission status to false
          setSubmitted(false);
        }
      }
    )}
  }, [errors, submitted])
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow mt-4 mb-5">
            <div className="card-body">
              <div className="container">

                {/* Form Title */}
                <h4 className="text-center mt-2 mb-4">Customer Registration Form</h4>

                {/* Customer Registration Form start */}
                <form onSubmit={handleCustomerRegister}>

                  {/* Customer Name input field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">Customer Name</label>
                    <input
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleCustomerRegisterInput}
                      className="form-control shadow-none border border-dark"
                    />
                    
                    {/* Display name validation error */}
                    {errors.name && <h6 className="text-danger">{errors.name}</h6>}
                  </div>

                  {/* Email Address input field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleCustomerRegisterInput}
                      className="form-control shadow-none border border-dark"
                    />
                    
                    {/* Display email validation error */}
                    {errors.email && (
                      <h6 className="text-danger">{errors.email}</h6>
                    )}
                  </div>

                  {/* Phone input field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">Phone</label>
                    <input
                      type="text"
                      maxLength="10"
                      name="phone"
                      value={customer.phone}
                      onChange={handleCustomerRegisterInput}
                      className="form-control shadow-none border border-dark"
                    />

                    {/* Display phone validation error */}
                    {errors.phone && <h6 className="text-danger">{errors.phone}</h6>}
                  </div>

                  {/* Password input field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={customer.password}
                      onChange={handleCustomerRegisterInput}
                      className="form-control shadow-none border border-dark"
                    />
                    
                    {/* Display password validation error */}
                    {errors.password && <h6 className="text-danger">{errors.password}</h6>}
                  </div>

                  {/* Confirm Password input field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={customer.confirmPassword}
                      onChange={handleCustomerRegisterInput}
                      className="form-control shadow-none border border-dark"
                    />
                    
                    {/* Display confirm password validation error */}
                    {errors.confirmPassword && <h6 className="text-danger">{errors.confirmPassword}</h6>}
                  </div>

                  {/* Gender select field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">Gender</label>
                    <select
                      name="gender"
                      value={customer.gender}
                      onChange={handleCustomerRegisterInput}
                      className="form-control shadow-none border border-dark"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    
                    {/* Display gender validation error */}
                    {errors.gender && <h6 className="text-danger">{errors.gender}</h6>}
                  </div>

                  {/* City input field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">City</label>
                    <input
                      type="text"
                      name="city"
                      value={customer.city}
                      onChange={handleCustomerRegisterInput}
                      className="form-control shadow-none border border-dark"
                    />
                    
                    {/* Display city validation error */}
                    {errors.city && <h6 className="text-danger">{errors.city}</h6>}
                  </div>

                  {/* Register button */}
                  <div className="d-flex justify-content-center">
                    <button className="btn rounded-pill text-white fw-bold shadow-none shiny-btn py-2 px-5 mt-3 mb-2">
                      Register
                    </button>
                  </div>
                </form>
                {/* Customer Registration Form end */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>       
  );
}

// Export the CustomerRegistration component
export default CustomerRegistration;
