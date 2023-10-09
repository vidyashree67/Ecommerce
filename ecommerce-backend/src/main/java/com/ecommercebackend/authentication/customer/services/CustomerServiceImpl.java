package com.ecommercebackend.authentication.customer.services;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.authentication.customer.repositories.CustomerRepository;

/**
 * Service implementation for managing customer operations.
 */
@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    /**
     * Hash the password using SHA-256 algorithm.
     *
     * @param password The password to be hashed.
     * @return The hashed password as a hexadecimal string.
     */
    private String hashPassword(String password) {
        try {
            // Create a MessageDigest instance using SHA-256 algorithm
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            
            // Convert the password string into a byte array
            byte[] hashedBytes = md.digest(password.getBytes());
            
            // Convert the hashed bytes into a hexadecimal representation
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
            }
            
            // Return the hashed password as a string
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password.");
        }
    }

    /**
     * Verify if the provided password matches the hashed password.
     *
     * @param password       The provided password.
     * @param hashedPassword The stored hashed password to compare against.
     * @return True if the passwords match, false otherwise.
     */
    private boolean verifyPassword(String password, String hashedPassword) {
    	
        // Hash the provided password using the same algorithm and compare with the stored hash
        String hashedProvidedPassword = hashPassword(password);
        
        // Compare the two hashed passwords for equality
        return hashedProvidedPassword.equals(hashedPassword);
    }

    /**
     * Check if a customer with the given email exists.
     *
     * @param email The email to verify.
     * @return True if a customer with the email exists, false otherwise.
     */
    @Override
    public boolean verifyByEmail(String email) {
    	
        // Check if an customer with the given email exists
        return customerRepository.findByEmail(email).isPresent();
    }

    /**
     * Check if a customer with the given phone number exists.
     *
     * @param phone The phone number to verify.
     * @return True if a customer with the phone number exists, false otherwise.
     */
    @Override
    public boolean verifyByPhone(String phone) {
    	
        // Check if an customer with the given phone number exists
        return customerRepository.findByPhone(phone).isPresent();
    }

    /**
     * Register a new customer.
     *
     * @param customer The customer to be registered.
     */
    @Override
    public void registerCustomer(Customer customer) {
    	
        // Hash the password before saving
        String hashedPassword = hashPassword(customer.getPassword());
        
        // Set the hashed password
        customer.setPassword(hashedPassword);
        
        // Save the customer in the repository
        customerRepository.save(customer);
    }

    /**
     * Attempt to log in a customer.
     *
     * @param email    The customer's email.
     * @param password The customer's password.
     * @return The logged-in customer if successful, null otherwise.
     */
    @Override
    public Customer loginCustomer(String email, String password) {
    	
        // Attempt to find a customer with the provided email
        Optional<Customer> customer = customerRepository.findByEmail(email);
        if (customer.isPresent()) {
        	
            // Verify password and return the customer if successful
            String hashedStoredPassword = customer.get().getPassword();
            if (verifyPassword(password, hashedStoredPassword)) {
                return customer.get();
            }
        }
        // Return null if login fails
        return null;
    }

    /**
     * Retrieve a list of all customers.
     *
     * @return A list of all customers.
     */
    @Override
    public List<Customer> allCustomers() {
    	
        // Retrieve a list of all customers
        return customerRepository.findAll();
    }

    /**
     * Retrieve a customer by ID.
     *
     * @param id The ID of the customer to retrieve.
     * @return The retrieved customer, or null if not found.
     */
    @Override
    public Customer findCustomerById(int id) {
    	
        // Retrieve a customer by their ID from the repository, or return null if not found
        return customerRepository.findById(id).orElse(null);
    }
    
    /**
     * Update a customer's profile.
     *
     * @param customer The updated customer data.
     */
    @Override
    public void updateProfile(Customer customer) {
    	
        // Update the existing customer object in the database
        customerRepository.save(customer);
    }

    /**
     * Update a customer's password.
     *
     * @param customerId The ID of the customer whose password needs to be updated.
     * @param customer   The customer object containing the new password.
     */
    @Override
    public void updatePassword(int customerId, Customer customer) {
    	
        // Fetch the existing customer object from the database
        Customer existingCustomer = findCustomerById(customerId);

        if (existingCustomer != null && customer != null) {
        	
            // If newPassword is provided and not empty, hash it before updating
            String newPassword = customer.getPassword();
            if (newPassword != null && !newPassword.isEmpty()) {
            	
                // Hash the new password
                String hashedPassword = hashPassword(newPassword);
                
                // Set the hashed password
                existingCustomer.setPassword(hashedPassword);
            }

            // Update the password field of the existingCustomer object in the database
            customerRepository.save(existingCustomer);
        }
    }

    /**
     * Suspend a customer's account by setting the status to false.
     *
     * @param id The ID of the customer to suspend.
     */
    @Override
    public void suspendCustomer(int id) {
    	
        // Retrieve the customer by ID
        Customer customer = customerRepository.findById(id).orElse(null);
        if (customer != null) {
        	
            // Set the customer's status to false (suspended)
            customer.setStatus(false);
            
            // Save the updated customer in the repository
            customerRepository.save(customer);
        }
    }
}
