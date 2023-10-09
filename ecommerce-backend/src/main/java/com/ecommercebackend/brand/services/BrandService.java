package com.ecommercebackend.brand.services;

import java.util.List;

import com.ecommercebackend.brand.entities.Brand;

/**
 * This interface defines the contract for managing brands in the ecommerce system.
 */
public interface BrandService {
	
	void saveBrand(Brand brand);
	List<Brand> listAllBrands();
	List<Brand> listAllActiveBrands();
	Brand findBrandById(int id);
	void updateBrand(Brand brand);
}
