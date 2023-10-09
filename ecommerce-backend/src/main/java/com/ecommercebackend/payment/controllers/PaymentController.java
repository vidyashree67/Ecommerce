package com.ecommercebackend.payment.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.payment.dtos.PaymentDTO;
import com.ecommercebackend.payment.entities.Payment;
import com.ecommercebackend.payment.services.PaymentService;
import com.ecommercebackend.payment.services.PaymentServiceImpl.TransactionDetails;

/**
 * Controller class for managing payment-related operations.
 */
@CrossOrigin
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    /**
     * Endpoint for creating a new transaction.
     *
     * @param amount The transaction amount.
     * @return ResponseEntity containing transaction details upon success,
     *         or an internal server error response.
     */
    @PostMapping("/createTransaction")
    public ResponseEntity<TransactionDetails> createTransaction(@RequestParam Double amount) {
    	
        // Create a new transaction and retrieve its details
        TransactionDetails transactionDetails = paymentService.createTransaction(amount);
        if (transactionDetails != null) {
            return ResponseEntity.ok(transactionDetails);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Endpoint for saving a transaction.
     *
     * @param paymentDto The payment data to be saved.
     * @return ResponseEntity indicating the result of the transaction saving process.
     */
    @PostMapping("/saveTransaction")
    public ResponseEntity<?> saveTransaction(@RequestBody PaymentDTO paymentDto) {
        try {
            // Convert the PaymentDTO to Payment entity before saving
            Payment payment = new Payment();
            payment.setPaymentId(paymentDto.getPaymentId());
            payment.setOrderId(paymentDto.getOrderId());
            payment.setAmount(paymentDto.getAmount());
            payment.setCurrency(paymentDto.getCurrency());
            payment.setCustomerId(paymentDto.getCustomerId());
            payment.setTransactionTime(paymentDto.getTransactionTime());

            // Save the payment transaction
            paymentService.saveTransaction(payment);

            return ResponseEntity.ok("Transaction details saved successfully.");
        } catch (Exception e) {
            // Handle any exception that occurs during the payment saving process
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Endpoint for listing all transactions.
     *
     * @return ResponseEntity containing a list of all payment transactions.
     */
    @GetMapping("/transactions")
    public ResponseEntity<?> listAllTransactions() {
        List<Payment> transactions = paymentService.listAllTransactions();
        return ResponseEntity.ok(transactions);
    }

}
