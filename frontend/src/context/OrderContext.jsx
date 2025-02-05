import React, { createContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    const orderUser= sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    const [isPrivacyInfo, setPrivacyInfo] = useState(false);

    const openPrivacyInfo = () => {
        setPrivacyInfo(true);
    };

    const closePrivacyInfo = () => {
        setPrivacyInfo(false);
    };

    const addCartToOrder = (cartItems) => {
        console.log(cartItems);
    };


    return (
        <OrderContext.Provider value={{ 
            addCartToOrder,
            isPrivacyInfo,
            openPrivacyInfo,
            closePrivacyInfo
        }}>       
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;