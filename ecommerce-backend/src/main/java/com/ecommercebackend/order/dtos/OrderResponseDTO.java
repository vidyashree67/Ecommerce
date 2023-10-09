package com.ecommercebackend.order.dtos;

import java.util.List;

import com.ecommercebackend.order.entities.Order;

/**
 * A Data Transfer Object (DTO) representing an order response, including order details.
 */
public class OrderResponseDTO {

	private Order order;
	private List<OrderDetailsDTO> orderDetails;
	
	// Getters and setters for the fields
	
	public Order getOrder() {
		return order;
	}
	
	public void setOrder(Order order) {
		this.order = order;
	}
	
	public List<OrderDetailsDTO> getOrderDetails() {
		return orderDetails;
	}
	
	public void setOrderDetails(List<OrderDetailsDTO> orderDetails) {
		this.orderDetails = orderDetails;
	}
	
}
