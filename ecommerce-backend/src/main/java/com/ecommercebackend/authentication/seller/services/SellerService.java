package com.ecommercebackend.authentication.seller.services;

import java.util.List;

import com.ecommercebackend.authentication.seller.entities.Seller;

/**
 * This interface defines the contract for managing sellers in the ecommerce system.
 */
public interface SellerService {

	boolean verifyByEmail(String email);
	boolean verifyByPhone(String phone);
	void registerSeller(Seller seller);
	Seller loginSeller(String email, String password);
	List<Seller> allSellers();
	Seller findSellerById(int id);
	void updateProfile(Seller seller);
	void updatePassword(int sellerId, Seller seller);
	void suspendSeller(int id);
}
