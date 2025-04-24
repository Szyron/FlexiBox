import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import secureStorage from '../../utils/secureStorage';



function RegistrationDataEdit({ user, closeFunction }) {
  const navigate = useNavigate();
  const adminpower = secureStorage.getItem('user').isadmin;
  const { backendMuvelet, update } = useContext(AdminContext);
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role_id: user.role_id
  });

  useEffect(() => {
    const storedRoles = secureStorage.getItem('roles');
    if (storedRoles) {
      setRoles(JSON.parse(storedRoles));
    }
  }, []);

  const writeData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const keres = roles.find((role) => role.id == formData.role_id).power;
    if (adminpower < keres) {
      toast.error('Nincs jogosultságod ehhez a művelethez!');
      return;
    }
    backendMuvelet(formData, "PUT", `${import.meta.env.VITE_BASE_URL}/user/edit`)
    closeFunction();
    update();
    navigate('/admindashboard');

  }


  return (
    <div className="modal modal-open ">
      <div className="modal-box">

        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary">Vezetéknév</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 border-primary">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" fill="none"><path d="M11,13h2a7,7,0,0,1,7,7v0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v0a7,7,0,0,1,7-7Z" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="8" r="5" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
              <span className="label-text text-primary ">Keresztnév</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 border-primary">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" fill="none"><path d="M11,13h2a7,7,0,0,1,7,7v0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v0a7,7,0,0,1,7-7Z" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="8" r="5" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
              <span className="label-text text-primary">Email cím</span>
            </label>
            <label className="input input-bordered flex items-center gap-2 border-primary">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="1" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.62,5.22l-8,6.29a1,1,0,0,1-1.24,0l-8-6.29A1,1,0,0,1,4,5H20A1,1,0,0,1,20.62,5.22Z" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              <span className="label-text text-primary">Jogosultság</span>
            </label>
            <select className="select select-bordered w-full border-primary" id="role_id" onChange={writeData} value={formData.role_id}>
              {
                roles.map((role) => (<option key={role.id} value={role.id}>{role.warrant_name}</option>))
              }
            </select>

          </div>
          <div className="modal-action">
            <button className="btn btn-primary text-white">Mentés</button>
            <button className="btn btn-info text-white" onClick={closeFunction}>
              Bezárás
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationDataEdit