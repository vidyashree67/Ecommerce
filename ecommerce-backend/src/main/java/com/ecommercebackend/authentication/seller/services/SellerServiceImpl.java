package com.ecommercebackend.authentication.seller.services;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.authentication.seller.entities.Seller;
import com.ecommercebackend.authentication.seller.repositories.SellerRepository;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    /**
     * Hash the password using SHA-256 algorithm.
     *
     * @param password The password to be hashed.
     * @return The hashed password as a hexadecimal string.
     */
    private String hashPassword(String password) {
        try {
            // Create a MessageDigest instance with the SHA-256 algorithm
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // Calculate the hash of the password bytes
            byte[] hashedBytes = md.digest(password.getBytes());

            // Create a StringBuilder to store the hexadecimal hash string
            StringBuilder sb = new StringBuilder();

            // Iterate over the hashed bytes
            for (byte b : hashedBytes) {
                sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
            }

            // Return the hexadecimal hash string
            return sb.toString();
            
        } catch (NoSuchAlgorithmException e) {
            // Handle an exception if the specified algorithm is not available
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
        String hashedProvidedPassword = hashPassword(password);
        return hashedProvidedPassword.equals(hashedPassword);
    }

    /**
     * Verify if a seller with the given email already exists.
     *
     * @param email The email to verify.
     * @return True if a seller with the given email exists, false otherwise.
     */
    @Override
    public boolean verifyByEmail(String email) {
        return sellerRepository.findByEmail(email).isPresent();
    }

    /**
     * Verify if a seller with the given phone number already exists.
     *
     * @param phone The phone number to verify.
     * @return True if a seller with the given phone number exists, false otherwise.
     */
    @Override
    public boolean verifyByPhone(String phone) {
        return sellerRepository.findByPhone(phone).isPresent();
    }

    /**
     * Register a new seller.
     *
     * @param seller The seller entity to be registered.
     */
    @Override
    public void registerSeller(Seller seller) {
        // Hash the password before saving
        String hashedPassword = hashPassword(seller.getPassword());
        seller.setPassword(hashedPassword);
        
        // Save the seller entity to the repository
        sellerRepository.save(seller);
    }

    /**
     * Authenticate a seller during login.
     *
     * @param email    The email of the seller.
     * @param password The password of the seller.
     * @return The authenticated seller if successful, otherwise null.
     */
    @Override
    public Seller loginSeller(String email, String password) {
        // Find a seller by email
        Optional<Seller> seller = sellerRepository.findByEmail(email);
        if (seller.isPresent()) {
            String hashedStoredPassword = seller.get().getPassword();
            if (verifyPassword(password, hashedStoredPassword)) {
                // If password matches, return the authenticated seller
                return seller.get();
            }
        }
        // Return null if email or password is incorrect
        return null;
    }

    /**
     * Get a list of all sellers.
     *
     * @return A list of all sellers.
     */
    @Override
    public List<Seller> allSellers() {
        // Retrieve a list of all sellers
        return sellerRepository.findAll();
    }

    /**
     * Find a seller by their ID.
     *
     * @param id The ID of the seller.
     * @return The seller entity if found, otherwise null.
     */
    @Override
    public Seller findSellerById(int id) {
        // Find a seller by their ID or return null if not found
        return sellerRepository.findById(id).orElse(null);
    }

    /**
     * Update the profile of a seller.
     *
     * @param seller The updated seller entity.
     */
    @Override
    public void updateProfile(Seller seller) {
        // Update the existing seller's profile in the database
        sellerRepository.save(seller);
    }

    /**
     * Update the password of a seller.
     *
     * @param sellerId The ID of the seller.
     * @param seller   The seller entity containing the updated password.
     */
    @Override
    public void updatePassword(int sellerId, Seller seller) {
    	
        // Fetch the existing seller object from the database
        Seller existingSeller = findSellerById(sellerId);

        if (existingSeller != null && seller != null) {
        	
            // If a new password is provided and not empty, hash it before updating
            String newPassword = seller.getPassword();
            if (newPassword != null && !newPassword.isEmpty()) {
                String hashedPassword = hashPassword(newPassword);
                existingSeller.setPassword(hashedPassword);
            }

            // Update the password field of the existingSeller object in the database
            sellerRepository.save(existingSeller);
        }
    }

    /**
     * Suspend a seller's account by setting their status to 'false'.
     *
     * @param id The ID of the seller to suspend.
     */
    @Override
    public void suspendSeller(int id) {
    	
        // Find a seller by ID or return null if not found
        Seller seller = sellerRepository.findById(id).orElse(null);
        
        if (seller != null) {
        	
            // Set the seller's status to 'false' (suspended)
            seller.setStatus(false);
            
            // Save the updated seller entity to the repository
            sellerRepository.save(seller);
        }
    }
}
