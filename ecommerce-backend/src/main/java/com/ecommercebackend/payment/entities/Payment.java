package com.ecommercebackend.payment.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Entity class representing a payment in the e-commerce system.
 */
@Entity
@Table(name="payments")
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String paymentId;
    private String orderId;
    private Double amount;
    private String currency;
    private int customerId;
    private Date transactionTime;
    
    // Getters and setters for the fields
    
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getPaymentId() {
		return paymentId;
	}
	
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	
	public String getOrderId() {
		return orderId;
	}
	
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	
	public Double getAmount() {
		return amount;
	}
	
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	
	public String getCurrency() {
		return currency;
	}
	
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	
	public int getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	
	public Date getTransactionTime() {
		return transactionTime;
	}
	
	public void setTransactionTime(Date transactionTime) {
		this.transactionTime = transactionTime;
	}
	
}
