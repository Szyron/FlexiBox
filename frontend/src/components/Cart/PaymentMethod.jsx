import React from 'react'
import { useContext,useState ,useEffect } from 'react';
import  PaymentContext from '../../context/PaymentContext';
import OrderContext from '../../context/OrderContext';


function PaymentMethod({onPaymentChange}) {

  const [payments, setPayments] = useState([]);  // Fizetési módok tárolása
  //const [formDataPayment, setFormDataPayment] = useState({ card_type: "" });
  const {formDataPayment, setFormDataPayment} = useContext(OrderContext);

  // Fizetési módok betöltése az adatbázisból
  useEffect(() => {
    // Feltételezve, hogy a fizetési módok egy REST API végponton elérhetőek
    fetch(`${import.meta.env.VITE_BASE_URL}/payment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.paymentMethods);  // Beállítjuk a válaszban kapott fizetési módokat
      })
      .catch((error) => console.error('Hiba történt a fizetési módok lekérésekor:', error));
  }, []);

  // Fizetési mód választás kezelése
  const handleChange = (e) => {
    const { value } = e.target;
    setFormDataPayment({ ...formDataPayment, card_type: value });
    onPaymentChange(value);  // Visszaküldi a szülő komponensnek
  };





  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-left">Fizetési mód</h2>
          <div className="divider"></div>
          <div className="form-control">
                <label className="label">
                  <span className="label-text">Fizetési mód</span>
                </label>
                <select
                  id="id"
                  className="select select-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange} value={formDataPayment.card_type}
                >
                <option value="">Válasszon fizetési módot</option>
                {
                    payments.map((payment) => ( <option key={payment.id} value={payment.id}>{payment.card_type}</option>))
                } 
                </select>
              </div>
          <div className="divider mt-10"></div>
          <div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod