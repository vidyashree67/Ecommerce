package com.ecommercebackend.product.dtos;

import java.util.List;

import com.ecommercebackend.product.entities.Product;

/**
 * A Data Transfer Object (DTO) representing a paged response containing a list of products.
 */
public class ProductPagedResponseDTO {
	
	private List<Product> productList;
	private int current;
	private long total;
	private int pageSize;
	
	// Getters and setters for the fields
	
	public List<Product> getProductList() {
		return productList;
	}

	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}

	public int getCurrent() {
		return current;
	}

	public void setCurrent(int current) {
		this.current = current;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

}
