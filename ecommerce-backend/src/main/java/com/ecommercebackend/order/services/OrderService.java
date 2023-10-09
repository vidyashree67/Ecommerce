package com.ecommercebackend.order.services;

import java.util.List;

import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.order.entities.Order;

/**
 * This interface defines the contract for managing orders in the ecommerce system.
 */
public interface OrderService {

	Order saveOrder(Order order);
	List<Order> listAllOrders();
	List<Order> listCustomerOrders(Customer customer);
	Order findOrderById(int id);
}
