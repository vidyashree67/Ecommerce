package com.ecommercebackend.authentication.admin.controllers;

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

import com.ecommercebackend.authentication.admin.entities.Admin;
import com.ecommercebackend.authentication.admin.services.AdminService;
import com.ecommercebackend.authentication.dtos.LoginDTO;
import com.ecommercebackend.authentication.dtos.RegisterDTO;
import com.ecommercebackend.utils.Response;

/**
 * Controller class for managing Admin-related operations.
 */
@RestController
@RequestMapping("/api/admins")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * Endpoint for registering a new admin.
     *
     * @param registerDto The registration data.
     * @return ResponseEntity indicating the result of the registration.
     * @throws Exception If an error occurs during registration.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody RegisterDTO registerDto) throws Exception {
        
    	// Check if the email already exists
        if (adminService.verifyByEmail(registerDto.getEmail())) {
            throw new Exception("Email Address already exists!");
        }

        // Check if the phone number already exists
        if (adminService.verifyByPhone(registerDto.getPhone())) {
            throw new Exception("Phone Number already exists!");
        }

        // Create a new admin object and set properties
        Admin admin = new Admin();
        admin.setName(registerDto.getName());
        admin.setEmail(registerDto.getEmail());
        admin.setPhone(registerDto.getPhone());
        admin.setCity(registerDto.getCity());
        admin.setGender(registerDto.getGender());
        admin.setPassword(registerDto.getPassword());

        // Register the admin using adminService
        adminService.registerAdmin(admin);

        // Respond with a success message
        return ResponseEntity.ok("Admin registered successfully.");
    }

    /**
     * Endpoint for admin login.
     *
     * @param loginDto The login credentials.
     * @return ResponseEntity containing admin information upon successful login,
     *         or an error response if login fails.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginDTO loginDto) {
    	
        // Attempt to login admin
        Admin admin = adminService.loginAdmin(loginDto.getEmail(), loginDto.getPassword());
        if (admin != null)
            return Response.success(admin);
        else
            return Response.status(HttpStatus.NOT_FOUND);
    }

    /**
     * Endpoint for retrieving admin profile by ID.
     *
     * @param id The ID of the admin.
     * @return ResponseEntity containing the admin profile,
     *         or an error response if the admin is not found.
     */
    @GetMapping("{id}")
    public ResponseEntity<?> adminProfile(@PathVariable int id) {
    	
        // Retrieve admin profile by ID
        Admin admin = adminService.findAdminById(id);
        if (admin != null)
            return Response.success(admin);
        else
            return Response.status(HttpStatus.NOT_FOUND);
    }

    /**
     * Endpoint for updating admin profile.
     *
     * @param admin The updated admin data.
     * @param id The ID of the admin to be updated.
     * @return ResponseEntity indicating the result of the update,
     *         or a not-found response if the admin is not found.
     */
    @PutMapping("/{id}/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody Admin admin, @PathVariable int id) {
    	
        // Fetch the existing admin object from the database
        Admin existingAdmin = adminService.findAdminById(id);

        if (existingAdmin != null) {
            // Keep the value of the password field the same
            admin.setPassword(existingAdmin.getPassword());

            // Update the existing admin object in the database
            adminService.updateProfile(admin);

            // Respond with success message
            return ResponseEntity.ok("Profile updated successfully.");
        } else {
            // Respond with not-found status
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Endpoint for updating admin password.
     *
     * @param admin The admin object containing the new password.
     * @param id The ID of the admin whose password needs to be updated.
     * @return ResponseEntity indicating the result of the password update.
     */
    @PutMapping("/{id}/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody Admin admin, @PathVariable int id) {
    	
        // Update admin's password using adminService
        adminService.updatePassword(id, admin);

        // Respond with success message
        return ResponseEntity.ok("Password updated successfully.");
    }
}
