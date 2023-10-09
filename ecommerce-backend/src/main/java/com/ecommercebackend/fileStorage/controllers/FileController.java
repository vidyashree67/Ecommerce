package com.ecommercebackend.fileStorage.controllers;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ecommercebackend.fileStorage.services.DiskFileStorageService;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Controller class for handling file downloads.
 */
@CrossOrigin
@Controller
public class FileController {

    @Autowired
    private DiskFileStorageService diskFileStorageService;

    /**
     * Endpoint for downloading files.
     *
     * @param fileName The name of the file to be downloaded.
     * @param response The HTTP response object.
     */
    @GetMapping(value = "/{fileName}", produces = "image/*")
    public void downloadFile(@PathVariable String fileName, HttpServletResponse response) {
    	
        // Load the requested file as a resource using the file storage service
        Resource resource = diskFileStorageService.loadFile(fileName);
        
        // Check if the resource exists
        if (resource != null) {
            try (InputStream in = resource.getInputStream()) {
            	
                // Get the output stream from the HTTP response
                ServletOutputStream out = response.getOutputStream();
                
                // Copy the file data from input stream to output stream
                FileCopyUtils.copy(in, out);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
