package com.ecommercebackend.category.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.category.entities.Category;
import com.ecommercebackend.category.repositories.CategoryRepository;

/**
 * Service implementation for managing category operations.
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Save a new category to the database.
     *
     * @param category The category to be saved.
     */
    @Override
    public void saveCategory(Category category) {
        categoryRepository.save(category);
    }

    /**
     * Retrieve a list of all categories.
     *
     * @return A list of all categories.
     */
    @Override
    public List<Category> listAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Retrieve a list of all active categories.
     *
     * @return A list of active categories.
     */
    @Override
    public List<Category> listAllActiveCategories() {
        return categoryRepository.findAllByStatusTrue();
    }

    /**
     * Retrieve a category by its ID.
     *
     * @param id The ID of the category to retrieve.
     * @return The retrieved category, or null if not found.
     */
    @Override
    public Category findCategoryById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }
    
    /**
     * Update an existing category.
     *
     * @param category The updated category information.
     */
    @Override
    public void updateCategory(Category category) {
    	
        // Find the existing category by ID
        Category existingCategory = categoryRepository.findById(category.getId()).orElse(null);
        
        // Update the existing category's properties
        if (existingCategory != null) {
            existingCategory.setName(category.getName());
            existingCategory.setDescription(category.getDescription());
            existingCategory.setStatus(category.isStatus());
            
            // Save the updated category back to the database
            categoryRepository.save(existingCategory);
        }
    }
}
