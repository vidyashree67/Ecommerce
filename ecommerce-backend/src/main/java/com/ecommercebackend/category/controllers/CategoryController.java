package com.ecommercebackend.category.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.category.entities.Category;
import com.ecommercebackend.category.services.CategoryService;
import com.ecommercebackend.utils.Response;

/**
 * Controller class for managing Category-related operations.
 */
@RestController
@RequestMapping("/api/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * Endpoint for adding a new category.
     *
     * @param category The category to be added.
     * @return ResponseEntity indicating the result of the category addition.
     */
    @PostMapping("/add")
    public ResponseEntity<?> saveCategory(@RequestBody Category category) {
        // Save the new category using categoryService
        categoryService.saveCategory(category);

        // Respond with success message
        return ResponseEntity.ok("Category saved.");
    }

    /**
     * Endpoint for listing all categories.
     *
     * @return ResponseEntity containing a list of all categories.
     */
    @GetMapping
    public ResponseEntity<?> listAllCategories() {
        return ResponseEntity.ok(categoryService.listAllCategories());
    }

    /**
     * Endpoint for listing all active categories.
     *
     * @return ResponseEntity containing a list of all active categories.
     */
    @GetMapping("/active")
    public ResponseEntity<?> listAllActiveCategories() {
        return ResponseEntity.ok(categoryService.listAllActiveCategories());
    }

    /**
     * Endpoint for finding a category by its ID.
     *
     * @param id The ID of the category to be retrieved.
     * @return ResponseEntity containing the retrieved category,
     *         or an error response if the category is not found.
     */
    @GetMapping("/{id}/edit")
    public ResponseEntity<?> findCategoryById(@PathVariable int id) {
        return ResponseEntity.ok(categoryService.findCategoryById(id));
    }

    /**
     * Endpoint for updating a category.
     *
     * @param category The updated category data.
     * @param id The ID of the category to be updated.
     * @return ResponseEntity indicating the result of the category update,
     *         along with the updated category information.
     */
    @PutMapping("/{id}/update")
    public ResponseEntity<?> updateCategory(Category category, @PathVariable int id) {
        // Set the ID of the category
        category.setId(id);

        // Update the category using categoryService
        categoryService.updateCategory(category);

        // Respond with success message
        return Response.success(category);
    }
}
