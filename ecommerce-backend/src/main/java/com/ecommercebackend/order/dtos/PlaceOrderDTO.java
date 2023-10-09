package com.ecommercebackend.order.dtos;

import java.util.List;

import com.ecommercebackend.address.entities.Address;
import com.ecommercebackend.cart.dtos.CartDTO;

/**
 * A Data Transfer Object (DTO) representing the information required to place an order.
 */
public class PlaceOrderDTO {

	private List<CartDTO> cart;
	private Address address;
	private int customerId;
	private String paymentId;
	
	// Getters and setters for the fields
	
	public List<CartDTO> getCart() {
		return cart;
	}
	
	public void setCart(List<CartDTO> cart) {
		this.cart = cart;
	}
	
	public Address getAddress() {
		return address;
	}
	
	public void setAddress(Address address) {
		this.address = address;
	}
	
	public int getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	
	public String getPaymentId() {
		return paymentId;
	}
	
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	
}
