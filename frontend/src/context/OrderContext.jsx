import React, { createContext, useState,useContext } from 'react';
import { toast } from 'react-toastify';
import  {CartContext}  from './CartContext';


const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [refresh,setRefresh]=useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const orderUser= sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    const [isPrivacyInfo, setPrivacyInfo] = useState(false);
    const [formDataPayment, setFormDataPayment] = useState({ card_type: "" });

    const {cartItems,setCartItems} = useContext(CartContext);
    
    console.log("order test cartitems",sessionStorage.getItem('cartItems'));
    

    //console.log("order test payment",formDataPayment);
    const update=()=>{
        setRefresh(prev=>!prev);
    }

    const [formData, setFormData] = useState({
        city: "",
        zip: "",
        email: "",
        street_id: "",
        street: "",
        house_number: "",
        user_id: user ? user.id : null,
    });
    //console.log("order test",formData);

    const formObjPayment={
        payments_method_id:formDataPayment.card_type,
    }

    const formObjAddress={
        city:formData.city,
        zip:formData.zip,
        email:formData.email,
        street_id:formData.street_id,
        street:formData.street,
        house_number:formData.house_number,
        user_id:formData.user_id,
    }

    const formObjCartItems = cartItems.map(item => ({
        quantity: item.quantity,
        product_id: item.id,
        item_price: item.price_per_day,
        line_total: item.price_per_day * item.quantity,
    }));
    console.log("GECI",formObjCartItems);

    const backendOrder = async (data, method, url, header) => {
        try {
            const keres = await fetch(url, {
                method: method,
                headers: header,
                body: JSON.stringify(data),
            });

            const valasz = await keres.json();

            if (keres.ok) {
                toast.success('Sikeres adatfelvitel!');          
            } else {
                toast.error(valasz.error || 'Valami hiba történt!');
            }

            update();

        } catch (error) {
            toast.error('Hálózati hiba történt!');
            console.error(error);
        }
    }

    const submitOrder = () => {
         const orderData = {
             ...formObjPayment,
            ...formObjAddress,
           cart_items: formObjCartItems,
        }; 

        const url = `${import.meta.env.VITE_BASE_URL}/neworder`;
        //console.log("url test",url);
        const method = 'POST';
        const header = {
            'Content-Type': 'application/json',
        };

        backendOrder(orderData, method, url, header);
        console.log("order test",orderData);
        console.log("order test",method);
    };



    const openPrivacyInfo = () => {
        setPrivacyInfo(true);
    };

    const closePrivacyInfo = () => {
        setPrivacyInfo(false);
    };

/*     const addCartToOrder = (cartItems) => {
        console.log(cartItems);
    };
 */
    return (
        <OrderContext.Provider value={{ 
            //addCartToOrder,
            isPrivacyInfo,
            openPrivacyInfo,
            closePrivacyInfo,
            formData,
            setFormData,
            formDataPayment,
            setFormDataPayment,
            setCartItems,
            cartItems,
            submitOrder,
        }}>       
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;