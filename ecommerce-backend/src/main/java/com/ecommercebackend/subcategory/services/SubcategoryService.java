package com.ecommercebackend.subcategory.services;

import java.util.List;

import com.ecommercebackend.subcategory.entities.Subcategory;

/**
 * This interface defines the contract for managing subcategories in the ecommerce system.
 */
public interface SubcategoryService {
	
	void saveSubcategory(Subcategory subcategory);
	List<Subcategory> listAllSubcategories();
	List<Subcategory> listAllActiveSubcategories();
	Subcategory findSubcategoryById(int id);
	void updateSubcategory(Subcategory subcategory);
}
