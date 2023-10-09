// Import External Dependencies
import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Styles
import "./App.css";

// Import Components
import Header from "./components/CommonModule/HeaderComponent/Header";
import NavBar from "./components/CommonModule/NavbarComponent/NavBar";
import AllProducts from "./components/CustomerModule/ProductComponent/AllProducts";
import AdminRegistration from "./components/AdminModule/AuthenticationComponent/AdminRegistration";
import AdminLogin from "./components/AdminModule/AuthenticationComponent/AdminLogin";
import AdminProfile from "./components/AdminModule/ProfileComponent/AdminProfile";
import BrandList from "./components/AdminModule/BrandComponent/BrandList";
import AddBrand from "./components/AdminModule/BrandComponent/AddBrand";
import EditBrand from "./components/AdminModule/BrandComponent/EditBrand";
import CategoryList from "./components/AdminModule/CategoryComponent/CategoryList";
import AddCategory from "./components/AdminModule/CategoryComponent/AddCategory";
import EditCategory from "./components/AdminModule/CategoryComponent/EditCategory";
import SubcategoryList from "./components/AdminModule/SubcategoryComponent/SubcategoryList";
import AddSubcategory from "./components/AdminModule/SubcategoryComponent/AddSubcategory";
import EditSubcategory from "./components/AdminModule/SubcategoryComponent/EditSubcategory";
import SellerList from "./components/AdminModule/SellerComponent/SellerList";
import CustomerList from "./components/AdminModule/CustomerComponent/CustomerList";
import Slides from "./components/AdminModule/SliderComponent/Slides";
import CustomerOrders from "./components/AdminModule/OrderComponent/CustomerOrders";
import PaymentTransactionDetails from "./components/AdminModule/PaymentComponent/PaymentTransactionDetails";
import SellerRegistration from "./components/SellerModule/AuthenticationModule/SellerRegistration";
import SellerLogin from "./components/SellerModule/AuthenticationModule/SellerLogin";
import SellerProfile from "./components/SellerModule/ProfileComponent/SellerProfile";
import ProductList from "./components/SellerModule/ProductComponent/ProductList";
import AddProduct from "./components/SellerModule/ProductComponent/AddProduct";
import EditProduct from "./components/SellerModule/ProductComponent/EditProduct";
import CustomerRegistration from "./components/CustomerModule/AuthenticationComponent/CustomerRegistration";
import CustomerLogin from "./components/CustomerModule/AuthenticationComponent/CustomerLogin";
import CustomerProfile from "./components/CustomerModule/ProfileComponent/CustomerProfile";
import ProductDetails from "./components/CustomerModule/ProductComponent/ProductDetails";
import ViewCart from "./components/CustomerModule/CartComponent/ViewCart";
import ViewOrders from "./components/CustomerModule/OrderComponent/ViewOrders";

// Create a context to provide global information
export const GlobalInfo=createContext();

function App() {

  // Initialize global state variables
  const [globalCategories, setGlobalCategories]=useState([]);
  const [globalSubcategories, setGlobalSubcategories]=useState([]);
  const [globalBrands, setGlobalBrands]=useState([]);

  // Initialize a state variable to track the loading state of the application
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous task by using setTimeout
    setTimeout(() => {
      // After the delay, set loading to false to hide the loading animation
      setLoading(false);
    }, 5000);
  }, [loading]);

  return (
    <div className="App">

      {/* Display the loading animation while loading is true */}
      {loading ? (
        <div className="loading">
          <img src={"/assets/loading.gif"} alt="Loading..." height={400} />
        </div>
      ) : (
        // Hide the loading animation once loading is false
        <GlobalInfo.Provider value={{ globalCategories, setGlobalCategories, globalSubcategories, setGlobalSubcategories, globalBrands, setGlobalBrands }}>
          <BrowserRouter>
            <ToastContainer />
            <Header />      
            <NavBar />
            <Routes>

              {/* Routes for all user roles */}
              <Route element={<AllProducts />} path="/" exact />
              <Route element={<AllProducts />} path="/categories/:subcategory" />
              <Route element={<ProductDetails />} path="/products/:id" />

              {/* Routes for user role - 'Admin' */}
              <Route element={<AdminRegistration />} path="/admins/registration" />
              <Route element={<AdminLogin />} path="/admins/login" />
              <Route element={<AdminProfile />} path="/admins/profile" />
              <Route element={<Slides />} path="/slides" />
              <Route element={<BrandList />} path="/brands" />
              <Route element={<AddBrand />} path="/brands/add" />
              <Route element={<EditBrand />} path="/brands/:id/edit" />
              <Route element={<CategoryList />} path="/categories" />
              <Route element={<AddCategory />} path="/categories/add" />
              <Route element={<EditCategory />} path="/categories/:id/edit" />
              <Route element={<SubcategoryList />} path="/subcategories" />
              <Route element={<AddSubcategory />} path="/subcategories/add" />
              <Route element={<EditSubcategory />} path="/subcategories/:id/edit" />
              <Route element={<SellerList />} path="/sellers" />
              <Route element={<CustomerList />} path="/customers" />     
              <Route element={<CustomerOrders />} path="/customers/orders" />
              <Route element={<PaymentTransactionDetails />} path="/payments/transactions" />

              {/* Routes for user role - 'Seller' */}
              <Route element={<SellerRegistration />} path="/sellers/registration" />
              <Route element={<SellerLogin />} path="/sellers/login" />
              <Route element={<SellerProfile />} path="/sellers/profile" />
              <Route element={<ProductList />} path="/products" />
              <Route element={<AddProduct />} path="/products/add" />
              <Route element={<EditProduct />} path="/products/:id/edit" />
              
              {/* Routes for role - 'Customer' */}
              <Route element={<CustomerRegistration />} path="/customers/registration" />
              <Route element={<CustomerLogin />} path="/customers/login" />
              <Route element={<CustomerProfile />} path="/customers/profile" />
              <Route element={<ViewCart />} path="/cart" />
              <Route element={<ViewOrders />} path="/orders" />

            </Routes>
          </BrowserRouter>
        </GlobalInfo.Provider>
      )}
    </div>
  );
}

// Export the App component
export default App;
