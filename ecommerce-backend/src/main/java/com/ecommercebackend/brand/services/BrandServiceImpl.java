package com.ecommercebackend.brand.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.brand.entities.Brand;
import com.ecommercebackend.brand.repositories.BrandRepository;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    /**
     * Save a new brand in the database.
     *
     * @param brand The brand to be saved.
     */
    @Override
    public void saveBrand(Brand brand) {
        brandRepository.save(brand);
    }

    /**
     * Retrieve a list of all brands from the database.
     *
     * @return List of all brands.
     */
    @Override
    public List<Brand> listAllBrands() {
        return brandRepository.findAll();
    }

    /**
     * Retrieve a list of all active brands from the database.
     *
     * @return List of active brands.
     */
    @Override
    public List<Brand> listAllActiveBrands() {
        return brandRepository.findAllByStatusTrue();
    }

    /**
     * Find a brand by its ID in the database.
     *
     * @param id The ID of the brand to find.
     * @return The found brand, or null if not found.
     */
    @Override
    public Brand findBrandById(int id) {
        return brandRepository.findById(id).orElse(null);
    }
    
    /**
     * Update an existing brand in the database.
     *
     * @param brand The updated brand information.
     */
    @Override
    public void updateBrand(Brand brand) {
    	
        // Retrieve the existing brand from the database based on its ID
        Brand existingBrand = brandRepository.findById(brand.getId()).orElse(null);
        
        // Update the properties of the existing brand with the new values
        existingBrand.setName(brand.getName());
        existingBrand.setDescription(brand.getDescription());
        existingBrand.setStatus(brand.isStatus());
        
        // Save the updated brand back to the database
        brandRepository.save(existingBrand);
    }
}
