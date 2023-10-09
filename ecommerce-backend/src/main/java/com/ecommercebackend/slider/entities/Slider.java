package com.ecommercebackend.slider.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a slider available in the ecommerce system.
 */
@Entity
@Table(name = "sliders")
public class Slider {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String slideImage;
	
	// Getters and setters for the fields
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getSlideImage() {
		return slideImage;
	}
	
	public void setSlideImage(String slideImage) {
		this.slideImage = slideImage;
	}
	
}
