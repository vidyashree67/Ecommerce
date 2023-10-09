package com.ecommercebackend.address.services;

import com.ecommercebackend.address.entities.Address;

/**
 * This interface defines the contract for managing addresses in the ecommerce system.
 */
public interface AddressService {
	
	Address saveAddress(Address address);
	Address listAllAddresses(int id);
}
