package com.ecommercebackend.payment.dtos;

import java.util.Date;

/**
 * A Data Transfer Object (DTO) representing payment information.
 */
public class PaymentDTO {
	
	private String paymentId;
    private String orderId;
    private Double amount;
    private String currency;
    private int customerId;
    private Date transactionTime;
    
    // Getters and setters for the fields
    
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
