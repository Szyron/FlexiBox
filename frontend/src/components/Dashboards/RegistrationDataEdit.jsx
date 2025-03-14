import React, { useContext } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';



function RegistrationDataEdit({user, closeFunction}) {
    const navigate = useNavigate();

    const {backendMuvelet, update} = useContext(AdminContext);

   
    const [formData, setFormData] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    isadmin: user.isadmin
    });

    const writeData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const onSubmit = (e) => {
    e.preventDefault();
    backendMuvelet(formData, "PUT", `${import.meta.env.VITE_BASE_URL}/user/edit`) 
    closeFunction();
    update();
    navigate('/admindashboard');
      
}


  return (
    <div className="modal modal-open">
      <div className="modal-box">

      <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vezetéknév</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  id="last_name"
                  className="grow"
                  placeholder="Vezetéknév"
                  required
                  onChange={writeData}
                  value={formData.last_name}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Keresztnév</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  id="first_name"
                  className="grow"
                  placeholder="Keresztnév"
                  required
                  onChange={writeData}
                  value={formData.first_name}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email cím</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  className="grow"
                  placeholder="Email"
                  required
                  onChange={writeData}
                  value={formData.email}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Jogosultság</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="number"
                  id="isadmin"
                  className="grow"
                  placeholder="Jogosultság"
                  required
                  onChange={writeData}
                  value={formData.isadmin}
                />
              </label>
            </div>
            <div className="modal-action">
              <button className="btn">Save</button>
              <button className="btn" onClick={closeFunction}>
            Close
          </button>
            </div>
            </form>
      </div>
    </div>
  )
}

export default RegistrationDataEdit