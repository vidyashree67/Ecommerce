package com.ecommercebackend.authentication.admin.services;

import com.ecommercebackend.authentication.admin.entities.Admin;

/**
 * This interface defines the contract for managing admins in the ecommerce system.
 */
public interface AdminService {

    boolean verifyByEmail(String email);
    boolean verifyByPhone(String phone);
    void registerAdmin(Admin admin);
    Admin loginAdmin(String email, String password);
    Admin findAdminById(int id);
	void updateProfile(Admin admin);
	void updatePassword(int adminId, Admin admin);
	
}
