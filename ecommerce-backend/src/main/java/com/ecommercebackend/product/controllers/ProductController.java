package com.ecommercebackend.product.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.authentication.seller.entities.Seller;
import com.ecommercebackend.authentication.seller.services.SellerService;
import com.ecommercebackend.brand.services.BrandService;
import com.ecommercebackend.category.services.CategoryService;
import com.ecommercebackend.product.dtos.ProductDTO;
import com.ecommercebackend.product.dtos.ProductPagedResponseDTO;
import com.ecommercebackend.product.entities.Product;
import com.ecommercebackend.product.services.ProductService;
import com.ecommercebackend.subcategory.services.SubcategoryService;
import com.ecommercebackend.utils.Response;

@CrossOrigin
@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@Autowired
	SellerService sellerService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	SubcategoryService subcategoryService;
	
	@Autowired
	BrandService brandService;
	
	/**
	 * Endpoint for adding a new product.
	 * 
	 * @param productDto The product data to be added.
	 * @return ResponseEntity containing the added product data.
	 */
	@PostMapping("/add")
	public ResponseEntity<?> saveProduct(ProductDTO productDto) {
		
		// Convert the DTO to a Product entity
		Product product = ProductDTO.toEntity(productDto);
		
		// Set category, subcategory, and brand for the product
		product.setCategory(categoryService.findCategoryById(productDto.getCategoryId()));
		product.setSubcategory(subcategoryService.findSubcategoryById(productDto.getSubcategoryId()));
		product.setBrand(brandService.findBrandById(productDto.getBrandId()));
		
		// Retrieve and set the seller for the product
		Seller seller = sellerService.findSellerById(productDto.getSellerId());
		product.setSeller(seller);
		
		// Add the product and its photo
		productService.addProduct(product, productDto.getPhoto());
		
		// Return a success response with the added product data
		return Response.success(product);
	}
	
	/**
	 * Endpoint for listing all products by seller or all products.
	 * 
	 * @param sellerId The ID of the seller (optional).
	 * @return ResponseEntity containing the list of products.
	 */
	@GetMapping
	public ResponseEntity<?> listAllProductsBySeller(Optional<Integer> sellerId) {
		if (sellerId.isPresent()) {
			// If sellerId is provided, list products by the specified seller
			return Response.success(productService.listAllProductsBySeller(sellerId.get()));
		} else {
			// If no sellerId provided, list all products
			return Response.success(productService.listAllProducts());
		}		
	}
	
	/**
	 * Endpoint for listing all products paginated.
	 * 
	 * @param page The current page.
	 * @param pageSize The size of each page.
	 * @return ResponseEntity containing paginated product data.
	 */
	@GetMapping("/paginated")
	public ResponseEntity<?> listAllProductsPaginated(int page, int pageSize) {
		
		// Create a list to store paginated products
		List<Product> result = new ArrayList<Product>();
		
		// Fetch paginated product data
		Page<Product> data = productService.listAllProductsPaginated(page, pageSize);
		
		// Populate the result list with fetched products
		data.forEach(item -> {
			result.add(item);
		});
		
		// Create a response DTO containing paginated product details
		ProductPagedResponseDTO productPagedResponseDto = new ProductPagedResponseDTO();
		productPagedResponseDto.setPageSize(pageSize);
		productPagedResponseDto.setCurrent(page);
		productPagedResponseDto.setTotal(data.getTotalElements());
		productPagedResponseDto.setProductList(result);
		
		// Return the response containing paginated product data
		return Response.success(productPagedResponseDto);
	}
	
	/**
	 * Endpoint for listing all products by a specific subcategory.
	 * 
	 * @param subcategoryId The ID of the subcategory.
	 * @return ResponseEntity containing the list of products.
	 */
	@GetMapping("/categories")
	public ResponseEntity<?> listAllProductsByCategoryAndSubcategory(@RequestParam int subcategoryId) {	
		
		// Retrieve products by the specified subcategory
		return Response.success(productService.listAllProductsBySubcategory(subcategoryId));
	}
	
	/**
	 * Endpoint for searching products by category and name containing a search term.
	 * 
	 * @param categoryId The ID of the category.
	 * @param search The search term for product names.
	 * @return ResponseEntity containing the list of products.
	 */
	@GetMapping("/search")
	public ResponseEntity<?> searchProductsByCategoryAndNameContaining(int categoryId, String search) {
		
		// Search for products by category and name containing the search term
		return Response.success(productService.searchProductsByCategoryAndNameContaining(categoryId, search));
	}
	
	/**
	 * Endpoint for finding a product by its ID.
	 * 
	 * @param id The ID of the product.
	 * @return ResponseEntity containing the product data.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> findProductById(@PathVariable int id) {
		
		// Find and return the product by its ID
		Product product = productService.findProductById(id);
		return ResponseEntity.ok(product);
	}
	
	/**
	 * Endpoint for updating a product.
	 * 
	 * @param productDto The updated product data.
	 * @param id The ID of the product to be updated.
	 * @return ResponseEntity indicating the result of the product update.
	 */
	@PutMapping("/{id}/update")
	public ResponseEntity<?> updateProduct(@RequestBody ProductDTO productDto, @PathVariable int id) {
		
		// Set the ID for the product DTO
		productDto.setId(id);
		
		// Update the product with the provided data
		productService.updateProduct(productDto);
		
		// Return a success response indicating the product update
		return ResponseEntity.ok("Product updated successfully.");	
	}
	
	/**
	 * Endpoint for deleting a product by its ID.
	 * 
	 * @param id The ID of the product to be deleted.
	 * @return ResponseEntity indicating the result of the product deletion.
	 */
	@DeleteMapping("/{id}/delete")
	public ResponseEntity<?> deleteProduct(@PathVariable int id) {
		
		// Delete the product with the specified ID
		productService.deleteProduct(id);
		
		// Return a success response indicating the product deletion
		return Response.status(HttpStatus.OK);
	}
}
