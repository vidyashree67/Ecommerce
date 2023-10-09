package com.ecommercebackend.authentication.seller.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.authentication.seller.entities.Seller;

/**
 * Repository interface for managing Seller entities in the database.
 */
public interface SellerRepository extends JpaRepository<Seller, Integer> {
	
    /**
     * Find a Seller entity by email.
     * 
     * @param email The email of the seller.
     * @return An Optional containing the Seller entity with the specified email, if found.
     */
    Optional<Seller> findByEmail(String email);
    
    /**
     * Find a Seller entity by phone number.
     * 
     * @param phone The phone number of the seller.
     * @return An Optional containing the Seller entity with the specified phone number, if found.
     */
    Optional<Seller> findByPhone(String phone);
}
