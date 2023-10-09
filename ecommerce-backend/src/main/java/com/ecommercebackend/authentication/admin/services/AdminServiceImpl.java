package com.ecommercebackend.authentication.admin.services;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.authentication.admin.entities.Admin;
import com.ecommercebackend.authentication.admin.repositories.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
    
    @Autowired
    private AdminRepository adminRepository;

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
        } catch (NoSuchAlgorithmException exception) {
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
     * Check if an admin with the given email exists.
     *
     * @param email The email address to be verified.
     * @return True if an admin with the provided email exists, false otherwise.
     */
    @Override
    public boolean verifyByEmail(String email) {
    	
        // Check if an admin with the given email exists
        return adminRepository.findByEmail(email).isPresent();
    }
    
    /**
     * Check if an admin with the given phone number exists.
     *
     * @param phone The phone number to be verified.
     * @return True if an admin with the provided phone number exists, false otherwise.
     */
    @Override
    public boolean verifyByPhone(String phone) {
        return adminRepository.findByPhone(phone).isPresent();
    }

    /**
     * Register a new admin.
     *
     * @param admin The admin to be registered.
     */
    @Override
    public void registerAdmin(Admin admin) {
    	
        // Hash the password before saving
        String hashedPassword = hashPassword(admin.getPassword());
        admin.setPassword(hashedPassword);
        
        // Save the admin in the repository
        adminRepository.save(admin);
    }

    /**
     * Authenticate admin login.
     *
     * @param email    The email of the admin.
     * @param password The password for authentication.
     * @return The authenticated admin or null if login fails.
     */
    @Override
    public Admin loginAdmin(String email, String password) {
    	
        // Attempt to find an admin with the provided email
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            // Verify password and return the admin if successful
            String hashedStoredPassword = admin.get().getPassword();
            if (verifyPassword(password, hashedStoredPassword)) {
                return admin.get();
            }
        }
        return null; // Return null if login fails
    }

    /**
     * Retrieve admin by ID.
     *
     * @param id The ID of the admin.
     * @return The admin or null if not found.
     */
    @Override
    public Admin findAdminById(int id) {
    	
        // Retrieve an admin by their ID from the repository, or return null if not found
        Optional<Admin> admin = adminRepository.findById(id);
        return admin.orElse(null);
    }
    
    /**
     * Update admin profile.
     *
     * @param admin The updated admin data.
     */
    @Override
    public void updateProfile(Admin admin) {
    	
        // Update the existing admin object in the database
        adminRepository.save(admin);
    }

    /**
     * Update admin password.
     *
     * @param adminId The ID of the admin.
     * @param admin   The admin object containing the new password.
     */
    @Override
    public void updatePassword(int adminId, Admin admin) {
    	
        // Fetch the existing admin object from the database
        Admin existingAdmin = findAdminById(adminId);

        if (existingAdmin != null && admin != null) {
        	
            // If newPassword is provided and not empty, hash it before updating
            String newPassword = admin.getPassword();
            if (newPassword != null && !newPassword.isEmpty()) {
                String hashedPassword = hashPassword(newPassword);
                existingAdmin.setPassword(hashedPassword);
            }

            // Update the password field of the existingAdmin object in the database
            adminRepository.save(existingAdmin);
        }
    }
}
