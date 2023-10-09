// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import Internal Dependencies
import "./TopSlider.css";

// Import External Depenencies
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";
import axios from "axios";

const TopSlider = () => {
  // Configuration settings for the slider component
  const settings = {
    dots: true,             // Display navigation dots
    infinite: true,         // Looping of slides
    speed: 2500,            // Transition speed in milliseconds
    slidesToShow: 1,        // Number of slides to show at a time
    slidesToScroll: 1,      // Number of slides to scroll
    autoplay: true,         // Auto-play slides
    autoplaySpeed: 5000,    // Auto-play interval in milliseconds
    cssEase: "linear"       // Animation easing function
  };

  // Initialize a state variable to track the slides
  const [slides, setSlides] = useState([]);

  // Function to load all slides
  const loadAllSlides = () => {
    // Send a GET request to the API to retrieve all slides
    axios.get(`${BASE_URL}api/slides`) 
    .then(response => {
      // Update the slides state with the retrieved data from the API response
      setSlides(response.data);
    });
  }

  // Load slides when the component mounts
  useEffect(() => {
    // Call the function loadAllSlides to load slides
    loadAllSlides();
  }, []);

  return (
    //Rendering a slider component with specified settings
    <Slider {...settings} className="mb-4">

      {/* Mapping through slides to display each slide */}
      {slides.map((slide, index) => (
        <div key={index}>
          <img className="img" alt={`photo${index + 1}`} src={BASE_URL + slide.slideImage} />
        </div>
      ))}
    </Slider>
  );
}

// Export the TopSlider Component
export default TopSlider;
