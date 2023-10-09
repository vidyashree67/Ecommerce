package com.ecommercebackend.product.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.ecommercebackend.product.dtos.ProductDTO;
import com.ecommercebackend.product.entities.Product;

/**
 * This interface defines the contract for managing products in the ecommerce system.
 */
public interface ProductService {
	
	void addProduct(Product product, MultipartFile photo);
	List<Product> listAllProductsBySeller(int sellerId);
	Page<Product> listAllProductsPaginated(int page, int pagesize);
	List<Product> listAllProducts();
	List<Product> listAllProductsBySubcategory(int subcategoryId);
	List<Product> searchProductsByCategoryAndNameContaining(int categoryId, String search);
	List<Product> findProductByCustomerId(int customerId);
	Product findProductById(int id);
	void updateProduct(ProductDTO productDto);
	void deleteProduct(int id);
	
}
