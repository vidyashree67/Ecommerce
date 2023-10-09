package com.ecommercebackend.cart.services;

import java.util.List;

import com.ecommercebackend.cart.entities.Cart;

/**
 * This interface defines the contract for managing shopping carts in the ecommerce system.
 */
public interface CartService {

	Cart saveCart(Cart cart);
	List<Cart> findCartItemsByCustomerId(int customerId);
	Cart findCartItemsByCustomerIdAndProductId(int customerId, int productId);
	void removeFromCart(int cartId);
	void clearCart(int customerId);
	
}
