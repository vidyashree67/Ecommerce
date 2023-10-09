package com.ecommercebackend.address.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.address.entities.Address;

/**
 * Repository interface for managing Address entities in the database.
 */
public interface AddressRepository extends JpaRepository<Address, Integer> {

}
