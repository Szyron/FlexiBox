import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PaymentContext from "../../context/PaymentContext";

function NewPaymentMethod() {
  const navigate = useNavigate();
  const { backendMuvelet } = useContext(PaymentContext);
  const { state } = useLocation();

  let cim = "Új fizetési mód felvitel";
  let method = "POST";
  let header = { "Content-type": "application/json" };

  let formObj = {
    id: "",
    card_type: "",
  };

  let url = `${import.meta.env.VITE_BASE_URL}/payment`;

  if (state !== null) {
    const { payment } = state;
    formObj = {
      id: payment.id,
      card_type: payment.card_type

    };
    method = "PATCH";
    cim = `${payment.card_type} módosítása`;
    header = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
      "PaymentId": payment.id
    };

  }

  const [formData, setFormData] = useState(formObj);

  const onSubmit = (e) => {
    e.preventDefault();
    backendMuvelet(formData, method, url, header);
    navigate("/paymentmethods");
  };


  const writeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen text-info">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center pb-5 text-primary">{cim}</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="input input-primary flex items-center gap-2 border-primary">
              <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><path d="M16.55 14.5h-.1m-1.9 0h-.1" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line x1="21" y1="9" x2="3" y2="9" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><rect x="3" y="5" width="18" height="14" rx="1" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                <input className="grow placeholder-info"
                  type="text"
                  id="card_type"
                  placeholder="Fizetési mód neve"
                  required
                  onChange={writeData}
                  value={formData.card_type}
                />
              </label>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white">
                Felvitel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewPaymentMethod