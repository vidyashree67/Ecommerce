package com.ecommercebackend.subcategory.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.subcategory.entities.Subcategory;

/**
 * Repository interface for managing Subcategory entities in the database.
 */
public interface SubcategoryRepository extends JpaRepository<Subcategory, Integer> {

    /**
     * Retrieves a list of active subcategories.
     *
     * @return A list of active subcategories.
     */
    List<Subcategory> findAllByStatusTrue();

}
