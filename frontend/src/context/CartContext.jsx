import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(sessionStorage.getItem('cartItems') ? JSON.parse(sessionStorage.getItem('cartItems')) : [])

  const addToCart = (item, selectedLocker) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.lockerId === selectedLocker
      
    );
     
  
    console.log("Selected Locker: VIEW", selectedLocker); // Log the selected locker ID
  
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.lockerId === selectedLocker
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1, lockerId: selectedLocker }]);
    }
    toast.success('Termék hozzáadva a kosárhoz!')
  };

  const removeFromCart = (item, selectedLocker) => {
    const isItemInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.lockerId === selectedLocker
    );
  
    if (isItemInCart) {
      if (isItemInCart.quantity === 1) {
        setCartItems(
          cartItems.filter(
            (cartItem) =>
              !(cartItem.id === item.id && cartItem.lockerId === selectedLocker)
          )
        );
      } else {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id && cartItem.lockerId === selectedLocker
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price_per_day * item.quantity, 0);
  };

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartItems = sessionStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
