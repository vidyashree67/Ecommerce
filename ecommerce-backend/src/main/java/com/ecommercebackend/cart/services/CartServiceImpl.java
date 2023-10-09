package com.ecommercebackend.cart.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommercebackend.cart.entities.Cart;
import com.ecommercebackend.cart.repositories.CartRepository;

/**
 * Service implementation for managing cart operations.
 */
@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    /**
     * Save a cart item to the database.
     *
     * @param cart The cart item to be saved.
     * @return The saved cart item.
     */
    @Override
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    /**
     * Retrieve all cart items for a specific customer.
     *
     * @param customerId The ID of the customer.
     * @return A list of cart items for the customer.
     */
    @Override
    public List<Cart> findCartItemsByCustomerId(int customerId) {
        return cartRepository.findByCustomerId(customerId);
    }
    
    /**
     * Retrieve a cart item by customer ID and product ID.
     *
     * @param customerId The ID of the customer.
     * @param productId  The ID of the product.
     * @return The cart item if found, otherwise null.
     */
    @Override
    public Cart findCartItemsByCustomerIdAndProductId(int customerId, int productId) {
        return cartRepository.findByCustomerIdAndProductId(customerId, productId);
    }

    /**
     * Remove a cart item from the database by its ID.
     *
     * @param cartId The ID of the cart item to be removed.
     */
    @Override
    public void removeFromCart(int cartId) {
        cartRepository.deleteById(cartId);
    }
    
    /**
     * Clear all cart items for a specific customer.
     *
     * @param customerId The ID of the customer.
     */
    @Override
    public void clearCart(int customerId) {
        List<Cart> cartItems = cartRepository.findByCustomerId(customerId);
        for (Cart cartItem : cartItems) {
            cartRepository.delete(cartItem);
        }
    }
}