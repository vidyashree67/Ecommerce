package com.ecommercebackend.cart.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.cart.entities.Cart;

/**
 * Repository interface for managing Cart entities in the database.
 */
public interface CartRepository extends JpaRepository<Cart, Integer> {
	
	/**
     * Find all Cart entities associated with a specific customer.
     * 
     * @param customerId The ID of the customer.
     * @return A list of Cart entities associated with the customer.
     */
    List<Cart> findByCustomerId(int customerId);
    
    /**
     * Find a Cart entity associated with a specific customer and product.
     * 
     * @param customerId The ID of the customer.
     * @param productId The ID of the product.
     * @return The Cart entity associated with the customer and product.
     */
    Cart findByCustomerIdAndProductId(int customerId, int productId);
    
    /**
     * Delete all Cart entities associated with a specific customer.
     * 
     * @param customerId The ID of the customer.
     */
    void deleteByCustomerId(int customerId);
    
}
