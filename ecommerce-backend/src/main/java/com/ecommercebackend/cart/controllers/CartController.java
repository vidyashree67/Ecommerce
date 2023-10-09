package com.ecommercebackend.cart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommercebackend.authentication.customer.entities.Customer;
import com.ecommercebackend.authentication.customer.services.CustomerService;
import com.ecommercebackend.cart.dtos.CartDTO;
import com.ecommercebackend.cart.entities.Cart;
import com.ecommercebackend.cart.services.CartService;
import com.ecommercebackend.product.entities.Product;
import com.ecommercebackend.product.services.ProductService;



/**
 * Controller class for managing cart-related operations.
 */
@CrossOrigin
@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private CustomerService customerService;
    
    @Autowired
    private ProductService productService;

    /**
     * Endpoint for adding a product to the cart.
     *
     * @param cartDto The CartDTO containing customer and product information.
     * @return ResponseEntity indicating the result of adding the cart item.
     */
    @PostMapping("/add")
    public ResponseEntity<String> saveCart(@RequestBody CartDTO cartDto) {
        // Create a new Cart object
        Cart cart = new Cart();
        
        // Find the Customer by ID
        Customer customer = customerService.findCustomerById(cartDto.getCustomerId());
        
        // Check if customer is valid
        if (customer == null) {
            return ResponseEntity.badRequest().body("Invalid customer ID");
        }
        // Set customer and product details to the cart
        cart.setCustomer(customer);
        Product product = productService.findProductById(cartDto.getProductId());
        cart.setQuantity(cartDto.getQuantity());
        cart.setProduct(product);
        
        // Save the cart item
        cartService.saveCart(cart);
        return ResponseEntity.ok("Cart item saved successfully");
    }
    
    /**
     * Endpoint for retrieving cart items by customer ID.
     *
     * @param customerId The ID of the customer.
     * @return ResponseEntity containing a list of cart items for the customer.
     */
    @GetMapping("/{customerId}")
    public ResponseEntity<List<Cart>> findCartItemsByCustomerId(@PathVariable int customerId) {
        // Retrieve cart items by customer ID
        List<Cart> cartItems = cartService.findCartItemsByCustomerId(customerId);
        return ResponseEntity.ok(cartItems);
    }
    
    /**
     * Endpoint for updating a cart item's quantity.
     *
     * @param customerId The ID of the customer.
     * @param productId  The ID of the product.
     * @param cartDto    The CartDTO containing updated cart item information.
     * @return ResponseEntity indicating the result of updating the cart item.
     */
    @PutMapping("{customerId}/{productId}/update")
    public ResponseEntity<String> updateCart(@PathVariable int customerId, @PathVariable int productId, @RequestBody CartDTO cartDto) {
        // Find the Customer by ID
        Customer customer = customerService.findCustomerById(customerId);
        
        // Check if customer is valid
        if (customer == null) {
            return ResponseEntity.badRequest().body("Invalid customer ID");
        }

        // Find the Product by ID
        Product product = productService.findProductById(productId);
        
        // Check if product is valid
        if (product == null) {
            return ResponseEntity.badRequest().body("Invalid product ID");
        }

        // Find the cart item by customer ID and product ID
        Cart cart = cartService.findCartItemsByCustomerIdAndProductId(customerId, productId);
        
        // Check if cart item exists
        if (cart == null) {
            return ResponseEntity.badRequest().body("Cart item not found");
        }

        // Update cart item's quantity and save
        cart.setQuantity(cartDto.getQuantity());
        cartService.saveCart(cart);

        return ResponseEntity.ok("Cart item updated successfully");
    }

    /**
     * Endpoint for removing a product from the cart.
     *
     * @param cartId The ID of the cart item.
     * @return ResponseEntity indicating the result of removing the product from the cart.
     */
    @DeleteMapping("{cartId}/delete")
    public ResponseEntity<String> removeFromCart(@PathVariable int cartId) {
        // Remove product from cart by cart ID
        cartService.removeFromCart(cartId);
        return ResponseEntity.ok("Product removed from the cart successfully");
    }
    
    /**
     * Endpoint for clearing the entire cart for a customer.
     *
     * @param customerId The ID of the customer.
     * @return ResponseEntity indicating the result of clearing the cart.
     */
    @DeleteMapping("{customerId}/clear")
    public ResponseEntity<String> clearCart(@PathVariable int customerId) {
        // Clear cart for the given customer
        cartService.clearCart(customerId);
        return ResponseEntity.ok("Cart cleared successfully");
    }
    
}
