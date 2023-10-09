// Import Internal Dependencies
import { Menus } from "../../../Menus";
import "./NavBar.css";

// Import External dependencies
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const RoleNavbar = ({ isLoggedIn }) => {

  // Initialize navigation 
  const navigate = useNavigate();

  // Initialize Redux state
  const state = useSelector((state) => state);

  // Initialize Redux Dispatch
  const dispatch = useDispatch();

  // Initialize a state variable to control user logout  
  const [logOut, setLogOut] = useState(false);

  // Initialize a state variable to track the cart quantity
  const [cartQuantity, setCartQuantity] = useState(null);

  // Determine user role based on login status
  const role = isLoggedIn ? localStorage.getItem("role") : "guest";

  // Function to handle user logout
  const logout = () => {
    // Triggering logout by updating a state variable with a random value
    setLogOut(Math.random());
  };

  // UseEffect to handle logout action and navigation
  useEffect(() => {
    // Dispatch a logout action to Redux store
    dispatch({ type: "LogOut" });

    // Navigate to the homepage
    navigate("/", { replace: true });
  }, [logOut]);

  // Update cart quantity when the cart state changes
  useEffect(() => {
    // Update cart quantity based on the length of the cart array
    setCartQuantity(state.cart.length);
  }, [state.cart]);

  return (
    <ul className="navbar-nav ms-auto">
    
    {/* Filtering and mapping through menu items based on user's role */}
    {Menus.filter((menu) => menu.role.includes(role)).map((menu) =>

      // If menu has children
      menu.children ? (
        <li key={menu.name} className="nav-item dropdown">
          {/* Dropdown toggle link */}
          <Link
            className="nav-link dropdown-toggle"
            to="#"
            id="navbarDropdownMenuLink"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {menu.name}
          </Link>

          {/* Dropdown menu */}
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            {/* Mapping through submenu items for dropdown menus */}
            {menu.children.map(submenu => (

              // Submenu links within dropdown
              <Link key={submenu.name} className="dropdown-item" to={submenu.route}>
                {submenu.name}
              </Link>
            ))}
          </div>
        </li>
      ) : (
        
        // If menu doesn't have children (regular link)

        // Special case for "View Cart" menu
        menu.name === "View Cart" ? (
          <li key={menu.name} className="nav-item">

            {/* Link to view cart */}
            <NavLink className="nav-link" to={menu.route}>

              {/* Cart icon with badge indicating cart quantity */}
              <i className="fa-solid fa-cart-plus text-white cart-icon"></i>

              {/* Conditional rendering: Display badge only if cart is not empty */}
              {state.cart.length === 0 ? null :
                <span className="position-relative margin-minus">
                  <span className="badge rounded-pill bg-danger">{cartQuantity}</span>
                </span>
              }
              <span className="ms-2">Cart</span>
            </NavLink>
          </li>
        ) : (
          // Regular menu link
          <li key={menu.name} className="nav-item">
            <NavLink className="nav-link" to={menu.route}>{menu.name}</NavLink>
          </li>
        )
      )
    )}
    {/* Render the Logout link only if the user is not a guest */}
    {role !== "guest" ? (
      
      //Logout link for authenticated users
      <li className="nav-item">
        <Link className="nav-link" onClick={event => logout()} to="#">

          {/* Logout icon */}
          <i className="fa-solid fa-right-from-bracket text-danger logout-icon" data-bs-toggle="tooltip" title="Logout"></i>
        </Link>
      </li>
    ) : null}
  </ul>
  );
}

// Export the RoleNavber Component
export default RoleNavbar;
