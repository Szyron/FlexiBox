import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TermOfUse from "../Term/TermOfUse";



function TermofUseInfo({ closeFunction }) {

  const [isChecked, setIsChecked] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  }

  const openOrder = () => {
    setHasAttemptedSubmit(true);
    if (isChecked) {
      toast.success('A felhasználási feltételeket elfogadtad!');
      closeFunction();
      navigate('/checkout');
    } else {
      toast.error('Kérjük, hogy fogadd el a felhasználási feltételeket!');
    }
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <TermOfUse />
        <div className="py-4">
          <label className="cursor-pointer">
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="checkbox" />
            <span className={`ml-2 ${hasAttemptedSubmit && !isChecked ? "text-warning" : ""}`}>Elfogadom a felhasználási feltételeket.</span>
          </label>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={closeFunction}>
            Bezárás
          </button>
          <button id="accepted-term" className="btn" onClick={openOrder} >
            Tovább a pénztárhoz
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermofUseInfo;