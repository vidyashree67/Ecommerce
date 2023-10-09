// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const SellerProfile = () => {
  // Get the seller ID from local storage
  const id = localStorage.getItem("id");

  // Initialize state variables for seller profile information
  const [seller, setSeller] = useState({
    id: localStorage.getItem("id"),
    name: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    password: ""
  });

  // Fetch and set the seller profile data when the component mounts
  useEffect(() => {
    // Track if the component is mounted
    let isMounted = true;

    // Fetch seller profile data from the API
    axios.get(`${BASE_URL}api/sellers/${id}`)
    .then((response) => {

      // Check if the component is still mounted before setting state
      if (isMounted) {
        // Update state with fetched seller profile data
        setSeller(response.data.data);
      }
    });

    return () => {
      // Set isMounted to false when the component unmounts
      isMounted = false;
    }
  }, [id]);

  // Handle changes to profile input fields
  const handleProfileInput = (event) => {

    // Update the 'seller' state with the new value from the form input
    setSeller({ ...seller, [event.target.name]: event.target.value });
  }

  // Handle changes to the password input field
  const handlePasswordInput = (event) => {

    // Update the 'seller' state with the new value from the form input
    setSeller({ ...seller, password: event.target.value });
  }

  // Handle the update of seller profile
  const handleUpdateProfile = (event) => {

    // Prevent the default behavior of the event, such as form submission
    event.preventDefault();

    // Handle the update of seller profile
    axios.put(`${BASE_URL}api/sellers/${id}/updateProfile`, seller)
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

  // Handle the update of seller password
  const handleUpdatePassword = (event) => {

    // Prevent the default behavior of the event
    event.preventDefault();

    // Make an API request to update the seller password
    axios.put(`${BASE_URL}api/sellers/${id}/updatePassword`, { password: seller.password })
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
              <h4 className="text-center">Seller Profile Page</h4>
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

                          {/* Seller Name input field */}
                          <div className="row mb-4">
                            <label className="col-sm-4 form-control-label fw-bold">Seller Name</label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                name="name"
                                value={seller.name}
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
                                value={seller.email}
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
                                value={seller.phone}
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
                                value={seller.gender}
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
                                value={seller.city}
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

// Export the SellerProfile component
export default SellerProfile;