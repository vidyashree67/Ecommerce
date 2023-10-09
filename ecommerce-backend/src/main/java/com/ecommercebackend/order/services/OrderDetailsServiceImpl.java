package com.ecommercebackend.order.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.order.entities.Order;
import com.ecommercebackend.order.entities.OrderDetails;
import com.ecommercebackend.order.repositories.OrderDefailsRepository;

/**
 * Service implementation for managing order details operations.
 */
@Service
public class OrderDetailsServiceImpl implements OrderDetailService {
	
    @Autowired
    OrderDefailsRepository orderDetailsRepository;

    /**
     * Save the given order details in the repository.
     *
     * @param orderDetails The order details to be saved.
     */
    @Override
    public void saveOrderDetails(OrderDetails orderDetails) {
        orderDetailsRepository.save(orderDetails);
    }

    /**
     * Find order details by their ID.
     *
     * @param id The ID of the order details to find.
     * @return The found order details, or null if not found.
     */
    @Override
    public OrderDetails findById(int id) {
        return orderDetailsRepository.findById(id).orElse(null);
    }

    /**
     * Find order details associated with the given order.
     *
     * @param order The order for which to find order details.
     * @return A list of order details associated with the order.
     */
    @Override
    public List<OrderDetails> findByOrder(Order order) {
        return orderDetailsRepository.findByOrder(order);
    }
}
