// Import Internal Dependencies
import "./Footer.css";

// Footer component displays footer information including about section, social media links, and contact details.
const Footer = () => {
    return (
        <footer className="bg-secondary text-white mt-auto">
            <div className="container pt-5">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <h5 className="fw-bold mb-2">About Us</h5>
                        <div className="row">
                            <div>
                                {/* Display a brief description about the company */}

                                <h6 className="text-justify">
                                    Ecowear is your destination for sustainable fashion. We offer a wide range of eco-friendly garments made from organic and recycled materials. Shop with us and make a positive impact on the planet. Follow us on social media for the latest updates and promotions.
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 social-icons mb-4">
                        <div className="w-50 mx-auto">
                            <h5 className="fw-bold">Follow Us At:</h5>
                            <div>
                                {/* Display social media icons and links */}
                                {/* Facebook Icon */}
                                <span className="me-3">
                                    <a href="#" className="text-decoration-none social-icon">
                                        <i className="fa-brands fa-square-facebook"></i>
                                    </a>
                                </span>
                                {/* Instagram Icon */}
                                <span className="me-3">
                                    <a href="#" className="text-decoration-none social-icon">
                                        <i className="fa-brands fa-square-instagram"></i>
                                    </a>
                                </span>
                                {/* Twitter Icon */}
                                <span className="social-icon">
                                    <a href="#" className="text-decoration-none social-icon">
                                        <i className="fa-brands fa-square-twitter"></i>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                        <div className="w-50 mx-auto">
                            <h5 className="fw-bold">Mail Us At:</h5>
                            <div className="d-flex align-items-center">

                                {/* Display an email icon and contact email */}
                                <span><i className="email-icon fa-solid fa-envelope me-2"></i></span>
                                <span><h6>info@ecowear.com</h6></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-3 bg-dark">
                <div className="col">

                    {/* Display copyright information */}
                    <h6 className="text-center">Copyright &copy; 2023 ECOWEAR - All Rights Reserved.</h6>
                </div>
            </div>
        </footer>
    );
}

// Export the Footer component
export default Footer;
