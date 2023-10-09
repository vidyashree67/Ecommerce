package com.ecommercebackend.product.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommercebackend.brand.repositories.BrandRepository;
import com.ecommercebackend.category.repositories.CategoryRepository;
import com.ecommercebackend.fileStorage.services.DiskFileStorageService;
import com.ecommercebackend.product.dtos.ProductDTO;
import com.ecommercebackend.product.entities.Product;
import com.ecommercebackend.product.repositories.ProductRepository;
import com.ecommercebackend.subcategory.repositories.SubcategoryRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SubcategoryRepository subcategoryRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private DiskFileStorageService diskFileStorageService;

    /**
     * Add a new product along with its photo.
     *
     * @param product The product entity to be added.
     * @param photo The photo of the product.
     */
    @Override
    public void addProduct(Product product, MultipartFile photo) {
        // Store the photo and set its path in the product entity
        String originalFileName = photo.getOriginalFilename();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String storedFileName = product.getId() + extension;
        String storedFilePath = diskFileStorageService.storeFile(photo, storedFileName);
        product.setPhoto(storedFilePath);

        // Save the product entity
        productRepository.save(product);
    }

    /**
     * List all products.
     *
     * @return A list of all products.
     */
    @Override
    public List<Product> listAllProducts() {
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    /**
     * List all products by a seller.
     *
     * @param sellerId The ID of the seller.
     * @return A list of products listed by the seller.
     */
    @Override
    public List<Product> listAllProductsBySeller(int sellerId) {
        return productRepository.findBySellerId(sellerId, Sort.by(Sort.Direction.DESC, "id"));
    }

    /**
     * List all products with pagination.
     *
     * @param page The page number.
     * @param pagesize The number of items per page.
     * @return A Page of products.
     */
    @Override
    public Page<Product> listAllProductsPaginated(int page, int pagesize) {
        // Retrieve a Page of products using pagination and sorting
        Page<Product> prods = productRepository.findAll(PageRequest.of(page, pagesize, Sort.by(Direction.DESC, "id")));
        return prods;
    }

    /**
     * List all products by subcategory.
     *
     * @param subcategoryId The ID of the subcategory.
     * @return A list of products under the specified subcategory.
     */
    @Override
    public List<Product> listAllProductsBySubcategory(int subcategoryId) {
        return productRepository.findBySubcategoryId(subcategoryId, Sort.by(Sort.Direction.DESC, "id"));
    }

    /**
     * Search products by category and name containing a certain string.
     *
     * @param categoryId The ID of the category.
     * @param search The search string.
     * @return A list of products matching the search criteria.
     */
    @Override
    public List<Product> searchProductsByCategoryAndNameContaining(int categoryId, String search) {
        if (categoryId == 0) {
            // If categoryId is 0, search by name across all categories
            return productRepository.findByNameContaining(search);
        } else {
            // Otherwise, search by name within the specified category
            return productRepository.findByCategoryIdAndNameContaining(categoryId, search);
        }
    }

    /**
     * Retrieve products purchased by a customer.
     *
     * @param customerId The ID of the customer.
     * @return A list of products purchased by the customer.
     *         Returns an empty list if no products are found.
     */
    @Override
    public List<Product> findProductByCustomerId(int customerId) {
        // TODO: Implement logic to retrieve products purchased by a customer
        return null;
    }

    /**
     * Find a product by its ID.
     *
     * @param id The ID of the product.
     * @return The product entity if found, otherwise null.
     */
    @Override
    public Product findProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    /**
     * Update product details based on a DTO.
     *
     * @param productDto The DTO containing updated product details.
     */
    @Override
    public void updateProduct(ProductDTO productDto) {
    	
        // Find the existing product entity by ID
        Product existingProduct = productRepository.findById(productDto.getId()).orElse(null);

        // Update the relevant properties from the DTO
        existingProduct.setName(productDto.getName());
        existingProduct.setPrice(productDto.getPrice());
        existingProduct.setDescription(productDto.getDescription());

        // Set the Category, Subcategory, and Brand based on provided IDs
        existingProduct.setCategory(categoryRepository.findById(productDto.getCategoryId()).orElse(null));
        existingProduct.setSubcategory(subcategoryRepository.findById(productDto.getSubcategoryId()).orElse(null));
        existingProduct.setBrand(brandRepository.findById(productDto.getBrandId()).orElse(null));

        // Save the updated product entity
        productRepository.save(existingProduct);
    }

    /**
     * Delete a product by its ID.
     *
     * @param id The ID of the product to be deleted.
     */
    @Override
    public void deleteProduct(int id) {
    	
        // Find the product by ID and delete it
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            productRepository.delete(product);
        }
    }
}
