package com.ecommercebackend.authentication.seller.controllers;

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

import com.ecommercebackend.authentication.dtos.LoginDTO;
import com.ecommercebackend.authentication.dtos.RegisterDTO;
import com.ecommercebackend.authentication.seller.entities.Seller;
import com.ecommercebackend.authentication.seller.services.SellerService;
import com.ecommercebackend.utils.Response;

/**
 * Controller class for managing Seller-related operations.
 */
@CrossOrigin
@RestController
@RequestMapping("/api/sellers")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    /**
     * Endpoint for registering a new seller.
     *
     * @param registerDto The registration data.
     * @return ResponseEntity indicating the result of the registration.
     * @throws Exception If an error occurs during registration.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerSeller(@RequestBody RegisterDTO registerDto) throws Exception {
    	
        // Check if the provided email address already exists in the database
        if (sellerService.verifyByEmail(registerDto.getEmail())) {
            throw new Exception("Email Address already exists.");
        }
        
        // Check if the provided phone number already exists in the database
        if(sellerService.verifyByPhone(registerDto.getPhone())) {
            throw new Exception("Phone Number already exists.");
        }

        // Create a new Seller instance to store the registration data
        Seller seller = new Seller();
        seller.setName(registerDto.getName());
        seller.setEmail(registerDto.getEmail());
        seller.setPhone(registerDto.getPhone());
        seller.setCity(registerDto.getCity());
        seller.setGender(registerDto.getGender());
        seller.setPassword(registerDto.getPassword());

        // Call the sellerService to register the new seller
        sellerService.registerSeller(seller);

        // Return a successful response indicating successful registration
        return ResponseEntity.ok("Seller registered successfully.");
    }


    /**
     * Endpoint for seller login.
     *
     * @param loginDto The login credentials.
     * @return ResponseEntity containing seller information upon successful login,
     *         or an error response if login fails.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginSeller(@RequestBody LoginDTO loginDto) {
        Seller seller = sellerService.loginSeller(loginDto.getEmail(), loginDto.getPassword());
        if (seller != null) {
            if (seller.isStatus()) {
                // Successful login
                return Response.success(seller);
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
     * Endpoint for retrieving all sellers.
     *
     * @return ResponseEntity containing a list of all sellers.
     */
    @GetMapping
    public ResponseEntity<?> allSellers() {
        List<Seller> result = sellerService.allSellers();
        return Response.success(result);
    }

	/**
	 * Endpoint for retrieving seller profile by ID.
	 *
	 * @param id The ID of the seller.
	 * @return ResponseEntity containing the seller profile,
	 *         or an error response if the seller is not found.
	 */
	@GetMapping("{id}")
	public ResponseEntity<?> sellerProfile(@PathVariable int id) {
		
	    // Find the seller by ID using the seller service
	    Seller seller = sellerService.findSellerById(id);
	
	    // Check if the seller exists
	    if (seller != null) {
	        // Return a successful response with the seller profile
	        return Response.success(seller);
	    } else {
	        // Return a not-found response if the seller is not found
	        return Response.status(HttpStatus.NOT_FOUND);
	    }
	}

    /**
     * Endpoint for updating seller profile.
     *
     * @param seller The updated seller data.
     * @param id The ID of the seller to be updated.
     * @return ResponseEntity indicating the result of the update,
     *         or a not-found response if the seller is not found.
     */
    @PutMapping("/{id}/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody Seller seller, @PathVariable int id) {
        // Fetch the existing seller object from the database
        Seller existingSeller = sellerService.findSellerById(id);

        if (existingSeller != null) {
            // Keep the value of the password field the same
            seller.setPassword(existingSeller.getPassword());

            // Update the existing seller object in the database
            sellerService.updateProfile(seller);
            return ResponseEntity.ok("Profile updated successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint for updating seller password.
     *
     * @param seller The seller object containing the new password.
     * @param id       The ID of the seller whose password needs to be updated.
     * @return ResponseEntity indicating the result of the password update.
     */
    @PutMapping("/{id}/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Seller seller, @PathVariable int id) {
        sellerService.updatePassword(id, seller);
        return ResponseEntity.ok("Password updated successfully.");
    }

    /**
     * Endpoint for suspending a seller's account.
     *
     * @param id The ID of the seller whose account needs to be suspended.
     * @return ResponseEntity indicating the result of the account suspension.
     */
    @PutMapping("/{id}/suspend")
    public ResponseEntity<?> suspendSeller(@PathVariable int id) {
        // Call the service to restrict the seller's account
        sellerService.suspendSeller(id);
        return ResponseEntity.ok("Seller account restricted successfully.");
    }
}
