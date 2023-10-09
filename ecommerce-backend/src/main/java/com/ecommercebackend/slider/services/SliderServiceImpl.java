package com.ecommercebackend.slider.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommercebackend.fileStorage.services.DiskFileStorageService;
import com.ecommercebackend.slider.entities.Slider;
import com.ecommercebackend.slider.repositories.SliderRepository;

@Service
public class SliderServiceImpl implements SliderService {

    @Autowired
    private SliderRepository sliderRepository;

    @Autowired
    private DiskFileStorageService diskFileStorageService;

    /**
     * Save a new slider slide with the provided image file and file name.
     *
     * @param file     The image file to be stored as a slider slide.
     * @param fileName The name to be used for storing the image file.
     */
    @Override
    public void saveSlide(MultipartFile file, String fileName) {
        // Create a new Slider object to represent the slide
        Slider slide = new Slider();

        // Store the image file using the DiskFileStorageService
        slide.setSlideImage(diskFileStorageService.storeFile(file, fileName));

        // Save the slider slide to the repository
        sliderRepository.save(slide);
    }

    /**
     * Retrieve a list of all slider slides.
     *
     * @return A list of Slider objects representing the slider slides.
     */
    @Override
    public List<Slider> listAllSlides() {
        // Retrieve all slider slides from the repository
        return sliderRepository.findAll();
    }

    /**
     * Delete a slider slide by its ID.
     *
     * @param id The ID of the slider slide to be deleted.
     */
    @Override
    public void deleteSlide(int id) {
        // Delete the slider slide from the repository by its ID
    	sliderRepository.deleteById(id);
    }
}