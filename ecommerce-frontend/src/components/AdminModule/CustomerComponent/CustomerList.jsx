// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependecies
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const CustomerList = () => {

    // Initialize a state variable to track the customers
    const [customers, setCustomers] = useState([]);

    // Function to load all customers
    const loadAllCustomers = () => {
        // Send a GET request to the API to retrieve all customers
        axios.get(`${BASE_URL}api/customers`)
        .then(response => {
            // Update the customers state with the retrieved data from the API response
            setCustomers(response.data.data);
        });
    }

    // Load all customers when the component mounts
    useEffect(()=>{
        // Call the function oadAllCustomers to load all customers
        loadAllCustomers();
    },[]);

    // Function to handle suspend the customer
    const suspendCustomer = (id) => {
        Swal.fire({
            title: "Suspend Customer Account",
            text: "Are you sure to suspend this customer account?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Suspend",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then((result) => {
            // If admin confirms suspension, send a PUT request to the API to suspend the customer
            if (result.isConfirmed) {
                // Make request to put API to update the status of the customer to 'Suspended'
                axios.put(`${BASE_URL}api/customers/${id}/suspend`, { status: false })
                .then(() => {
                    // Show success message when the customer is suspended
                    toast.success("Customer suspended successfully.", {
                        position: "top-right",
                        autoClose: 2000
                    });
                    // Reload the list of customers
                    loadAllCustomers();
                })
                .catch(() => {
                    // Show error toast if unable to suspend the customer
                    toast.error("Unable to suspend the customer..!", {
                        position: "top-right",
                        autoClose: 2000
                    });
                });
            }
        });
    }
    
    return (
        <div className="container-fluid px-5">

            {/* Customer Information Table title */}
            <h4 className="text-center fw-bold p-2">All Customers</h4>
            <div className="table-responsive mb-5">

                {/* Customer Information Table start */}
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
                    {/* Mapping through customers to display each customer */}
                    {customers.map((customer,index)=>(
                        <tr key={index}>
                            {/* Customer Id */}
                            <td>{customer.id}</td>

                            {/* Customer Name */}
                            <td>{customer.name}</td>

                            {/* Customer Email */}
                            <td>{customer.email}</td>

                            {/* Customer Phone */}
                            <td>{customer.phone}</td>

                            {/* Customer Gender */}
                            <td>{customer.gender}</td>

                            {/* Customer City */}
                            <td>{customer.city}</td>

                            {/* Customer Status */}
                            <td>{customer.status ? 
                                <span className="badge bg-success px-2">Active</span> : 
                                <span className="badge bg-danger px-2">Suspended</span>}
                            </td>
                            {/* Suspend Button */}
                            <td>
                                <button onClick={(event)=>suspendCustomer(customer.id)} className="btn btn-danger btn-sm shadow-none">
                                    <i className="fa-solid fa-ban me-1"></i> Suspend Account
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* Customer Information Table end */}

            </div>
        </div>
    );
}

// Export the CustomerList Component
export default CustomerList;