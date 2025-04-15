import React, { createContext, useState,useContext } from 'react';
import { toast } from 'react-toastify';
import  {CartContext}  from './CartContext';
import secureStorage from '../utils/secureStorage';
import  AuthContext  from './AuthContext';



const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [refresh,setRefresh]=useState(false);
    //const user = JSON.parse(sessionStorage.getItem("user"));
    const user = secureStorage.getItem('user');

    
   // const { user } = useContext(AuthContext); // Hivatkozás az AuthContext user adatára
    //console.log("order test user ---------------------------------------------------",user);
    //const orderUser= sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    const [isPrivacyInfo, setPrivacyInfo] = useState(false);
    const [formDataPayment, setFormDataPayment] = useState({ card_type: "" });
    const [formDataAddress, setFormDataAddress] = useState([]);

    const {cartItems,setCartItems} = useContext(CartContext);
    
    //console.log("order test cartitems",sessionStorage.getItem('cartItems'));
    
    //console.log("isAddress",formDataAddress);

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

    // Hibakezelés a submitOrder-ben
// if (!formData.user_id) {
//     toast.error('A felhasználói azonosító hiányzik!');
//     return;
// }

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
        //lockerId: item.lockerId,
        lockerId: Number(item.lockerId), // Konvertálás számra
    }));
    //console.log("GECI",formObjCartItems);
    //console.log("Isaddress",formDataAddress);

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
                update();
                return true;        
            } else {
                toast.error(valasz.error || 'Valami hiba történt!');
                return false;
            }

          //  update();

        } catch (error) {
            toast.error('Hálózati hiba történt!');
            console.error(error);
            return false;
        }
    }

    const submitOrder = async () => {
        if (!formData.user_id) {
            toast.error('A felhasználói azonosító hiányzik!');
            return false;
        }

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

        return await  backendOrder(orderData, method, url, header);
        console.log("order test",orderData);
        console.log("order test",method);
    };


    const submitOrderisAddress = async() => {
        if (!formData.user_id) {
            toast.error('A felhasználói azonosító hiányzik!');
            return;
        }

        const orderData = {
            ...formObjPayment,
            ...formDataAddress,
            user_id: formData.user_id,
          cart_items: formObjCartItems,
       }; 

       console.log("Order Tesztelése... lockerId-val",orderData);

       const url = `${import.meta.env.VITE_BASE_URL}/neworderisaddress`;

       const method = 'POST';
       const header = {
           'Content-Type': 'application/json',
       };

       return await backendOrder(orderData, method, url, header);

       
       
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
            formDataAddress,
            setFormDataAddress,
            submitOrderisAddress,
        }}>       
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;