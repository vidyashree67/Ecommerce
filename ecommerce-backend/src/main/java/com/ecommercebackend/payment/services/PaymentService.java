package com.ecommercebackend.payment.services;

import java.util.List;

import com.ecommercebackend.payment.entities.Payment;
import com.ecommercebackend.payment.services.PaymentServiceImpl.TransactionDetails;

/**
 * This interface defines the contract for managing payment transactions in the ecommerce system.
 */
public interface PaymentService {

	Payment saveTransaction(Payment payment);
	List<Payment> listAllTransactions();
	TransactionDetails createTransaction(Double amount);
	Payment findPaymentByPaymentId(String paymentId);

}
