package com.ecommercebackend.product.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.product.entities.Product;

/**
 * Repository interface for managing Product entities in the database.
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {
	
    /**
     * Find a list of Product entities by seller ID, sorted according to the specified sort order.
     * 
     * @param sellerId The ID of the seller.
     * @param sort The sort order to be applied.
     * @return A list of Product entities belonging to the specified seller ID, sorted as specified.
     */
    List<Product> findBySellerId(int sellerId, Sort sort);
    
    /**
     * Find a list of Product entities by subcategory ID, sorted according to the specified sort order.
     * 
     * @param subcategoryId The ID of the subcategory.
     * @param sort The sort order to be applied.
     * @return A list of Product entities belonging to the specified subcategory ID, sorted as specified.
     */
    List<Product> findBySubcategoryId(int subcategoryId, Sort sort);
    
    /**
     * Find all Product entities, sorted according to the specified sort order.
     * 
     * @param sort The sort order to be applied.
     * @return A list of all Product entities, sorted as specified.
     */
    List<Product> findAll(Sort sort);
    
    /**
     * Find a list of Product entities by category ID and name containing a search term.
     * 
     * @param categoryId The ID of the category.
     * @param search The search term to be matched within the name.
     * @return A list of Product entities matching the specified category ID and containing the search term in the name.
     */
    List<Product> findByCategoryIdAndNameContaining(int categoryId, String search);
    
    /**
     * Find a list of Product entities containing a search term within the name.
     * 
     * @param search The search term to be matched within the name.
     * @return A list of Product entities containing the search term in the name.
     */
    List<Product> findByNameContaining(String search);
}
