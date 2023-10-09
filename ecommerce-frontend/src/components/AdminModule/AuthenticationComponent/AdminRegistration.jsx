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

const AdminRegistration = () => {

  // Initialize navigation
  const navigate = useNavigate();

  //initialize errors state with an empty object
  const [errors, setErrors] = useState({});

  // State variables for submission status
  const [submitted, setSubmitted] = useState(false);

  // State variables for form input
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    city: ""
  });
  
  // Handle changes in the admin registration form input
  const handleAdminRegisterInput = (event) => {

    // Update the 'admin' state with the new value from the form input
    setAdmin({ ...admin, [event.target.name]: event.target.value });
  }
  
  // Handle admin registration form submission
  const handleAdminRegister = (event) => {

    // Prevent the default behavior of the event, such as form submission
    event.preventDefault();

    // Validate admin registration input and set errors
    setErrors(registerValidation(admin));

    // Set the form submission status to true
    setSubmitted(true);
  }
  
  // Handle when the admin registration form is submitted
  useEffect(() => {
    // Check if there are no validation errors and the form has been submitted
    if(Object.keys(errors).length === 0 && submitted) {

      // Perform admin register API request and handle response
      axios.post(`${BASE_URL}api/admins/register`, admin)
      .then(() => {
        // Show success message when admin is registerd
        Swal.fire({
          icon: "success",
          title: "Admin registered successfully.",
        });
        // Navigate to the admin login page
        navigate("/admins/login");
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
                <h4 className="text-center mt-2 mb-4">Admin Registration Form</h4>

                {/* Admin Registration Form start */}
                <form onSubmit={handleAdminRegister}>

                  {/* Admin Name input field */}
                  <div className="form-group mb-3">
                    <label className="form-control-label fw-bold">Admin Name</label>
                    <input
                      type="text"
                      name="name"
                      value={admin.name}
                      onChange={handleAdminRegisterInput}
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
                      value={admin.email}
                      onChange={handleAdminRegisterInput}
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
                      value={admin.phone}
                      onChange={handleAdminRegisterInput}
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
                      value={admin.password}
                      onChange={handleAdminRegisterInput}
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
                      value={admin.confirmPassword}
                      onChange={handleAdminRegisterInput}
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
                      value={admin.gender}
                      onChange={handleAdminRegisterInput}
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
                      value={admin.city}
                      onChange={handleAdminRegisterInput}
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
                {/* Admin Registration Form end */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>       
  );
}

// Export the AdminRegistration component
export default AdminRegistration;
