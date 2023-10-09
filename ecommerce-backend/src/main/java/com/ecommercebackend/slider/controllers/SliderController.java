package com.ecommercebackend.slider.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommercebackend.fileStorage.services.DiskFileStorageService;
import com.ecommercebackend.slider.services.SliderService;

/**
 * Controller class for managing slider-related operations.
 */
@RestController
@RequestMapping("/api/slides")
@CrossOrigin
public class SliderController {

    @Autowired
    private SliderService sliderService;
    
    @Autowired
    private DiskFileStorageService storageService;
    
    /**
     * Endpoint to add a new slide with an uploaded photo.
     *
     * @param photo The uploaded photo.
     * @return ResponseEntity indicating the result of the slide addition.
     */
    @PostMapping("/add")
    public ResponseEntity<?> saveSlide(@RequestParam MultipartFile photo) {
        
        // Store the uploaded photo and retrieve its generated file name
        String fileName = storageService.storeFile(photo, photo.getOriginalFilename());
        
        // Save the slide information along with the generated file name
        sliderService.saveSlide(photo, fileName);
        
        // Return a successful response
        return ResponseEntity.ok("Slide saved successfully.");
    }
    
    /**
     * Endpoint to list all slides.
     *
     * @return ResponseEntity containing a list of all slides.
     */
    @GetMapping
    public ResponseEntity<?> listAllSlides() {
        
        // Retrieve and return a list of all slides
        return ResponseEntity.ok(sliderService.listAllSlides());
    }
    
    /**
     * Endpoint to delete a slide by its ID.
     *
     * @param id The ID of the slide to be deleted.
     * @return ResponseEntity indicating the result of the slide deletion.
     */
    @DeleteMapping("{id}/delete")
    public ResponseEntity<?> deleteSlides(@PathVariable int id) {
        
        // Delete the slide associated with the provided ID
        sliderService.deleteSlide(id);
        
        // Return a successful response
        return ResponseEntity.ok("Slide deleted successfully.");
    }
    
}
