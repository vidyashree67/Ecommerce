package com.ecommercebackend.payment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.payment.entities.Payment;


/**
 * Repository interface for managing Payment entities in the database.
 */
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
	
	/**
     * Find a Payment entity by its payment ID.
     * 
     * @param paymentId The payment ID to search for.
     * @return The Payment entity with the specified payment ID.
     */
	Payment findByPaymentId(String paymentId);

}
