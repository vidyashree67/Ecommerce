package com.ecommercebackend.payment.services;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.payment.entities.Payment;
import com.ecommercebackend.payment.repositories.PaymentRepository;
import com.razorpay.RazorpayClient;

/**
 * Service implementation for managing payments.
 */
@Service
public class PaymentServiceImpl implements PaymentService {
	
	// Razorpay API keys and currency
	private static final String KEY = "rzp_test_8To6MHyfeAADzw";
	private static final String KEY_SECRET = "yuZwGFQv34gtkPGtYcNO3oef";
	private static final String CURRENCY = "INR";

	@Autowired
	PaymentRepository paymentRepository;

	/**
	 * Create a new transaction and return its details.
	 *
	 * @param amount The amount of the transaction.
	 * @return The details of the created transaction.
	 */
	public TransactionDetails createTransaction(Double amount) {
	    try {
	        JSONObject jsonObject = new JSONObject();
	        
	        // Amount in paisa (1 INR = 100 paisa)
	        jsonObject.put("amount", (amount * 100));
	        
	        // Transaction currency
	        jsonObject.put("currency", CURRENCY);

	        RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);
	        
	        // Create a new Razorpay order
	        com.razorpay.Order order = razorpayClient.orders.create(jsonObject);

	        // Get the ID of the created order
	        String orderId = order.get("id");

	        // Create a new TransactionDetails object
	        TransactionDetails transactionDetails = new TransactionDetails();
	        
	        // Set the order ID
	        transactionDetails.setOrderId(orderId);
	        
	        // Set the transaction amount
	        transactionDetails.setAmount(amount);
	        
	        // Set the transaction currency
	        transactionDetails.setCurrency(CURRENCY);

	        // Return the details of the created transaction
	        return transactionDetails;
	    } catch (Exception exception) {
	    	
	    	// Return any exception messages
	    	exception.getMessage();
	    }
	    
	    // Return null if there's an exception
	    return null;
	}

	/**
	 * Class to hold details of a transaction.
	 */
	public class TransactionDetails {
	    private String orderId; 	// ID of the order
	    private double amount; 		// Transaction amount
	    private String currency; 	// Transaction currency
	    
		public String getOrderId() {
			
			// Return the order ID
			return orderId;
		}
		
		public void setOrderId(String orderId) {
			
			// Set the order ID
			this.orderId = orderId;
		}
		
		public double getAmount() {
			
			// Return the transaction amount
			return amount;
		}
		
		public void setAmount(double amount) {
			
			// Set the transaction amount
			this.amount = amount;
		}
		
		public String getCurrency() {
			
			// Return the transaction currency
			return currency;
		}
		
		public void setCurrency(String currency) {
			
			// Set the transaction currency
			this.currency = currency;
		}
	}
	
	/**
	 * Save a payment transaction.
	 *
	 * @param payment The payment transaction to be saved.
	 * @return The saved payment transaction.
	 */
	@Override
	public Payment saveTransaction(Payment payment) {
		
		// Save the payment transaction using the repository
		return paymentRepository.save(payment);
	}
	
	/**
	 * Get a list of all payment transactions.
	 *
	 * @return A list of payment transactions.
	 */
	@Override
	public List<Payment> listAllTransactions() {
		
		// Retrieve and return a list of all payment transactions
		return paymentRepository.findAll();
	}
	
	/**
	 * Find a payment transaction by its payment ID.
	 *
	 * @param paymentId The payment ID to search for.
	 * @return The found payment transaction, or null if not found.
	 */
	@Override
    public Payment findPaymentByPaymentId(String paymentId) {
		
		// Find and return a payment transaction by its payment ID
        return paymentRepository.findByPaymentId(paymentId);
    }
}
