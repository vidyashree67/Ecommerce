package com.ecommercebackend.order.dtos;

import org.springframework.beans.BeanUtils;

import com.ecommercebackend.order.entities.OrderDetails;
import com.ecommercebackend.product.entities.Product;

/**
 * A Data Transfer Object (DTO) representing order details, including product and quantity.
 */
public class OrderDetailsDTO {
	
	private int id;
	private Product product;
	private int quantity;
	
	// Getters and setters for the fields
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public static OrderDetailsDTO fromEntity(OrderDetails entity) {
		OrderDetailsDTO orderDetailsDto = new OrderDetailsDTO();
		BeanUtils.copyProperties(entity, orderDetailsDto);		
		return orderDetailsDto;
	}
}
