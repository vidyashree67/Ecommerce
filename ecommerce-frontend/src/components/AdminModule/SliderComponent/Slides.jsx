// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependency
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const Slides = () => {

  // Initialize a state variable to track the slides
  const [slides, setSlides] = useState([]);

  // Initialize state to manage the selected product photo (file)
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Function to load all slides
  const loadAllSlides = () => {
    axios.get(`${BASE_URL}api/slides`)
    .then((response) => {
      // Set the slides in the state
      setSlides(response.data);
    });
  }

  // Load slides when the component mounts
  useEffect(() => {
    // Call the function loadAllSlides to load all slides
    loadAllSlides();
  }, []);

  // Function to handle file input changes
  const handleFileInput = (event) => {
    setSelectedPhoto(event.target.files[0]);
  }

  // Handle the form submission to add a new slide
  const handleAddSlide = (event) => {

    // Prevent the default behavior of the event, such as form submission
    event.preventDefault();

    // Create a new FormData object and append slide image
    const formData = new FormData();
    formData.append("photo", selectedPhoto);

    // Perform API request to add a new slide
    axios.post(`${BASE_URL}api/slides/add`, formData)
    .then(() => {
      // Show success message when slide is added
      toast.success("Slide added successfully.", {
        position: "top-right",
        autoClose: 2000
      });
      // Reload the list of slides
      loadAllSlides();
    })
    .catch(()=>{
      // Show error toast if unable to save the slide
      toast.error("Unable to add the slide..!", {
        position: "top-right",
        autoClose: 2000
      });
    });
  }

  // Function to handle delete the slide
  const deleteSlide = (id) => {

    // Display a confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure to delete this slide?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      // If admin confirms deletion, send a DELETE request to the API
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}api/slides/${id}/delete`)
        .then(() => {
          // Reload the list of slides
          loadAllSlides()

          // Show success message when slide is deleted
          toast.success("Slide deleted successfully!", {
            position: "top-right",
            autoClose: 2000
          });
        })
        .catch(()=>{
          // Show error toast if unable to delete the slide
          toast.error("Unable to delete the slide..!", {
            position: "top-right",
            autoClose: 2000
          });
        });
      }
    });
  }

  return (
    <div className="container">
      <div className="card shadow mt-3 mb-5">
        <div className="card-body">

          {/* Slide List Title */}
          <h4 className="p-2">Slide Images</h4>
          <div className="row">
            <div className="col-lg-8">
              <div className="table-responsive">

                {/* Slide List Table start */}
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Id</th>
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapping through slides to display each slide */}
                    {slides.map((slide,index) => (
                      <tr key={index}>

                        {/* Slide Id */}
                        <td>{slide.id}</td>

                        {/* Slide Image */}
                        <td>
                          <img
                            src={BASE_URL + slide.slideImage}
                            alt="Slide"
                            className="img-thumbnail"
                          />
                        </td>

                        {/* Slide Delete Button */}
                        <td>
                          <button
                            onClick={() => deleteSlide(slide.id)}
                            className="btn btn-danger btn-sm shadow-none mt-1"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Slide List Table end */}

              </div>
            </div>
            <div className="col-lg-4">
              <h4 className="p-2">Add Slide</h4>

              {/* Add Slide Form start */}
              <form onSubmit={handleAddSlide}>

                {/* Slide Image */}
                <div className="form-group mb-3">
                  <label>Chooese slide image:</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileInput}
                    className="shadow-none border-0"
                  />
                </div>

                {/* Save Button */}
                <button type="submit" className="btn text-white px-3 shadow-none glass-btn">
                  Save
                </button>
              </form>
              {/* Add Slide Form end */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Slides component
export default Slides;
