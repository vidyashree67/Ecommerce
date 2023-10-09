// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependecies
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const SellerList = () => {

    // Initialize a state variable to track the sellers
    const [sellers, setSellers] = useState([]);

    // Function to load all sellers
    const loadAllSellers = () => {
        // Send a GET request to the API to retrieve all sellers
        axios.get(`${BASE_URL}api/sellers`)
        .then(response => {
            // Update the sellers state with the retrieved data from the API response
            setSellers(response.data.data);
        });
    }

    // Load all sellers when the component mounts
    useEffect(()=>{
        // Call the function oadAllSellers to load all sellers
        loadAllSellers();
    },[]);

    // Function to handle suspend the seller
    const suspendSeller = (id) => {
        Swal.fire({
            title: "Suspend Seller Account",
            text: "Are you sure to suspend this seller account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Suspend",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            // If admin confirms suspension, send a PUT request to the API to suspend the seller
            if (result.isConfirmed) {
                // Make request to put API to update the status of the seller to 'Suspended'
                axios.put(`${BASE_URL}api/sellers/${id}/suspend`, { status: false })
                .then(() => {
                    // Show success message when the seller is suspended
                    toast.success("Seller suspended successfully.", {
                        position: "top-right",
                        autoClose: 2000
                    });
                    // Reload the list of sellers
                    loadAllSellers();
                })
                .catch(() => {
                    // Show error toast if unable to suspend the seller
                    toast.error("Unable to suspend the seller..!", {
                        position: "top-right",
                        autoClose: 2000
                    });
                });
            }
        });
    }
    
    return (
        <div className="container-fluid px-5">

            {/* Seller Information Table title */}
            <h4 className="text-center fw-bold p-2">All Sellers</h4>
            <div className="table-responsive mb-5">

                {/* Seller Information Table start */}
                <table className="table table-bordered table-striped table-light table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Gender</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Mapping through sellers to display each seller */}
                    {sellers.map((seller,index)=>(
                        <tr key={index}>
                            {/* Seller Id */}
                            <td>{seller.id}</td>

                            {/* Seller Name */}
                            <td>{seller.name}</td>

                            {/* Seller Email */}
                            <td>{seller.email}</td>

                            {/* Seller Phone */}
                            <td>{seller.phone}</td>

                            {/* Seller Gender */}
                            <td>{seller.gender}</td>

                            {/* Seller City */}
                            <td>{seller.city}</td>

                            {/* Seller Status */}
                            <td>{seller.status ? 
                                <span className="badge bg-success px-2">Active</span> : 
                                <span className="badge bg-danger px-2">Suspended</span>}
                            </td>
                            {/* Suspend Button */}
                            <td>
                                <button onClick={(event)=>suspendSeller(seller.id)} className="btn btn-danger btn-sm shadow-none">
                                    <i className="fa-solid fa-ban me-1"></i> Suspend Account
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* Seller Information Table end */}

            </div>
        </div>
    );
}

// Export the SellerList Component
export default SellerList;