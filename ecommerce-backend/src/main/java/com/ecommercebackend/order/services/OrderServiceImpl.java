package com.ecommercebackend.order.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.order.entities.Order;
import com.ecommercebackend.order.repositories.OrderRepository;

import java.util.List;

/**
 * Service implementation for managing orders.
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Save an order.
     *
     * @param order The order to be saved.
     * @return The saved order.
     */
    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Get a list of all orders.
     *
     * @return A list of orders.
     */
    @Override
    public List<Order> listAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Get a list of orders placed by a specific customer.
     *
     * @param customer The customer for whom to retrieve orders.
     * @return A list of orders placed by the customer.
     */
    @Override
    public List<Order> listCustomerOrders(Customer customer) {
        return orderRepository.findByCustomer(customer);
    }

    /**
     * Find an order by its ID.
     *
     * @param id The ID of the order to find.
     * @return The found order, or null if not found.
     */
    @Override
    public Order findOrderById(int id) {
        return orderRepository.findById(id).orElse(null);
    }
}
