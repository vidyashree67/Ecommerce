package com.ecommercebackend.authentication.customer.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.authentication.customer.entities.Customer;

/**
 * Repository interface for managing Customer entities in the database.
 */
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	
	/**
     * Find a Customer entity by email.
     * 
     * @param email The email to search for.
     * @return An Optional containing the found Customer entity, or empty if not found.
     */
	Optional<Customer> findByEmail(String email);
	
	/**
     * Find a Customer entity by phone number.
     * 
     * @param phone The phone number to search for.
     * @return An Optional containing the found Customer entity, or empty if not found.
     */
	Optional<Customer> findByPhone(String phone);
	
}
