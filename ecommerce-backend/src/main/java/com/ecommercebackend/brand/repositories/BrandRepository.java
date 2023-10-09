package com.ecommercebackend.brand.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.brand.entities.Brand;

/**
 * Repository interface for managing Brand entities in the database.
 */
public interface BrandRepository extends JpaRepository<Brand, Integer> {

	/**
     * Find all active Brand entities.
     * 
     * @return A list of active Brand entities.
     */
	List<Brand> findAllByStatusTrue();
}
