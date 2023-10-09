package com.ecommercebackend.order.entities;

import java.util.Date;

import com.ecommercebackend.address.entities.Address;
import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.payment.entities.Payment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entity class representing an order in the e-commerce system.
 */
@Entity
@Table(name="orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Date orderDate;
	
	@ManyToOne
	@JoinColumn(name="customerId")
	private Customer customer;
	
	@ManyToOne
	@JoinColumn(name="addressId")
	private Address address;
	
	@ManyToOne
	@JoinColumn(name="paymentId")
	private Payment payment;
	
	// Getters and setters for the fields
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}
	
}
