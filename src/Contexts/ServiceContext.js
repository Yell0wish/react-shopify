import React from "react";
import goodService from "../Services/GoodService";
import userService from "../Services/UserSerive";
import cartService from "../Services/CartService";
import orderService from "../Services/OrderService";
import categoryService from "../Services/CategoryService"

const ServiceContext = React.createContext();

const ServiceContextProvider = ({ children }) => {
    const value = {
        goodService: goodService,
        userService: userService,
        cartService: cartService,
        orderService: orderService,
        categoryService: categoryService, 
    };
    
    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    );
}

export { ServiceContext, ServiceContextProvider};