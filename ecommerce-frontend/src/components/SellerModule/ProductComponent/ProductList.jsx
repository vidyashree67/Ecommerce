// Import Constants
import { BASE_URL } from "../../../constants/constants";

// Import External Dependencies
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const ProductList = () => {
    // Get the seller ID from local storage
    const sellerId = localStorage.getItem("id");

    // State to hold product information
    const [products, setProducts] = useState([]);

    // Function to load all products
    const loadAllProducts = () => {
        // Send a GET request to the API to retrieve all products
        axios.get(`${BASE_URL}api/products?sellerId=${sellerId}`)
        .then(response => {
            // Update the products state with the retrieved data from the API response
            setProducts(response.data.data);
        });
    }

    // Load products when the component mounts
    useEffect(()=>{
        // Call the function loadAllProducts to load all products
        loadAllProducts();
    },[]);

    // Function to handle delete the product
    const deleteProduct = (id) => {
        // Display a confirmation dialog using SweetAlert
        Swal.fire({
            title: "Delete Product",
            text: "Are you sure you want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // If seller confirms deletion, send a DELETE request to the API
                axios.delete(`${BASE_URL}api/products/${id}/delete`)
                .then(() => {
                    // Show success message when the product is deleted
                    toast.success("Product deleted successfully.", {
                        position: "top-right",
                        autoClose: 2000
                    });
                    // Reload the list of products
                    loadAllProducts();
                })
                .catch(() => {
                    // Show error toast if unable to delete the product
                    toast.error("Unable to delete the product..!", {
                        position: "top-right",
                        autoClose: 2000
                    });
                });
            }
        });
    }
    
    return (
        <div className="container-fluid">
            <div className="card shadow mt-3 mb-5">
                <div className="card-header bg-white">

                    {/* Product List Title */}
                    <h4 className="float-start">My Products</h4>

                    {/* Add Product Button */}
                    <NavLink
                        to="/products/add"
                        className="btn text-white fw-bold shadow-none float-end px-4 mb-2 shiny-btn"
                    >
                        <i className="fa-solid fa-plus ms-1"></i> Add Product
                    </NavLink>
                </div>
                <div className="card-body">
                    <div className="table-responsive">

                        {/* Product List Table start */}
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Action</th>                                
                                </tr>
                            </thead>
                            <tbody>
                            
                            {/* Mapping through products to display each product */}
                            {products.map((product,index)=>(
                                <tr key={index}>
                                    {/* Product Photo and Product Name */}
                                    <td><img alt="Product" width="70" height="70" src={BASE_URL + product.photo} className="img-thumbnail me-2"/>{product.name}</td>

                                    {/* Product Category Name */}
                                    <td>{product?.category?.name}</td>

                                    {/* Product Subcategory Name */}
                                    <td>{product?.subcategory?.name}</td>

                                    {/* Product Brand Name */}
                                    <td>{product?.brand?.name}</td>

                                    {/* Product Price */}
                                    <td>&#8377; {product.price}</td>
                                    <td>
                                        {/* Edit Product Button */}
                                        <Link to={"/products/"+product.id+"/edit"} className="btn btn-primary btn-sm shadow-none me-2">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>

                                        {/* Delete product Button */}
                                        <button onClick={()=>deleteProduct(product.id)} className="btn btn-danger btn-sm shadow-none">
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>                                
                                </tr>
                            ))}
                            </tbody>
                            {/* Product List Table end */}

                        </table>
                        {/* Product List Table end */}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the ProductList component
export default ProductList;