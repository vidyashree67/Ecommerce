package com.ecommercebackend.authentication.dtos;

/**
 * A Data Transfer Object (DTO) representing login information, including email, password, and role.
 */
public class LoginDTO {
	
	private String email;
	private String password;
	private String role;

	// Getters and setters for the fields
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
}
