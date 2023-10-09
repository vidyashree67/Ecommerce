package com.ecommercebackend.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response {
	
	/**
     * Generate a success response entity.
     * 
     * @param data The data to be included in the response.
     * @return A ResponseEntity containing a success status and data if provided.
     */
	public static ResponseEntity<?> success(Object data) {
		Map<String, Object> map = new HashMap<>();
		map.put("status", "success");
		if(data != null)
			map.put("data", data);
		return ResponseEntity.ok(map);
	}
	
	/**
     * Generate an error response entity.
     * 
     * @param error The error message or data to be included in the response.
     * @return A ResponseEntity containing an error status and error data if provided.
     */
	public static ResponseEntity<?> error(Object error) {
		Map<String, Object> map = new HashMap<>();
		map.put("status", "error");
		if(error != null)
			map.put("error", error);
		return ResponseEntity.ok(map);
	}
	
	/**
     * Generate an error response entity.
     * 
     * @param error The error message or data to be included in the response.
     * @return A ResponseEntity containing an error status and error data if provided.
     */
	public static ResponseEntity<?> status(HttpStatus status) {
		return ResponseEntity.status(status).build();
	}
}