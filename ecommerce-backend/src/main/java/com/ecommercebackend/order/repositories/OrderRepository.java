package com.ecommercebackend.order.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.order.entities.Order;


/**
 * Repository interface for managing Order entities in the database.
 */
public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	/**
     * Find a list of Order entities associated with a specific Customer.
     * 
     * @param customer The Customer entity to search for.
     * @return A list of Order entities associated with the specified Customer.
     */
	List<Order> findByCustomer(Customer customer);
	
}
