import React from 'react'
import CartCheckout from './CartCheckout'
import PaymentMethod from './PaymentMethod'
import { useState,useContext } from 'react'
import OrderContext from '../../context/OrderContext'


function OrderCheckout() {

  const [paymentMethod, setPaymentMethod] = useState(""); // Kezdeti állapot, itt tároljuk a fizetési módot
  const {submitOrder} = useContext(OrderContext);

  // A PaymentMethod-ból jövő fizetési mód frissítése
  const handlePaymentChange = (paymentType) => {
    setPaymentMethod(paymentType);
  };

  // A form submit függvénye
  const finalSubmit = (e) => {
    e.preventDefault();
    submitOrder();
    console.log("Kiválasztott fizetési mód: ", paymentMethod);
    // Itt végezheted el a véglegesítést, például a backend hívást
  };

  return (
    
    <div className="bg-base-200">
        <form onSubmit={finalSubmit}> 
         <CartCheckout/>
          <PaymentMethod onPaymentChange={handlePaymentChange}/>
          <div className="form-control mt-6 flex items-center justify-center mb-8">
            <button type="submit" className="btn btn-primary  py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">VEGLEGESITES</button>
          </div>
        </form>
    </div>
  )
}

export default OrderCheckout