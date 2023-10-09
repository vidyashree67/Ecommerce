package com.ecommercebackend.subcategory.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.subcategory.entities.Subcategory;
import com.ecommercebackend.subcategory.repositories.SubcategoryRepository;

@Service
public class SubcategoryServiceImpl implements SubcategoryService {

	@Autowired
	private SubcategoryRepository subcategoryRepository;

	/**
	 * Save a new subcategory.
	 *
	 * @param subcategory The Subcategory object to be saved.
	 */
	@Override
	public void saveSubcategory(Subcategory subcategory) {
		subcategoryRepository.save(subcategory);
	}

	/**
	 * Retrieve a list of all subcategories.
	 *
	 * @return A list of Subcategory objects representing subcategories.
	 */
	@Override
	public List<Subcategory> listAllSubcategories() {
		return subcategoryRepository.findAll();
	}

	/**
	 * Retrieve a list of all active subcategories.
	 *
	 * @return A list of Subcategory objects representing active subcategories.
	 */
	@Override
	public List<Subcategory> listAllActiveSubcategories() {
		return subcategoryRepository.findAllByStatusTrue();
	}
	
	/**
	 * Find a subcategory by its ID.
	 *
	 * @param id The ID of the subcategory.
	 * @return The Subcategory entity if found, otherwise null.
	 */
	@Override
	public Subcategory findSubcategoryById(int id) {
		return subcategoryRepository.findById(id).orElse(null);
	}

	/**
	 * Update an existing subcategory.
	 *
	 * @param subcategory The Subcategory object with updated information.
	 */
	@Override
	public void updateSubcategory(Subcategory subcategory) {
		// Find the existing subcategory by its ID
		Subcategory existingSubcategory = subcategoryRepository.findById(subcategory.getId()).orElse(null);
		
		// Update relevant properties of the existing subcategory
		if (existingSubcategory != null) {
			existingSubcategory.setName(subcategory.getName());
			existingSubcategory.setCategory(subcategory.getCategory());
	        existingSubcategory.setDescription(subcategory.getDescription());
	        existingSubcategory.setStatus(subcategory.isStatus());

	        // Save the updated subcategory back to the database
	        subcategoryRepository.save(existingSubcategory);
		}
	}
}