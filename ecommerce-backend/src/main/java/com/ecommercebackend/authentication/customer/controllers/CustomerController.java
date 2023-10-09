package com.ecommercebackend.authentication.customer.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.authentication.customer.services.CustomerService;
import com.ecommercebackend.authentication.dtos.LoginDTO;
import com.ecommercebackend.authentication.dtos.RegisterDTO;
import com.ecommercebackend.utils.Response;

/**
 * Controller class for managing Customer-related operations.
 */
@CrossOrigin
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    /**
     * Endpoint for registering a new customer.
     *
     * @param registerDto The registration data.
     * @return ResponseEntity indicating the result of the registration.
     * @throws Exception If an error occurs during registration.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody RegisterDTO registerDto) throws Exception {
    	
        // Check if the provided email address already exists in the database
        if (customerService.verifyByEmail(registerDto.getEmail())) {
            throw new Exception("Email Address already exists.");
        }
        
        // Check if the provided phone number already exists in the database
        if(customerService.verifyByPhone(registerDto.getPhone())) {
            throw new Exception("Phone Number already exists.");
        }

        // Create a new Customer instance to store the registration data
        Customer customer = new Customer();
        customer.setName(registerDto.getName());
        customer.setEmail(registerDto.getEmail());
        customer.setPhone(registerDto.getPhone());
        customer.setCity(registerDto.getCity());
        customer.setGender(registerDto.getGender());
        customer.setPassword(registerDto.getPassword());

        // Call the customerService to register the new customer
        customerService.registerCustomer(customer);

        // Return a successful response indicating successful registration
        return ResponseEntity.ok("Customer registered successfully.");
    }


    /**
     * Endpoint for customer login.
     *
     * @param loginDto The login credentials.
     * @return ResponseEntity containing customer information upon successful login,
     *         or an error response if login fails.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginSeller(@RequestBody LoginDTO loginDto) {
        Customer customer = customerService.loginCustomer(loginDto.getEmail(), loginDto.getPassword());
        if (customer != null) {
            if (customer.isStatus()) {
                // Successful login
                return Response.success(customer);
            } else {
                // Account suspended
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account suspended");
            }
        } else {
            // Invalid email or password
            return Response.status(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Endpoint for retrieving all customers.
     *
     * @return ResponseEntity containing a list of all customers.
     */
    @GetMapping
    public ResponseEntity<?> allCustomers() {
        List<Customer> result = customerService.allCustomers();
        return Response.success(result);
    }

	/**
	 * Endpoint for retrieving customer profile by ID.
	 *
	 * @param id The ID of the customer.
	 * @return ResponseEntity containing the customer profile,
	 *         or an error response if the customer is not found.
	 */
	@GetMapping("{id}")
	public ResponseEntity<?> customerProfile(@PathVariable int id) {
		
	    // Find the customer by ID using the customer service
	    Customer customer = customerService.findCustomerById(id);
	
	    // Check if the customer exists
	    if (customer != null) {
	        // Return a successful response with the customer profile
	        return Response.success(customer);
	    } else {
	        // Return a not-found response if the customer is not found
	        return Response.status(HttpStatus.NOT_FOUND);
	    }
	}

    /**
     * Endpoint for updating customer profile.
     *
     * @param customer The updated customer data.
     * @param id The ID of the customer to be updated.
     * @return ResponseEntity indicating the result of the update,
     *         or a not-found response if the customer is not found.
     */
    @PutMapping("/{id}/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody Customer customer, @PathVariable int id) {
        // Fetch the existing customer object from the database
        Customer existingCustomer = customerService.findCustomerById(id);

        if (existingCustomer != null) {
            // Keep the value of the password field the same
            customer.setPassword(existingCustomer.getPassword());

            // Update the existing customer object in the database
            customerService.updateProfile(customer);
            return ResponseEntity.ok("Profile updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint for updating customer password.
     *
     * @param customer The customer object containing the new password.
     * @param id       The ID of the customer whose password needs to be updated.
     * @return ResponseEntity indicating the result of the password update.
     */
    @PutMapping("/{id}/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Customer customer, @PathVariable int id) {
        customerService.updatePassword(id, customer);
        return ResponseEntity.ok("Password updated successfully.");
    }

    /**
     * Endpoint for suspending a customer's account.
     *
     * @param id The ID of the customer whose account needs to be suspended.
     * @return ResponseEntity indicating the result of the account suspension.
     */
    @PutMapping("/{id}/suspend")
    public ResponseEntity<?> suspendCustomer(@PathVariable int id) {
        // Call the service to restrict the customer's account
        customerService.suspendCustomer(id);
        return ResponseEntity.ok("Customer account restricted successfully.");
    }
}
