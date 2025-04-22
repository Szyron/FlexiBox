import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import PaymentContext from '../../context/PaymentContext';
import secureStorage from '../../utils/secureStorage';

function PaymentMethodCard({ payment }) {
  const user = secureStorage.getItem('user');
  const navigate = useNavigate();
  const { backendMuvelet } = useContext(PaymentContext);

  const modosit = () => {
    navigate("/newpaymentmethod", { state: { payment } });
  }

  const torles = (payment) => {
    backendMuvelet(
      payment,
      "DELETE",
      `${import.meta.env.VITE_BASE_URL}/payment/delete`,
      {
        "Content-type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
        "PaymentId": payment.id
      }
    );
  }

  return (
    <div className="card w-96 shadow-xl m-5 bg-base-100">
      <div className="card-body text-center">
        <h2 className="card-title justify-center text-primary">{payment.card_type}</h2>
        <div className="card-actions justify-center">
          {user ? (
            <>
              {user.isadmin >= 70 && <button className='btn btn-primary text-white' onClick={() => modosit(payment)}>Módosítás</button>}
              {user.isadmin >= 70 && <button className='btn btn-info text-white' onClick={() => torles(payment)}>Törlés</button>}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodCard