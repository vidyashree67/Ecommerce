// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import { useState, useEffect } from "react";
import axios from "axios";


const PaymentTransactionDetails = () => {

    // Initialize a state variable to track the payments
    const [payments, setPayments]=useState([]);

    // Function to fetch and display payment transactions
    const fetchPaymentTransactions = () => {
        // Send a GET request to the API to retrieve payment transactions data
        axios.get(`${BASE_URL}api/payment/transactions`)
        .then(response => {
            // Update the payments state with the retrieved data from the API response
            setPayments(response.data);
        });
    }

    // Fetch payment transactions when the component mounts
    useEffect(()=>{
        // Call the function fetchPaymentTransactions to fetch all payment transactions
        fetchPaymentTransactions();
    },[]);

  return (    
    <div className="container-fluid px-5">

        {/* Payment Transaction Details Table Title */}
        <h4 className="text-center fw-bold p-2">All Payment Transactions</h4>
        <div className="table-responsive">

            {/* Payment Transaction Details Table start */}
            <table className="table table-bordered table-light table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Id</th>
                        <th>Payment Id</th>
                        <th>Order Id</th>
                        <th>Customer Id</th>
                        <th>Payment Amount</th>
                        <th>Payment Date / Time</th>
                        <th>Currency</th>
                    </tr>
                </thead>
                <tbody>
                {/* Mapping through payments to display each payment */}
                {payments.map(payment=>(
                    <tr key={payment.id}>

                        {/* Payment Table Primary Id */}
                        <td>{payment.id}</td>

                        {/* Payment Id */}
                        <td>{payment.paymentId}</td>

                        {/* Order Id */}
                        <td>{payment.orderId}</td>

                        {/* Customer Id */}
                        <td>{payment.customerId}</td>

                        {/* Payment Amount */}
                        <td>&#8377; {payment.amount}</td>

                        {/* Payment Transaction Time */}
                        <td>{payment.transactionTime}</td>

                        {/* Payment Currency */}
                        <td>{payment.currency}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Payment Transaction Details Table end */}

        </div>
    </div>
  );
}

// Export the PaymentTransactionDetails Component
export default PaymentTransactionDetails;
