package com.ecommercebackend.category.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.category.entities.Category;

/**
 * Repository interface for managing Category entities in the database.
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {

	 /**
     * Find all active Category entities.
     * 
     * @return A list of active Category entities.
     */
	List<Category> findAllByStatusTrue();
	
}
