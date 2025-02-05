import React, { useState } from "react";
import {toast} from 'react-toastify';


function TermofUseInfo({ closeFunction }) {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    }

    const openOrder = () => {
        if(isChecked){
            closeFunction();
            toast.success('Order has been placed successfully');
        } else {
            toast.error('Please accept the terms of use');
        }
    }


    console.log(isChecked);

    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Term of Use</h3>
          <p className="py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error maiores pariatur quasi facilis, dolores, quis sapiente quod consectetur totam dolorem obcaecati cumque laudantium similique adipisci laborum in, enim cupiditate facere!</p>
          
          <div className="py-4">
                    <label className="cursor-pointer">
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="checkbox" />
                        <span className="ml-2">I agree to the terms of use</span>
                    </label>
          </div>

          <div className="modal-action">
            {/* Close button */}
            <button className="btn" onClick={closeFunction}>
              Close
            </button>
            <button className="btn" onClick={openOrder} >
              Megrendelés véglegesítése
            </button>

          </div>
        </div>
      </div>
    );
  }
  
  export default TermofUseInfo;