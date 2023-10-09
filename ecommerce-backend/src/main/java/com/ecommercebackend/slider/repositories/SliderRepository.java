package com.ecommercebackend.slider.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommercebackend.slider.entities.Slider;

/**
 * Repository interface for managing Slider entities in the database.
 */
public interface SliderRepository extends JpaRepository<Slider, Integer> {

}
