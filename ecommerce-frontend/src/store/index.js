// Import necessary Redux functions
import { combineReducers, createStore } from "redux";

// Import the individual reducer modules
import cartItemsReducer from "./cartItemsReducer";
import authReducer from "./authReducer";

// Combine the individual reducers into a single rootReducer
const rootReducer = combineReducers({
    
    // Use the authReducer to manage authentication-related state
    loggedin: authReducer,

    // Use the cartItemsReducer to manage cart-related state
    cart: cartItemsReducer
});

// Create the Redux store using the combined rootReducer
const store = createStore(rootReducer);

// Export the configured Redux store for use in the application
export default store;

