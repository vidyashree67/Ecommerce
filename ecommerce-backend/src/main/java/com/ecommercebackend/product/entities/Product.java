package com.ecommercebackend.product.entities;

import com.ecommercebackend.authentication.seller.entities.Seller;
import com.ecommercebackend.brand.entities.Brand;
import com.ecommercebackend.category.entities.Category;
import com.ecommercebackend.subcategory.entities.Subcategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Represents a product available in the ecommerce system.
 */
@Entity
@Table(name="products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "categoryId")
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "subcategoryId")
	private Subcategory subcategory;
	
	private int price;

	@ManyToOne
	@JoinColumn(name = "brandId")
	private Brand brand;

	@Column(length=1000)
	private String description;
	
	@ManyToOne
	@JoinColumn(name="sellerId")
	private Seller seller;
	
	private String photo;
	
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

	public Subcategory getSubcategory() {
		return subcategory;
	}

	public void setSubcategory(Subcategory subcategory) {
		this.subcategory = subcategory;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public Brand getBrand() {
		return brand;
	}

	public void setBrand(Brand brand) {
		this.brand = brand;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Seller getSeller() {
		return seller;
	}

	public void setSeller(Seller seller) {
		this.seller = seller;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
}
