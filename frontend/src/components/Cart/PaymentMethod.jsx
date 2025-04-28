import { useContext, useState, useEffect } from 'react';
import OrderContext from '../../context/OrderContext';


function PaymentMethod({ onPaymentChange }) {

  const [payments, setPayments] = useState([]);
  const { formDataPayment, setFormDataPayment } = useContext(OrderContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/payment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.paymentMethods);
      })
      .catch((error) => console.error('Hiba történt a fizetési módok lekérésekor:', error));
  }, []);
  const handleChange = (e) => {
    const { value } = e.target;
    setFormDataPayment({ ...formDataPayment, card_type: value });
    onPaymentChange(value);
  };

  return (
    <div className="w-full mt-10">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-left text-primary">Fizetési mód</h2>
              <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M16.55 14.5h-.1m-1.9 0h-.1" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line x1="21" y1="9" x2="3" y2="9" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><rect x="3" y="5" width="18" height="14" rx="1" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
          </div>
          
          <div className="divider divider-info"></div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-primary text-xl">Fizetési mód</span>
            </label>
            <select
              id="id"
              className="select select-primary w-full p-3 mt-2 border border-primary rounded-md text-info input-primary placeholder:text-info"
              onChange={handleChange} value={formDataPayment.card_type}
            >
              <option>Válasszon fizetési módot</option>
              {
                payments.map((payment) => (<option key={payment.id} value={payment.id}>{payment.card_type}</option>))
              }
            </select>
          </div>
          <div className="divider divider-info"></div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod