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
    <div className="bg-base-200">
      <form onSubmit={finalSubmit}>
        <CartCheckout />
        <PaymentMethod onPaymentChange={handlePaymentChange} />
        <div className="form-control mt-6 flex items-center justify-center mb-8">
          <button
            type="submit"
            className="btn btn-primary py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >Rendelés véglegesítése
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderCheckout;