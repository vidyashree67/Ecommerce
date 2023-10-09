package com.ecommercebackend.authentication.admin.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.authentication.admin.entities.Admin;

/**
 * Repository interface for managing Admin entities in the database.
 */
public interface AdminRepository extends JpaRepository<Admin, Integer> {
	
	/**
     * Find an Admin entity by email.
     * 
     * @param email The email of the Admin.
     * @return An Optional containing the found Admin entity or null.
     */
    Optional<Admin> findByEmail(String email);
    
    /**
     * Find an Admin entity by phone number.
     * 
     * @param phone The phone number of the Admin.
     * @return An Optional containing the found Admin entity or null.
     */
    Optional<Admin> findByPhone(String phone);
    
}
