package com.ecommercebackend.cart.dtos;

/**
 * A Data Transfer Object (DTO) representing a product in the customer's cart.
 */
public class CartDTO {

	private int productId;
	private String productName;
	private String productCategory;
	private int price;
	private int quantity;
	private int customerId;
	
	// Getters and setters for the fields
	
	public int getProductId() {
		return productId;
	}
	
	public void setProductId(int productId) {
		this.productId = productId;
	}
	
	public String getProductName() {
		return productName;
	}
	
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public String getProductCategory() {
		return productCategory;
	}
	
	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}
	
	public int getPrice() {
		return price;
	}
	
	public void setPrice(int price) {
		this.price = price;
	}
	
	public int getQuantity() {
		return quantity;
	}
	
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	public int getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	
}
