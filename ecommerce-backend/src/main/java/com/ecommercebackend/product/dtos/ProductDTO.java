package com.ecommercebackend.product.dtos;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ecommercebackend.product.entities.Product;

/**
 * A Data Transfer Object (DTO) representing product information to be used for input and output.
 */
public class ProductDTO {
	
	private int id;
	private String name;
	private int categoryId;
	private int subcategoryId;
	private int price;
	private int brandId;
	private String description;
	private int sellerId;
	private MultipartFile photo;
	
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

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getSubcategoryId() {
		return subcategoryId;
	}

	public void setSubcategoryId(int subcategoryId) {
		this.subcategoryId = subcategoryId;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getBrandId() {
		return brandId;
	}

	public void setBrandId(int brandId) {
		this.brandId = brandId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getSellerId() {
		return sellerId;
	}

	public void setSellerId(int sellerId) {
		this.sellerId = sellerId;
	}

	public MultipartFile getPhoto() {
		return photo;
	}

	public void setPhoto(MultipartFile photo) {
		this.photo = photo;
	}
	
	/**
     * Converts a ProductDTO object to a Product entity.
     *
     * @param productDto The ProductDTO to be converted.
     * @return The corresponding Product entity.
     */
	public static Product toEntity(ProductDTO productDto) {
		Product entity=new Product();
		BeanUtils.copyProperties(productDto, entity, "photo");		
		return entity;
	}
	
}
