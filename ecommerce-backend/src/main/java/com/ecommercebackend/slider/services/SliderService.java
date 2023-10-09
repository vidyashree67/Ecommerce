package com.ecommercebackend.slider.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ecommercebackend.slider.entities.Slider;

/**
 * This interface defines the contract for managing sliders and their slides in the ecommerce system.
 */
public interface SliderService {
	
    void saveSlide(MultipartFile file, String fileName);
    List<Slider> listAllSlides();
    void deleteSlide(int id);
}
