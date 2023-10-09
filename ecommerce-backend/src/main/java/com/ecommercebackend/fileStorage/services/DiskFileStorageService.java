package com.ecommercebackend.fileStorage.services;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * This interface defines the contract for managing disk-based file storage in the ecommerce system.
 */
public interface DiskFileStorageService {
    List<String> getAllFileNames();
    String storeFile(MultipartFile file, String fileName);
    Resource loadFile(String fileName);
    void deleteFile(String fileName);
}
