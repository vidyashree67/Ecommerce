package com.ecommercebackend.order.services;

import java.util.List;

import com.ecommercebackend.order.entities.Order;
import com.ecommercebackend.order.entities.OrderDetails;

/**
 * This interface defines the contract for managing order details in the ecommerce system.
 */
public interface OrderDetailService {
	
	OrderDetails findById(int id);
	List<OrderDetails> findByOrder(Order order);
	void saveOrderDetails(OrderDetails orderDetails);
}
