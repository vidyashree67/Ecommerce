package com.ecommercebackend.fileStorage.services;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service implementation for disk-based file storage operations.
 */
@Service
public class DiskFileStorageServiceImpl implements DiskFileStorageService {

	// The base path where files will be stored
    private final String BASEPATH = "uploads/";

    /**
     * Get a list of all stored file names.
     *
     * @return A list of file names.
     */
    @Override
    public List<String> getAllFileNames() {
    	
        // Create a File instance representing the base path
        File dirPath = new File(BASEPATH);
        
        // List the contents of the directory and return as a list
        return Arrays.asList(dirPath.list());
    }

    /**
     * Store a file on the disk.
     *
     * @param file     The file to be stored.
     * @param fileName The desired name for the stored file.
     * @return The stored file's name.
     */
    @Override
    public String storeFile(MultipartFile file, String fileName) {
        
        // Extract the file extension
        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        
        // Generate a unique file name using UUID and extension
        String storedFileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
        
        // Create a directory for the storage path if it doesn't exist
        File filePath = new File(BASEPATH);
        filePath.mkdirs();
        
        // Create a File instance for the stored file
        filePath = new File(BASEPATH, storedFileName);
        try (FileOutputStream out = new FileOutputStream(filePath)) {
        	
            // Copy the file content to the storage file
            FileCopyUtils.copy(file.getInputStream(), out);
            return storedFileName;
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return null;
    }

    /**
     * Load a stored file as a Spring Resource.
     *
     * @param fileName The name of the file to load.
     * @return The loaded file as a Spring Resource, or null if not found.
     */
    @Override
    public Resource loadFile(String fileName) {
    	
        // Create a File instance for the specified file
        File filePath = new File(BASEPATH, fileName);
        
        // Check if the file exists and return it as a Spring Resource
        if (filePath.exists())
            return new FileSystemResource(filePath);
        return null;
    }

    /**
     * Delete a stored file.
     *
     * @param fileName The name of the file to delete.
     */
    @Override
    public void deleteFile(String fileName) {
    	
        // Create a File instance for the specified file
        File filePath = new File(BASEPATH, fileName);
        
        // If the file exists, delete it
        if (filePath.exists()) {
            filePath.delete();
        }
    }
}
