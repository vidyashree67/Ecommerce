package com.ecommercebackend.brand.controllers;

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

import com.ecommercebackend.brand.entities.Brand;
import com.ecommercebackend.brand.services.BrandService;
import com.ecommercebackend.utils.Response;

/**
 * Controller class for managing Brand-related operations.
 */
@RestController
@RequestMapping("/api/brands")
@CrossOrigin
public class BrandController {

    @Autowired
    private BrandService brandService;

    /**
     * Endpoint for adding a new brand.
     *
     * @param brand The brand to be added.
     * @return ResponseEntity indicating the result of the brand addition.
     */
    @PostMapping("/add")
    public ResponseEntity<?> saveBrand(@RequestBody Brand brand) {
        // Call the brandService to save the provided brand
        brandService.saveBrand(brand);
        
        // Respond with a success message
        return ResponseEntity.ok("Brand saved.");
    }

    /**
     * Endpoint for listing all brands.
     *
     * @return ResponseEntity containing a list of all brands.
     */
    @GetMapping
    public ResponseEntity<?> listAllBrands() {
        // Call the brandService to retrieve and list all brands
        return ResponseEntity.ok(brandService.listAllBrands());
    }

    /**
     * Endpoint for listing all active brands.
     *
     * @return ResponseEntity containing a list of all active brands.
     */
    @GetMapping("/active")
    public ResponseEntity<?> listAllActiveBrands() {
        // Call the brandService to retrieve and list all active brands
        return ResponseEntity.ok(brandService.listAllActiveBrands());
    }

    /**
     * Endpoint for finding a brand by its ID.
     *
     * @param id The ID of the brand to be retrieved.
     * @return ResponseEntity containing the retrieved brand,
     *         or an error response if the brand is not found.
     */
    @GetMapping("/{id}/edit")
    public ResponseEntity<?> findBrandById(@PathVariable int id) {
        // Call the brandService to retrieve the brand by its ID
        return ResponseEntity.ok(brandService.findBrandById(id));
    }

    /**
     * Endpoint for updating a brand.
     *
     * @param brand The updated brand data.
     * @param id The ID of the brand to be updated.
     * @return ResponseEntity indicating the result of the brand update,
     *         along with the updated brand information.
     */
    @PutMapping("/{id}/update")
    public ResponseEntity<?> updateBrand(Brand brand, @PathVariable int id) {
        // Set the ID of the updated brand
        brand.setId(id);
        
        // Call the brandService to update the brand
        brandService.updateBrand(brand);
        
        // Respond with a success message using Response utility
        return Response.success(brand);
    }
}
