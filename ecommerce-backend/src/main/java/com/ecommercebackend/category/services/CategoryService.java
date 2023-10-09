package com.ecommercebackend.category.services;

import java.util.List;

import com.ecommercebackend.category.entities.Category;

/**
 * This interface defines the contract for managing product categories in the ecommerce system.
 */
public interface CategoryService {
	
	void saveCategory(Category category);
	List<Category> listAllCategories();
	List<Category> listAllActiveCategories();
	Category findCategoryById(int id);
	void updateCategory(Category category);
}
