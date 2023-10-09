// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CustomerProfile = () => {
  // Get the customer ID from local storage
  const id = localStorage.getItem("id");

  // Initialize state variables for customer profile information
  const [customer, setCustomer] = useState({
    id: localStorage.getItem("id"),
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    password: ""
  });

  // Fetch and set the customer profile data when the component mounts
  useEffect(() => {
    // Track if the component is mounted
    let isMounted = true;

    // Fetch customer profile data from the API
    axios.get(`${BASE_URL}api/customers/${id}`)
    .then((response) => {

      // Check if the component is still mounted before setting state
      if (isMounted) {
        // Update state with fetched customer profile data
        setCustomer(response.data.data);
      }
    });

    return () => {
      // Set isMounted to false when the component unmounts
      isMounted = false;
    }
  }, [id]);

  // Handle changes to profile input fields
  const handleProfileInput = (event) => {

    // Update the 'customer' state with the new value from the form input
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  }

  // Handle changes to the password input field
  const handlePasswordInput = (event) => {

    // Update the 'customer' state with the new value from the form input
    setCustomer({ ...customer, password: event.target.value });
  }

  // Handle the update of customer profile
  const handleUpdateProfile = (event) => {

    // Prevent the default behavior of the event, such as form submission
    event.preventDefault();

    // Handle the update of customer profile
    axios.put(`${BASE_URL}api/customers/${id}/updateProfile`, customer)
    .then((response) => {

      // Check if the response status indicates a successful operation (HTTP 200)
      if (response.status === 200) {
        
        // Show success message when profile is updated
        toast.success("Profile updated successfully.", {
          position: "top-right",
          autoClose: 2000
        });
      };
    })
    .catch(() => {
      // Show a generic error message
      toast.error("Unable to update profile..!", {
        position: "top-right",
        autoClose: 2000
      });
    })
  }

  // Handle the update of customer password
  const handleUpdatePassword = (event) => {

    // Prevent the default behavior of the event
    event.preventDefault();

    // Make an API request to update the customer password
    axios.put(`${BASE_URL}api/customers/${id}/updatePassword`, { password: customer.password })
    .then((response) => {

      // Check if the response status indicates a successful operation (HTTP 200)
      if (response.status === 200) {

        // Show success message when password is updated
        toast.success("Password updated successfully.", {
          position: "top-right",
          autoClose: 2000
        });
      }
    })
    .catch(() => {
      // Show a generic error message
      toast.error("Unable to update password..!", {
        position: "top-right",
        autoClose: 2000
      });
    });
  }

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-sm-7 mx-auto">
          <div className="card shadow bg-transparent my-5">
            <div className="card-header form-header">
              <h4 className="text-center">Customer Profile Page</h4>
            </div>
            <div className="card-body py-4">
              <div className="container">

              {/* Update Profile Section */}
                <div className="row">
                  <div className="container">
                    <div className="card mb-4">
                      <div className="card-header">

                        {/* Update Profile Form Title */}
                        <h5 className="fw-bold">Update Profile</h5>
                      </div>
                      <div className="card-body">

                        {/* Update Profile Form */}
                        <form onSubmit={handleUpdateProfile}>

                          {/* Customer Name input field */}
                          <div className="row mb-4">
                            <label className="col-sm-4 form-control-label fw-bold">Customer Name</label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                name="name"
                                value={customer.name}
                                onChange={handleProfileInput}
                                className="form-control shadow-none border border-dark"
                              />
                            </div>
                          </div>

                          {/* Email input field */}
                          <div className="row mb-4">
                            <label className="col-sm-4 form-control-label fw-bold">Email Address</label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                name="email"
                                value={customer.email}
                                disabled
                                className="form-control shadow-none border border-dark"
                              />
                            </div>
                          </div>

                          {/* Phone input field */}
                          <div className="row mb-4">
                            <label className="col-sm-4 form-control-label fw-bold">Phone</label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                maxLength="10"
                                name="phone"
                                value={customer.phone}
                                disabled
                                className="form-control shadow-none border border-dark"
                              />
                            </div>
                          </div>

                          {/* Gender input field */}
                          <div className="row mb-4">
                            <label className="col-sm-4 form-control-label fw-bold">Gender</label>
                            <div className="col-sm-8">
                              <select
                                name="gender"
                                value={customer.gender}
                                onChange={handleProfileInput}
                                className="form-control shadow-none border border-dark"
                              >
                                <option value="">Select Gender</option>
                                <option>Male</option>     
                                <option>Female</option>   
                                <option>Other</option>   
                              </select>
                            </div>
                          </div>

                          {/* City input field */}
                          <div className="row mb-4">
                            <label className="col-sm-4 form-control-label fw-bold">City</label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                name="city"
                                value={customer.city}
                                onChange={handleProfileInput}
                                className="form-control shadow-none border border-dark"
                              />
                            </div>
                          </div>

                          {/* Update Profile button */}
                          <button className="btn text-white fw-bold shadow-none px-4 float-end shiny-btn">
                            Update Profile
                          </button>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update Password Section */}
                <div className="row">
                  <div className="container">
                    <div className="card">
                      <div className="card-header">

                        {/* Update Passowrd Form Title */}
                        <h5 className="fw-bold">Update Password</h5>
                      </div>
                      <div className="card-body">

                        {/* Update Passowrd Form */}
                        <form onSubmit={handleUpdatePassword}>

                          {/* Password input field */}
                          <div className="row">
                            <label className="col-lg-2 form-control-label fw-bold mb-1">Password</label>
                            <div className="col-lg-6 mb-2">
                              <input
                                type="password"
                                name="password"
                                onChange={handlePasswordInput}
                                className="form-control shadow-none border border-dark"
                              />
                            </div>
                            
                            {/* Update Password Button */}
                            <div className="col-lg-4">
                              <button className="btn text-white fw-bold shadow-none float-end shiny-btn">
                                Update Password
                              </button>
                            </div>

                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the CustomerProfile component
export default CustomerProfile;