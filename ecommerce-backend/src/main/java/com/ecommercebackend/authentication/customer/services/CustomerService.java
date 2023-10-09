package com.ecommercebackend.authentication.customer.services;

import java.util.List;

import com.ecommercebackend.authentication.customer.entities.Customer;

/**
 * This interface defines the contract for managing customers in the ecommerce system.
 */
public interface CustomerService {

	boolean verifyByEmail(String email);
	boolean verifyByPhone(String phone);
	void registerCustomer(Customer customer);
	Customer loginCustomer(String email, String password);
	List<Customer> allCustomers();
	Customer findCustomerById(int id);
	void updateProfile(Customer customer);
	void updatePassword(int customerId, Customer customer);
	void suspendCustomer(int id);
	
}
