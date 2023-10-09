package com.ecommercebackend.address.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.address.entities.Address;
import com.ecommercebackend.address.repositories.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {
	
    @Autowired 
    AddressRepository addressRepository;
    
    /**
     * Save an address in the database.
     *
     * @param address The address to be saved.
     * @return The saved address.
     */
    @Override
    public Address saveAddress(Address address) {
    	
        // Save the provided address in the database and return the saved address
        return addressRepository.save(address);
    }

    /**
     * Retrieve an address by its ID from the database.
     *
     * @param id The ID of the address to retrieve.
     * @return The retrieved address, or null if not found.
     */
    @Override
    public Address listAllAddresses(int id) {
    	
        // Retrieve an address by its ID from the database, or return null if not found
        return addressRepository.findById(id).orElse(null);
    }

}
