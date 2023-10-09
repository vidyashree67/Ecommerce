package com.ecommercebackend.subcategory.entities;

import com.ecommercebackend.category.entities.Category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entity class representing a product subcategory.
 */
@Entity
@Table(name = "subcategories")
public class Subcategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private int id;
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "categoryId")
	private Category category;
	
	@Column(length=1000)
	private String description;
	
	// Indicates whether the subcategory is active (true) or inactive (false)
	private boolean status = true;
	
	// Default constructor for the Subcategory entity
	public Subcategory() {}

	// Getters and setters for the fields
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
}
