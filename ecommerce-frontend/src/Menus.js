// Define an array of menu items for navigation
export const Menus = [
    {
        name: "Home",
        route: "/",
        role: [""]
    },

    {
        name: "Login",
        route: "/login",
        role: ["guest"],
        children: [
            // Submenu items for different user roles during login
            {
                name: "Admin",
                route: "/admins/login"
            },

            {
                name: "Seller",
                route: "/sellers/login"
            },

            {
                name: "Customer",
                route: "/customers/login"
            },
        ]
    },

    {
        name: "Register",
        route: "/register",
        role: ["guest"],
        children: [
            // Submenu items for different user roles during registration
            {
                name: "Admin",
                route: "/admins/registration"
            },

            {
                name: "Seller",
                route: "/sellers/registration"
            },

            {
                name: "Customer",
                route: "/customers/registration"
            },
        ]
    },

    // Admin-related menu items
    {
        name: "Profile",
        route: "/admins/profile",
        role: ["admin"]
    },

    {
        name: "Slides",
        route: "/slides",
        role: ["admin"]
    },

    {
        name: "Categories",
        route: "/categories",
        role: ["admin"]
    },

    {
        name: "Subcategories",
        route: "/subcategories",
        role: ["admin"]
    },

    {
        name: "Brands",
        route: "/brands",
        role: ["admin"]
    },

    {
        name: "Sellers",
        route: "/sellers",
        role: ["admin"]
    },

    {
        name: "Customers",
        route: "/customers",
        role: ["admin"]
    },

    {
        name: "Customer Orders",
        route: "/customers/orders",
        role: ["admin"]
    },

    {
        name: "Payments",
        route: "/payments/transactions",
        role: ["admin"]
    },

    // Seller-related menu items
    {
        name: "Profile",
        route: "/sellers/profile",
        role: ["seller"]
    },

    {
        name: "My Products",
        route: "/products",
        role: ["seller"]
    },

    // Customer-related menu items
    {
        name: "View Cart",
        route: "/cart",
        role: ["customer"]
    },

    {
        name: "Profile",
        route: "/customers/profile",
        role: ["customer"]
    },
    
    {
        name: "My Orders",
        route: "/orders",
        role: ["customer"]
    }
];
