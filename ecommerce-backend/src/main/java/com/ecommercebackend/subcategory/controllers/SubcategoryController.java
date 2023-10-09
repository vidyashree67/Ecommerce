package com.ecommercebackend.subcategory.controllers;

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

import com.ecommercebackend.subcategory.entities.Subcategory;
import com.ecommercebackend.subcategory.services.SubcategoryService;
import com.ecommercebackend.utils.Response;

/**
 * Controller class for managing Subcategory-related operations.
 */
@RestController
@RequestMapping("/api/subcategories")
@CrossOrigin
public class SubcategoryController {

    @Autowired
    private SubcategoryService subcategoryService;
    
    /**
     * Endpoint to add a new subcategory.
     *
     * @param subcategory The subcategory data to be added.
     * @return ResponseEntity indicating the result of the subcategory addition.
     */
    @PostMapping("/add")
    public ResponseEntity<?> saveSubcategory(@RequestBody Subcategory subcategory) {
        
        // Save the provided subcategory
        subcategoryService.saveSubcategory(subcategory);
        
        // Respond with success message
        return ResponseEntity.ok("Subcategory saved.");
    }
    
    /**
     * Endpoint to list all subcategories.
     *
     * @return ResponseEntity containing a list of all subcategories.
     */
    @GetMapping
    public ResponseEntity<?> listAllSubcategories() {
        
        // Retrieve and return a list of all subcategories
        return ResponseEntity.ok(subcategoryService.listAllSubcategories());
    }
    
    /**
     * Endpoint to list all active subcategories.
     *
     * @return ResponseEntity containing a list of all active subcategories.
     */
    @GetMapping("/active")
    public ResponseEntity<?> listAllActiveSubcategories() {
        
        // Retrieve and return a list of all active subcategories
        return ResponseEntity.ok(subcategoryService.listAllActiveSubcategories());
    }
    
    /**
     * Endpoint to find a subcategory by its ID.
     *
     * @param id The ID of the subcategory to be retrieved.
     * @return ResponseEntity containing the subcategory associated with the provided ID,
     *         or an error response if the subcategory is not found.
     */
    @GetMapping("/{id}/edit")
    public ResponseEntity<?> findSubcategoryById(@PathVariable int id) {
        
        // Retrieve and return the subcategory associated with the provided ID
        return ResponseEntity.ok(subcategoryService.findSubcategoryById(id));
    }
    
    /**
     * Endpoint to update a subcategory by its ID.
     *
     * @param subcategory The updated subcategory data.
     * @param id The ID of the subcategory to be updated.
     * @return ResponseEntity indicating the result of the subcategory update,
     *         or a not-found response if the subcategory is not found.
     */
    @PutMapping("/{id}/update")
    public ResponseEntity<?> updateSubcategory(Subcategory subcategory, @PathVariable int id) {
        subcategory.setId(id);
        
        // Update the subcategory with the provided information
        subcategoryService.updateSubcategory(subcategory);
        
        // Respond with success message using Response class
        return Response.success(subcategory);
    }
    
}