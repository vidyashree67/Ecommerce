package com.ecommercebackend.cart.entities;

import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.product.entities.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entity class representing a customer's shopping cart.
 */ 
@Entity
@Table(name="carts")
public class Cart {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
	
    @ManyToOne
    @JoinColumn(name = "customerId")
    private Customer customer;
    
    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;
    
    private int quantity;
	
    // Getters and setters for the fields
    
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public Customer getCustomer() {
		return customer;
	}
	
	public void setCustomer(Customer customer) {
		this.customer = customer;
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
	
}
