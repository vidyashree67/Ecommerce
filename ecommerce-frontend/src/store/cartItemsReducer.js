// Define the initial state of the cart items as an empty array
const initialState = [];

// Define the cart items reducer function
const cartItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle adding an item to the cart
        case "AddItem":
            return [...state, action.payload];

        // Handle removing an item from the cart
        case "RemoveItem":
            // Filter out the item to be removed based on its ID
            state = state.filter(product => product.id !== action.payload.id);
            return state;

        // Handle clearing the entire cart
        case "Clear":
            state = [];
            return state;

        // Return the current state for unknown actions
        default:
            return state;
    }
}

// Export the cart items reducer for use in Redux store setup
export default cartItemsReducer;
