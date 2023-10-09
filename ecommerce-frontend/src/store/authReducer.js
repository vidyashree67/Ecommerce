// Define the initial state of authentication-related data based on localStorage values
const initialState = {
    IsLoggedIn:localStorage.getItem("id") !== null,
    Name: localStorage.getItem("name") === null ? "" : localStorage.getItem("name"),
    Role: localStorage.getItem("role") === null ?  "" : localStorage.getItem("role")
}

// Define the authentication reducer function
const authReducer = (state = initialState, action) => {

    switch(action.type)
    {
        // Update state when the user is considered logged in
        case "IsLoggedIn":
            return {...state,
                IsLoggedIn: true,
                Name: localStorage.getItem("name"),
                Role: localStorage.getItem("role")
            }

        // Handle user logout action
        case "LogOut":
            localStorage.clear()

            // Clear localStorage to log the user out
            return {...state, IsLoggedIn: false, name: "", Role: ""}

        // Return current state for unknown actions
        default:
            return state;
    }
}

// Export the authentication reducer for use in Redux store setup
export default authReducer;