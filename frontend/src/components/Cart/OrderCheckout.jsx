import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCheckout from './CartCheckout';
import PaymentMethod from './PaymentMethod';
import OrderContext from '../../context/OrderContext';

function OrderCheckout() {
  const [paymentMethod, setPaymentMethod] = useState(""); // Kezdeti állapot, itt tároljuk a fizetési módot
  const { submitOrder, formDataAddress, submitOrderisAddress } = useContext(OrderContext);
  const navigate = useNavigate();

  // A PaymentMethod-ból jövő fizetési mód frissítése
  const handlePaymentChange = (paymentType) => {
    setPaymentMethod(paymentType);
  };

  const finalSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (formDataAddress.length === 0) {
      success = await submitOrder();
    } else {
      success = await submitOrderisAddress();
    }
    if (success) {
      navigate('/userorder');
    } else {
      console.error('Rendelés mentése nem sikerült');
    }
  };

  return (
<div className="bg-base-200 p-4">
<h1 className="text-3xl font-bold text-center pb-10 mb-4 text-primary">Rendelés véglegesítése</h1>
  <form onSubmit={finalSubmit} className="max-w-6xl mx-auto">
    <div className="flex flex-col items-start">
      <div className="w-full md:pl-28">
        <CartCheckout />
      </div>
      <div className="w-full md:pl-28">
        <PaymentMethod />
      </div>
      <div className="mx-auto mt-5 mb-10 flex justify-center p-10">
        <button
          type="submit"
          className="btn btn-primary text-white text-lg font-semibold rounded-xl"
        >
          Megrendelés
        </button>
      </div>
    </div>
  </form>
</div>
  );
}

export default OrderCheckout;